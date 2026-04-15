# 🤖 AI Playground – Learn Machine Learning by Playing

> An interactive AI learning platform built for **Vibethon Hackathon** by **Team AI Angels (T135)**

---

## 🚀 Live Features

- 🔐 Login with email validation + password strength rules
- ⚡ Auto password generator (5 strong suggestions)
- 👁️ Show/hide password toggle
- 📚 Learn page with ML topic cards
- 📊 Dashboard with progress stats
- 🎮 Mini Game (coming soon)
- 📝 Quiz (coming soon)
- 🗂️ Sidebar + Navbar navigation

---

## 🗂️ Project Structure

```
ai-playground/
├── frontend/                  # React.js frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx     # Top navigation bar
│       │   └── Sidebar.jsx    # Slide-in sidebar menu
│       ├── context/
│       │   └── AuthContext.jsx  # Auth state management
│       ├── pages/
│       │   ├── Home.jsx       # Landing/hero page
│       │   ├── Dashboard.jsx  # User stats & activity
│       │   ├── Learn.jsx      # ML topic cards
│       │   ├── Quiz.jsx       # Quiz placeholder
│       │   ├── Game.jsx       # Game placeholder
│       │   └── Login.jsx      # Login + password tools
│       ├── App.jsx            # Routes & layout
│       ├── App.css            # Global styles
│       └── index.js           # React entry point
│
├── backend/                   # FastAPI backend
│   ├── routes/
│   │   ├── learn.py           # Learning module CRUD
│   │   ├── quiz.py            # Quiz CRUD + scoring
│   │   └── profile.py         # User profile CRUD
│   ├── schemas/
│   │   ├── learn.py           # Pydantic schemas
│   │   ├── quiz.py
│   │   └── profile.py
│   ├── models/
│   │   ├── learn.py           # MongoDB serializers
│   │   ├── quiz.py
│   │   └── profile.py
│   ├── database.py            # MongoDB connection
│   ├── main.py                # FastAPI app entry point
│   └── requirements.txt       # Python dependencies
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| Styling | Plain CSS (no libraries) |
| Backend | FastAPI (Python) |
| Database | MongoDB + Motor (async) |
| Validation | Pydantic v2 |
| API Docs | Swagger UI (auto) |

---

## ⚙️ Setup & Run

### Frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3001
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# Runs on http://localhost:8000
# Swagger docs → http://localhost:8000/docs
```

### MongoDB
Make sure MongoDB is running locally:
```bash
mongod
```
Or update `backend/.env` with your MongoDB Atlas URI.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/learn` | Get all learning modules |
| POST | `/api/learn` | Create a module |
| PUT | `/api/learn/{id}` | Update a module |
| DELETE | `/api/learn/{id}` | Delete a module |
| GET | `/api/quiz` | Get all quiz questions |
| POST | `/api/quiz/submit` | Submit answer + get score |
| GET | `/api/profile` | Get all profiles |
| POST | `/api/profile` | Create user profile |

---

## 👥 Team

**Team Name:** AI Angels
**Team ID:** T135
**Hackathon:** Vibethon

---

## 📄 License

MIT License — free to use and modify.
