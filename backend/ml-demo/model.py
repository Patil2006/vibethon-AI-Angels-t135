"""
model.py — Defines the ML model and handles save/load.

We use a Decision Tree Classifier to predict whether a student
will PASS or FAIL based on:
  - hours_studied
  - previous_score
  - attendance
"""

import os
import pickle
from sklearn.tree import DecisionTreeClassifier

# Path where the trained model will be saved
MODEL_PATH = os.path.join(os.path.dirname(__file__), "saved_model", "model.pkl")


def get_model():
    """Create and return a new Decision Tree model."""
    return DecisionTreeClassifier(max_depth=4, random_state=42)


def save_model(model):
    """Save the trained model to disk using pickle."""
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)
    print(f"✅ Model saved to: {MODEL_PATH}")


def load_model():
    """Load the trained model from disk."""
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("❌ Model not found. Please run train.py first.")
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully.")
    return model
