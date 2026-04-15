"""
Helper to serialize MongoDB learn module documents.
"""
from bson import ObjectId


def module_serializer(module: dict) -> dict:
    return {
        "id": str(module["_id"]),
        "title": module.get("title", ""),
        "description": module.get("description", ""),
        "content": module.get("content", ""),
        "tag": module.get("tag", ""),
        "icon": module.get("icon", "🧠"),
        "order": module.get("order", 0),
    }
