"""
Pydantic schemas for User Profile request/response validation.
"""
from pydantic import BaseModel, Field, EmailStr
from typing import Optional


class ProfileCreate(BaseModel):
    username: str = Field(..., example="john_doe")
    email: EmailStr = Field(..., example="john@example.com")
    avatar: Optional[str] = Field("🧑", example="🧑")


class ProfileUpdate(BaseModel):
    username: Optional[str] = None
    avatar: Optional[str] = None
    topics_completed: Optional[int] = None
    quiz_score: Optional[int] = None
    games_played: Optional[int] = None
    streak_days: Optional[int] = None


class ProfileResponse(BaseModel):
    id: str
    username: str
    email: str
    avatar: str
    topics_completed: int
    quiz_score: int
    games_played: int
    streak_days: int
