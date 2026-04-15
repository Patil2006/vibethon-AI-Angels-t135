from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Playground API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "AI Playground API is running"}


@app.get("/api/topics")
def get_topics():
    return [
        {"id": 1, "title": "ML Basics", "tag": "Beginner", "icon": "🧠",
         "description": "Understand what machine learning is and where it's used."},
        {"id": 2, "title": "Data Handling", "tag": "Intermediate", "icon": "📊",
         "description": "Learn how to collect, clean, and prepare data."},
        {"id": 3, "title": "Models", "tag": "Intermediate", "icon": "🤖",
         "description": "Explore decision trees, neural networks, and more."},
    ]


@app.get("/api/stats")
def get_stats():
    return {
        "topics_completed": 0,
        "quiz_score": 0,
        "games_played": 0,
        "streak_days": 1,
    }
