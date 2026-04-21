"""
AI Playground - FastAPI Backend
Entry point: registers all routers and configures CORS + Swagger.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import learn, quiz, profile, ml, game, history

app = FastAPI(
    title="AI Playground API",
    description="Backend for the AI Learning Platform — Learn, Quiz, and Profile management.",
    version="1.0.0",
)

# Allow React frontend on localhost:3001
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(learn.router)
app.include_router(quiz.router)
app.include_router(profile.router)
app.include_router(ml.router)
app.include_router(game.router)
app.include_router(history.router)


@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "message": "AI Playground API is running 🚀"}
