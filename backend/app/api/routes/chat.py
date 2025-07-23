from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool
import google.generativeai as genai
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

from backend.app.core.config import settings
from backend.app.api.routes.users import get_current_user, User

router = APIRouter()


# Configure Gemini
if settings.gemini_api_key:
    genai.configure(api_key=settings.gemini_api_key)


# Mongo client for chat memory
mongo_client = AsyncIOMotorClient(settings.mongodb_uri)
chat_db = mongo_client["sleepfix"]
messages_col = chat_db["chat_messages"]


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


async def _generate_gemini_response(prompt: str) -> str:
    """Generate a completion using Gemini-Pro synchronously inside a threadpool."""
    model = genai.GenerativeModel("gemini-pro")
    result = model.generate_content(prompt)
    # result.text contains plain response
    return result.text


@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, current_user: User | None = Depends(get_current_user)):
    if not settings.gemini_api_key:
        # Return echo response if Gemini key not configured
        return {"response": f"(echo) {request.message}"}

    try:
        response_text: str = await run_in_threadpool(_generate_gemini_response, request.message)

        # Persist user and assistant message pair (anonymously without user id for now)
        doc = {
            "timestamp": datetime.utcnow(),
            "user_message": request.message,
            "assistant_response": response_text,
        }
        if current_user:
            doc["user_id"] = current_user.id
        await messages_col.insert_one(doc)

        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 