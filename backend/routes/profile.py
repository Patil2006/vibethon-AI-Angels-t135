"""
Routes for User Profile CRUD.
"""
from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import profile_collection
from schemas.profile import ProfileCreate, ProfileUpdate, ProfileResponse
from models.profile import profile_serializer

router = APIRouter(prefix="/api/profile", tags=["Profile"])


@router.get("/", response_model=list[ProfileResponse])
async def get_all_profiles():
    profiles = await profile_collection.find().to_list(100)
    return [profile_serializer(p) for p in profiles]


@router.get("/{id}", response_model=ProfileResponse)
async def get_profile(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    p = await profile_collection.find_one({"_id": ObjectId(id)})
    if not p:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile_serializer(p)


@router.post("/", response_model=ProfileResponse, status_code=201)
async def create_profile(data: ProfileCreate):
    # Check for duplicate email
    existing = await profile_collection.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")
    doc = {**data.model_dump(), "topics_completed": 0, "quiz_score": 0, "games_played": 0, "streak_days": 1}
    result = await profile_collection.insert_one(doc)
    created = await profile_collection.find_one({"_id": result.inserted_id})
    return profile_serializer(created)


@router.put("/{id}", response_model=ProfileResponse)
async def update_profile(id: str, data: ProfileUpdate):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    await profile_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})
    updated = await profile_collection.find_one({"_id": ObjectId(id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile_serializer(updated)


@router.delete("/{id}")
async def delete_profile(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    result = await profile_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"message": "Profile deleted successfully"}
