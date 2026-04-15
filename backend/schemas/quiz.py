"""
Pydantic schemas for Quiz request/response validation.
"""
from pydantic import BaseModel, Field
from typing import List, Optional


class QuizQuestionCreate(BaseModel):
    question: str = Field(..., example="What does ML stand for?")
    options: List[str] = Field(..., example=["Machine Learning", "Meta Language", "Model Logic", "None"])
    correct_index: int = Field(..., example=0)
    explanation: Optional[str] = Field(None, example="ML stands for Machine Learning.")
    module_id: Optional[str] = Field(None, example="64abc123")


class QuizQuestionUpdate(BaseModel):
    question: Optional[str] = None
    options: Optional[List[str]] = None
    correct_index: Optional[int] = None
    explanation: Optional[str] = None
    module_id: Optional[str] = None


class QuizQuestionResponse(BaseModel):
    id: str
    question: str
    options: List[str]
    correct_index: int
    explanation: Optional[str]
    module_id: Optional[str]


class QuizSubmission(BaseModel):
    question_id: str = Field(..., example="64abc456")
    selected_index: int = Field(..., example=0)


class QuizResult(BaseModel):
    question_id: str
    correct: bool
    correct_index: int
    explanation: Optional[str]
    score: int  # 1 if correct, 0 if not
