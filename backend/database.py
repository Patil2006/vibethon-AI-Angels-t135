"""
MongoDB connection setup using Motor (async MongoDB driver).
"""
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME   = os.getenv("DB_NAME", "ai_playground")

# Single client instance reused across the app
client = AsyncIOMotorClient(MONGO_URI)
db     = client[DB_NAME]

# Collection references
learn_collection   = db["modules"]
quiz_collection    = db["quizzes"]
profile_collection = db["profiles"]
