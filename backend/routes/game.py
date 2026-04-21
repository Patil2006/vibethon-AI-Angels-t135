"""
routes/game.py — Game scores CRUD with MongoDB
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from bson import ObjectId
from database import db
from datetime import datetime

router = APIRouter(prefix="/api/game", tags=["Game"])

scores_col = db["game_scores"]


class ScoreIn(BaseModel):
    username: str
    score: int
    total: int
    best_streak: int
    percentage: int


def serialize(doc):
    return {
        "id": str(doc["_id"]),
        "username": doc.get("username", "Guest"),
        "score": doc.get("score", 0),
        "total": doc.get("total", 10),
        "best_streak": doc.get("best_streak", 0),
        "percentage": doc.get("percentage", 0),
        "played_at": doc.get("played_at", ""),
    }


@router.post("/scores", status_code=201)
async def save_score(data: ScoreIn):
    doc = {**data.model_dump(), "played_at": datetime.utcnow().isoformat()}
    result = await scores_col.insert_one(doc)
    created = await scores_col.find_one({"_id": result.inserted_id})
    return serialize(created)


@router.get("/scores")
async def get_scores():
    # Return top 10 sorted by percentage desc
    docs = await scores_col.find().sort("percentage", -1).limit(10).to_list(10)
    return [serialize(d) for d in docs]


@router.delete("/scores")
async def clear_scores():
    await scores_col.delete_many({})
    return {"message": "All scores cleared"}
