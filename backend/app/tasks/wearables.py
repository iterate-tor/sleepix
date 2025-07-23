from __future__ import annotations

import datetime as dt
import logging
from typing import Any

import httpx
from celery import Celery
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.config import settings
from backend.app.db.session import AsyncSessionLocal
from backend.app.models.wearable import WearableAccount, WearableReading

logger = logging.getLogger(__name__)

celery_app = Celery("sleepfix"); celery_app.conf.broker_url = settings.redis_url

# Beat schedule every 30 minutes
celery_app.conf.beat_schedule = {
    "pull-fitbit": {"task": "wearables.pull_fitbit", "schedule": 30 * 60},
    "pull-oura": {"task": "wearables.pull_oura", "schedule": 30 * 60},
    "pull-google-fit": {"task": "wearables.pull_google_fit", "schedule": 30 * 60},
}


async def _save_reading(session: AsyncSession, account: WearableAccount, metric: str, timestamp: dt.datetime, data: Any):
    reading = WearableReading(
        user_id=account.user_id,
        provider=account.provider,
        metric=metric,
        timestamp=timestamp,
        data=data,
    )
    session.add(reading)


@celery_app.task(name="wearables.pull_fitbit")
def pull_fitbit():
    """Fetch latest sleep & readiness from Fitbit for all linked accounts (simplified)."""
    import asyncio

    async def _run():
        async with AsyncSessionLocal() as session:
            accounts = (await session.execute(
                """SELECT * FROM wearable_accounts WHERE provider = 'fitbit'"""
            )).scalars().all()

            for acc in accounts:
                # Refresh if token is expiring soon (5 min buffer)
                if acc.expires_at and acc.expires_at - dt.timedelta(minutes=5) < dt.datetime.utcnow():
                    await _refresh_fitbit_token(acc, session)

                # TODO: error handling for refresh failures
                headers = {"Authorization": f"Bearer {acc.access_token}"}
                async with httpx.AsyncClient(timeout=20) as client:
                    # Example endpoint
                    url = "https://api.fitbit.com/1.2/user/-/sleep/date/today.json"
                    r = await client.get(url, headers=headers)
                    if r.status_code != 200:
                        logger.warning("Fitbit API error %s", r.text[:200])
                        continue
                    sleep_json = r.json()
                    # Extract summary sleep score etc. This is placeholder.
                    timestamp = dt.datetime.utcnow()
                    await _save_reading(session, acc, "sleep", timestamp, sleep_json)

            await session.commit()

    asyncio.run(_run())


# TODO: similar tasks for Oura, Google Fit 
# ----------------- Oura -----------------

@celery_app.task(name="wearables.pull_oura")
def pull_oura():
    """Pull daily sleep score from Oura Cloud API (placeholder)."""
    import asyncio, json

    async def _run():
        async with AsyncSessionLocal() as session:
            accounts = (await session.execute(
                """SELECT * FROM wearable_accounts WHERE provider = 'oura'"""
            )).scalars().all()

            for acc in accounts:
                headers = {"Authorization": f"Bearer {acc.access_token}"}
                today = dt.date.today().isoformat()
                url = f"https://api.ouraring.com/v2/usercollection/sleep?start_date={today}&end_date={today}"
                async with httpx.AsyncClient(timeout=20) as client:
                    r = await client.get(url, headers=headers)
                    if r.status_code != 200:
                        logger.warning("Oura API error %s", r.text[:200])
                        continue
                    data = r.json()
                    timestamp = dt.datetime.utcnow()
                    await _save_reading(session, acc, "sleep", timestamp, data)

            await session.commit()

    asyncio.run(_run())


# ----------------- Google Fit -----------------

@celery_app.task(name="wearables.pull_google_fit")
def pull_google_fit():
    """Pull aggregated sleep data using Google Fit REST + SA credentials."""
    import asyncio, json, google.auth
    from google.oauth2 import service_account
    from google.auth.transport.requests import AuthorizedSession

    if not settings.google_fit_service_account_json:
        logger.info("Google Fit SA not configured, skipping")
        return

    SCOPES = ["https://www.googleapis.com/auth/fitness.sleep.read"]
    creds = service_account.Credentials.from_service_account_file(
        settings.google_fit_service_account_json, scopes=SCOPES
    )
    authed = AuthorizedSession(creds)

    async def _run():
        async with AsyncSessionLocal() as session:
            # For SA model, readings likely aggregated for single org account – tie to org id 0
            url = "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate"
            body = {
                "aggregateBy": [{"dataTypeName": "com.google.sleep.segment"}],
                "bucketByTime": {"durationMillis": 24 * 60 * 60 * 1000},
                "startTimeMillis": int((dt.datetime.utcnow() - dt.timedelta(days=1)).timestamp() * 1000),
                "endTimeMillis": int(dt.datetime.utcnow().timestamp() * 1000),
            }
            r = authed.post(url, json=body)
            if r.status_code != 200:
                logger.warning("Google Fit error %s", r.text[:200])
                return
            data = r.json()
            # Store under a synthetic account since SA has no user
            timestamp = dt.datetime.utcnow()
            synthetic_account = WearableAccount(user_id=0, provider="google_fit", access_token="", refresh_token=None)
            await _save_reading(session, synthetic_account, "sleep", timestamp, data)
            await session.commit()

    asyncio.run(_run()) 

async def _refresh_fitbit_token(acc: WearableAccount, session: AsyncSession):
    """Refresh Fitbit access token using stored refresh_token."""
    if not acc.refresh_token:
        return
    auth_header = base64.b64encode(f"{settings.fitbit_client_id}:{settings.fitbit_client_secret}".encode()).decode()
    headers = {"Authorization": f"Basic {auth_header}", "Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "refresh_token",
        "refresh_token": acc.refresh_token,
    }
    async with httpx.AsyncClient() as client:
        r = await client.post("https://api.fitbit.com/oauth2/token", data=data, headers=headers)
        if r.status_code != 200:
            logger.warning("Fitbit refresh failed %s", r.text[:200])
            return
        tj = r.json()
        acc.access_token = tj["access_token"]
        acc.refresh_token = tj.get("refresh_token", acc.refresh_token)
        exp_sec = tj.get("expires_in")
        if exp_sec:
            acc.expires_at = dt.datetime.utcnow() + dt.timedelta(seconds=exp_sec)
        await session.flush() 