"""
Learning Microservice — Service Dog Education API
Provides questions and validates answers for the Tamagotchi learning system.

This is a standalone Python service that can run alongside the Next.js app.
Falls back to the client-side question bank when this service is unavailable.

Usage:
    pip install fastapi uvicorn
    uvicorn app:app --port 8001
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import random

app = FastAPI(title="Portfolio Learning Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


# --- Models ---

class QuestionRequest(BaseModel):
    category: Optional[str] = None


class ValidateRequest(BaseModel):
    questionId: str
    answerIndex: int


class QuestionResponse(BaseModel):
    id: str
    question: str
    options: list[str]
    correctIndex: int
    category: str
    difficulty: int


class ValidationResponse(BaseModel):
    correct: bool
    xpGained: int
    statBoosts: dict


# --- Question Bank ---

QUESTIONS = [
    {
        "id": "q1",
        "question": "What is the primary role of a service dog?",
        "options": [
            "To perform tricks for entertainment",
            "To assist a person with a disability",
            "To guard a property",
            "To compete in dog shows",
        ],
        "correctIndex": 1,
        "category": "service_dog_basics",
        "difficulty": 1,
    },
    {
        "id": "q2",
        "question": "Which of these is a key trait of a well-trained service dog?",
        "options": [
            "Aggressive toward strangers",
            "Easily distracted by other animals",
            "Calm and focused in public settings",
            "Extremely vocal",
        ],
        "correctIndex": 2,
        "category": "training_techniques",
        "difficulty": 1,
    },
    {
        "id": "q3",
        "question": "What does 'positive reinforcement' mean in dog training?",
        "options": [
            "Punishing bad behavior",
            "Rewarding desired behavior to encourage repetition",
            "Ignoring the dog completely",
            "Using loud commands",
        ],
        "correctIndex": 1,
        "category": "training_techniques",
        "difficulty": 1,
    },
    {
        "id": "q4",
        "question": "How can you tell if a dog is stressed?",
        "options": [
            "Wagging tail rapidly",
            "Panting, yawning, or lip licking",
            "Sitting calmly",
            "Eating enthusiastically",
        ],
        "correctIndex": 1,
        "category": "dog_behavior",
        "difficulty": 2,
    },
    {
        "id": "q5",
        "question": "What is 'task training' for a service dog?",
        "options": [
            "Teaching the dog to fetch toys",
            "Training the dog to perform specific tasks related to the handler's disability",
            "General obedience training",
            "Agility course training",
        ],
        "correctIndex": 1,
        "category": "service_dog_basics",
        "difficulty": 2,
    },
]


# --- Routes ---

@app.post("/learning/question", response_model=QuestionResponse)
async def get_question(request: QuestionRequest):
    pool = QUESTIONS
    if request.category:
        pool = [q for q in QUESTIONS if q["category"] == request.category]
    if not pool:
        pool = QUESTIONS

    question = random.choice(pool)
    return QuestionResponse(**question)


@app.post("/learning/validate", response_model=ValidationResponse)
async def validate_answer(request: ValidateRequest):
    question = next((q for q in QUESTIONS if q["id"] == request.questionId), None)

    if not question:
        return ValidationResponse(correct=False, xpGained=0, statBoosts={})

    correct = question["correctIndex"] == request.answerIndex
    difficulty = question["difficulty"]

    return ValidationResponse(
        correct=correct,
        xpGained=25 * difficulty if correct else 0,
        statBoosts={
            "hunger": 10,
            "happiness": 15,
            "intelligence": 5 * difficulty,
        }
        if correct
        else {},
    )


@app.get("/health")
async def health():
    return {"status": "ok", "service": "learning-service"}
