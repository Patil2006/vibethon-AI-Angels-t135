"""
Routes for Quiz Questions CRUD + answer submission/scoring.
"""
from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import quiz_collection
from schemas.quiz import QuizQuestionCreate, QuizQuestionUpdate, QuizQuestionResponse, QuizSubmission, QuizResult
from models.quiz import question_serializer

router = APIRouter(prefix="/api/quiz", tags=["Quiz"])


@router.get("/", response_model=list[QuizQuestionResponse])
async def get_all_questions():
    questions = await quiz_collection.find().to_list(100)
    return [question_serializer(q) for q in questions]


@router.get("/{id}", response_model=QuizQuestionResponse)
async def get_question(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    q = await quiz_collection.find_one({"_id": ObjectId(id)})
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    return question_serializer(q)


@router.post("/", response_model=QuizQuestionResponse, status_code=201)
async def create_question(data: QuizQuestionCreate):
    result = await quiz_collection.insert_one(data.model_dump())
    created = await quiz_collection.find_one({"_id": result.inserted_id})
    return question_serializer(created)


@router.put("/{id}", response_model=QuizQuestionResponse)
async def update_question(id: str, data: QuizQuestionUpdate):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    await quiz_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})
    updated = await quiz_collection.find_one({"_id": ObjectId(id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Question not found")
    return question_serializer(updated)


@router.delete("/{id}")
async def delete_question(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    result = await quiz_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"message": "Question deleted successfully"}


@router.post("/submit", response_model=QuizResult)
async def submit_answer(submission: QuizSubmission):
    """Submit an answer and get instant scoring feedback."""
    if not ObjectId.is_valid(submission.question_id):
        raise HTTPException(status_code=400, detail="Invalid question ID")
    q = await quiz_collection.find_one({"_id": ObjectId(submission.question_id)})
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    correct = submission.selected_index == q["correct_index"]
    return QuizResult(
        question_id=submission.question_id,
        correct=correct,
        correct_index=q["correct_index"],
        explanation=q.get("explanation"),
        score=1 if correct else 0,
    )
