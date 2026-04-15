"""
Pydantic schemas for Learning Module request/response validation.
"""
from pydantic import BaseModel, Field
from typing import Optional, List


class LearnModuleCreate(BaseModel):
    title: str = Field(..., example="ML Basics")
    description: str = Field(..., example="Introduction to machine learning concepts.")
    content: str = Field(..., example="Machine learning is a subset of AI...")
    tag: str = Field(..., example="Beginner")
    icon: Optional[str] = Field("🧠", example="🧠")
    order: Optional[int] = Field(0, example=1)


class LearnModuleUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    tag: Optional[str] = None
    icon: Optional[str] = None
    order: Optional[int] = None


class LearnModuleResponse(BaseModel):
    id: str
    title: str
    description: str
    content: str
    tag: str
    icon: str
    order: int
