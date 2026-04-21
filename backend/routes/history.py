"""
routes/history.py — Save quiz results and ML prediction history to MongoDB
"""
from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional
from database import db
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/api/history", tags=["History"])

quiz_col = db["quiz_results"]
pred_col = db["ml_predictions"]


# ── Quiz Results ──────────────────────────────────────────────
class QuizResultIn(BaseModel):
    username: str
    score: int
    total: int
    percentage: int


def serialize(doc):
    doc["id"] = str(doc.pop("_id"))
    return doc


@router.post("/quiz", status_code=201)
async def save_quiz_result(data: QuizResultIn):
    doc = {**data.model_dump(), "saved_at": datetime.utcnow().isoformat()}
    result = await quiz_col.insert_one(doc)
    created = await quiz_col.find_one({"_id": result.inserted_id})
    return serialize(created)


@router.get("/quiz")
async def get_quiz_results():
    docs = await quiz_col.find().sort("percentage", -1).limit(20).to_list(20)
    return [serialize(d) for d in docs]


# ── ML Prediction History ─────────────────────────────────────
class PredictionIn(BaseModel):
    username: str
    hours_studied: float
    previous_score: float
    attendance: float
    prediction: str
    confidence: str
    result_code: int


@router.post("/predictions", status_code=201)
async def save_prediction(data: PredictionIn):
    doc = {**data.model_dump(), "saved_at": datetime.utcnow().isoformat()}
    result = await pred_col.insert_one(doc)
    created = await pred_col.find_one({"_id": result.inserted_id})
    return serialize(created)


@router.get("/predictions")
async def get_predictions():
    docs = await pred_col.find().sort("saved_at", -1).limit(20).to_list(20)
    return [serialize(d) for d in docs]


@router.get("/predictions/{username}")
async def get_user_predictions(username: str):
    docs = await pred_col.find({"username": username}).sort("saved_at", -1).to_list(50)
    return [serialize(d) for d in docs]
