from fastapi import APIRouter

from backend.app.api.routes import auth, users, assessments, chat, sleep, hr, wearables

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(assessments.router, prefix="/assessments", tags=["assessments"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(sleep.router, prefix="/sleep", tags=["sleep"])
api_router.include_router(hr.router, prefix="/hr", tags=["hr"])
api_router.include_router(wearables.router, prefix="/wearables", tags=["wearables"]) 