from datetime import datetime
from fastapi import APIRouter

router = APIRouter()


@router.get("/summary")
async def daily_sleep_summary():
    # Placeholder implementation
    return {
        "date": datetime.utcnow().date(),
        "sleep_score": 80,
        "recommendations": [
            "Aim for consistent bedtime.",
            "Reduce caffeine intake after 2 PM.",
        ],
    } 