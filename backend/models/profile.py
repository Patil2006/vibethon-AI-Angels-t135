"""
Helper to serialize MongoDB user profile documents.
"""


def profile_serializer(p: dict) -> dict:
    return {
        "id": str(p["_id"]),
        "username": p.get("username", ""),
        "email": p.get("email", ""),
        "avatar": p.get("avatar", "🧑"),
        "topics_completed": p.get("topics_completed", 0),
        "quiz_score": p.get("quiz_score", 0),
        "games_played": p.get("games_played", 0),
        "streak_days": p.get("streak_days", 1),
    }
