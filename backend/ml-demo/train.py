"""
train.py — Train the ML model on student data.

Steps:
  1. Load dataset from CSV
  2. Split into features (X) and label (y)
  3. Split into train/test sets
  4. Train a Decision Tree model
  5. Evaluate accuracy
  6. Save the model
"""

import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from model import get_model, save_model

# ── Step 1: Load dataset ──────────────────────────────────────
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "sample_data.csv")
df = pd.read_csv(DATA_PATH)

print("📊 Dataset Preview:")
print(df.head())
print(f"\nTotal samples: {len(df)}")

# ── Step 2: Define features and label ────────────────────────
# Features: what we use to make predictions
X = df[["hours_studied", "previous_score", "attendance"]]

# Label: what we want to predict (0 = Fail, 1 = Pass)
y = df["passed"]

# ── Step 3: Split into train and test sets ────────────────────
# 80% training, 20% testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"\n🔀 Train samples: {len(X_train)} | Test samples: {len(X_test)}")

# ── Step 4: Train the model ───────────────────────────────────
model = get_model()
model.fit(X_train, y_train)
print("\n🤖 Model training complete!")

# ── Step 5: Evaluate accuracy ─────────────────────────────────
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"\n✅ Accuracy: {accuracy * 100:.2f}%")
print("\n📋 Classification Report:")
print(classification_report(y_test, y_pred, target_names=["Fail", "Pass"]))

# ── Step 6: Save the model ────────────────────────────────────
save_model(model)
print("\n🎉 Training complete! Model is ready for predictions.")
