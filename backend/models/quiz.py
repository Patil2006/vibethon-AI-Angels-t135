"""
Helper to serialize MongoDB quiz question documents.
"""


def question_serializer(q: dict) -> dict:
    return {
        "id": str(q["_id"]),
        "question": q.get("question", ""),
        "options": q.get("options", []),
        "correct_index": q.get("correct_index", 0),
        "explanation": q.get("explanation"),
        "module_id": q.get("module_id"),
    }
