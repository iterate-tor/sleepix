from datetime import datetime, timedelta
from typing import Dict

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.db.session import get_db
from backend.app.models.organization import Organization
from backend.app.models.user import User
from backend.app.models.sleep_assessment import SleepAssessment
from backend.app.api.routes.users import require_hr, User

router = APIRouter()


@router.get("/{org_id}/kpis")
async def get_org_kpis(org_id: int, db: AsyncSession = Depends(get_db), _: User = Depends(require_hr)) -> Dict[str, float]:
    """Return average PSQI score for the organization over the last 7 days."""
    org = (await db.execute(select(Organization).where(Organization.id == org_id))).scalar_one_or_none()
    if org is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organization not found")

    seven_days_ago = datetime.utcnow() - timedelta(days=7)

    q = (
        select(func.avg(SleepAssessment.score))
        .join(User, User.id == SleepAssessment.user_id)
        .where(User.organization_id == org_id)
        .where(SleepAssessment.type == "PSQI")
        .where(SleepAssessment.created_at >= seven_days_ago)
    )
    result = await db.execute(q)
    avg_score = result.scalar() or 0

    # Percent employees below healthy threshold (avg PSQI < 10) over 7 days
    threshold_q = (
        select(func.count(func.distinct(User.id)))
        .join(SleepAssessment, SleepAssessment.user_id == User.id)
        .where(User.organization_id == org_id)
        .where(SleepAssessment.type == "PSQI")
        .where(SleepAssessment.created_at >= seven_days_ago)
        .group_by(User.id)
        .having(func.avg(SleepAssessment.score) < 10)
    )
    threshold_count = len((await db.execute(threshold_q)).all())

    total_emp_q = select(func.count()).select_from(User).where(User.organization_id == org_id)
    total_employees = (await db.execute(total_emp_q)).scalar() or 0
    pct_healthy = round((threshold_count / total_employees * 100) if total_employees else 0, 2)

    # Trend: compare current 7-day avg with previous 7 days
    prev_start = seven_days_ago - timedelta(days=7)
    prev_q = (
        select(func.avg(SleepAssessment.score))
        .join(User, User.id == SleepAssessment.user_id)
        .where(User.organization_id == org_id)
        .where(SleepAssessment.type == "PSQI")
        .where(SleepAssessment.created_at >= prev_start)
        .where(SleepAssessment.created_at < seven_days_ago)
    )
    prev_avg = (await db.execute(prev_q)).scalar() or 0
    trend_delta = round(avg_score - prev_avg, 2)

    return {
        "organization_id": org_id,
        "average_psqi_score_last_7_days": round(avg_score, 2),
        "percent_employees_healthy": pct_healthy,
        "avg_psqi_change_vs_prev_week": trend_delta,
    } 