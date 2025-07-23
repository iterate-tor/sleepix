from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.schemas.assessment import AssessmentIn, AssessmentOut
from backend.app.models.sleep_assessment import SleepAssessment
from backend.app.db.session import get_db
from backend.app.api.routes.users import get_current_user, User

router = APIRouter()


# --- PSQI Scoring helpers ---
# Mapping constants – keys expected in answers dict (string identifiers)
# For brevity, we assume the frontend sends pre-calculated component scores 0-3
PSQI_COMPONENT_KEYS = [
    "subjective_quality",
    "sleep_latency",
    "sleep_duration",
    "habitual_sleep_efficiency",
    "sleep_disturbances",
    "sleep_medication",
    "daytime_dysfunction",
]


def calculate_psqi_score(answers: dict[str, int]) -> int:
    """Return global PSQI score (0-21).

    The caller must supply answers dict with component-level scores 0-3 for
    each of the 7 PSQI components. If raw questionnaire answers are supplied
    instead, preprocessing should happen in the frontend or a dedicated
    service. Here we keep the backend lean and deterministic.
    """
    missing = [k for k in PSQI_COMPONENT_KEYS if k not in answers]
    if missing:
        raise ValueError(f"Missing PSQI component scores: {', '.join(missing)}")

    total = sum(int(answers[k]) for k in PSQI_COMPONENT_KEYS)
    return total


def generate_recommendation(score: int) -> str:
    if score <= 5:
        return "Great sleep quality! Keep it up."
    elif score <= 10:
        return (
            "Your sleep is moderately impaired. Consider a consistent bedtime, "
            "reducing screen exposure 1h before sleep, and practicing relaxation techniques."
        )
    else:
        return (
            "Poor sleep quality detected. We recommend scheduling a consultation "
            "with a certified sleep specialist and reviewing lifestyle factors."
        )


@router.post("/psqi", response_model=AssessmentOut, status_code=status.HTTP_201_CREATED)
async def submit_psqi(
    assessment: AssessmentIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Persist PSQI assessment and return computed score & recommendation."""
    try:
        score = calculate_psqi_score(assessment.answers)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    sa = SleepAssessment(
        user_id=current_user.id,
        type="PSQI",
        score=score,
        answers=assessment.answers,
    )
    db.add(sa)
    await db.commit()
    await db.refresh(sa)

    recommendation = generate_recommendation(score)

    return {"id": sa.id, "type": "PSQI", "answers": assessment.answers, "score": score, "recommendation": recommendation} 