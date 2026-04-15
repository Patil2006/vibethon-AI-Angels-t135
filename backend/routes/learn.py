"""
Routes for Learning Modules CRUD.
"""
from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import learn_collection
from schemas.learn import LearnModuleCreate, LearnModuleUpdate, LearnModuleResponse
from models.learn import module_serializer

router = APIRouter(prefix="/api/learn", tags=["Learn"])


@router.get("/", response_model=list[LearnModuleResponse])
async def get_all_modules():
    modules = await learn_collection.find().sort("order", 1).to_list(100)
    return [module_serializer(m) for m in modules]


@router.get("/{id}", response_model=LearnModuleResponse)
async def get_module(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    module = await learn_collection.find_one({"_id": ObjectId(id)})
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module_serializer(module)


@router.post("/", response_model=LearnModuleResponse, status_code=201)
async def create_module(data: LearnModuleCreate):
    result = await learn_collection.insert_one(data.model_dump())
    created = await learn_collection.find_one({"_id": result.inserted_id})
    return module_serializer(created)


@router.put("/{id}", response_model=LearnModuleResponse)
async def update_module(id: str, data: LearnModuleUpdate):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    await learn_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})
    updated = await learn_collection.find_one({"_id": ObjectId(id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Module not found")
    return module_serializer(updated)


@router.delete("/{id}")
async def delete_module(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    result = await learn_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Module not found")
    return {"message": "Module deleted successfully"}
