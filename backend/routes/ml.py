"""
routes/ml.py — FastAPI endpoint for ML predictions.
Connects the ML demo to the frontend via REST API.
"""

import sys
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

# Add ml-demo folder to path so we can import predict.py
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "ml-demo"))
from predict import predict_student

router = APIRouter(prefix="/api/ml", tags=["ML Demo"])


class StudentInput(BaseModel):
    hours_studied: float = Field(..., ge=0, le=24, example=7)
    previous_score: float = Field(..., ge=0, le=100, example=65)
    attendance: float = Field(..., ge=0, le=100, example=80)


@router.post("/predict")
def predict(data: StudentInput):
    """
    Predict if a student will Pass or Fail.

    - **hours_studied**: Hours studied per day (0–24)
    - **previous_score**: Previous exam score (0–100)
    - **attendance**: Attendance percentage (0–100)
    """
    try:
        result = predict_student(data.hours_studied, data.previous_score, data.attendance)
        return result
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="ML model not trained yet. Run train.py first."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/info")
def model_info():
    """Returns info about the ML model used."""
    return {
        "model": "Decision Tree Classifier",
        "features": ["hours_studied", "previous_score", "attendance"],
        "output": "Pass (1) or Fail (0)",
        "library": "scikit-learn",
        "status": "ready"
    }
