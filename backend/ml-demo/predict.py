"""
predict.py — Make predictions using the trained model.

Input:  hours_studied, previous_score, attendance
Output: Pass or Fail + confidence percentage
"""

from model import load_model


def predict_student(hours_studied: float, previous_score: float, attendance: float) -> dict:
    """
    Predict if a student will pass or fail.

    Args:
        hours_studied  : Number of hours studied per day
        previous_score : Score in previous exam (0–100)
        attendance     : Attendance percentage (0–100)

    Returns:
        dict with prediction label, confidence, and input summary
    """
    model = load_model()

    # Prepare input as a 2D array (model expects this format)
    input_data = [[hours_studied, previous_score, attendance]]

    # Get prediction: 0 = Fail, 1 = Pass
    prediction = model.predict(input_data)[0]

    # Get confidence probabilities for each class
    probabilities = model.predict_proba(input_data)[0]
    confidence = round(float(max(probabilities)) * 100, 2)

    result = {
        "input": {
            "hours_studied": hours_studied,
            "previous_score": previous_score,
            "attendance": attendance,
        },
        "prediction": "Pass ✅" if prediction == 1 else "Fail ❌",
        "result_code": int(prediction),
        "confidence": f"{confidence}%",
        "message": (
            "Great job! Keep it up! 🎉" if prediction == 1
            else "Study more and improve attendance! 💪"
        ),
    }
    return result


# ── Run directly for quick testing ───────────────────────────
if __name__ == "__main__":
    print("🔍 Running sample predictions...\n")

    test_cases = [
        (8, 70, 85),   # Should Pass
        (2, 35, 50),   # Should Fail
        (5, 55, 72),   # Borderline
    ]

    for hours, score, attendance in test_cases:
        result = predict_student(hours, score, attendance)
        print(f"Input  → Hours: {hours}, Score: {score}, Attendance: {attendance}%")
        print(f"Output → {result['prediction']} (Confidence: {result['confidence']})")
        print(f"         {result['message']}\n")
