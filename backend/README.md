# SleepFix.ai Backend

This is the FastAPI backend service powering SleepFix.ai.

## Requirements

- Python 3.11+
- PostgreSQL 14+
- (Optional) MongoDB 6 for chat memory & unstructured data.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows
pip install -r backend/requirements.txt

# Copy .env.example to .env and adjust values
uvicorn backend.app.main:app --reload
```

## Environment Variables (.env)

```
SECRET_KEY=supersecret
POSTGRES_DSN=postgresql+asyncpg://user:password@localhost:5432/sleepfix
MONGODB_URI=mongodb://localhost:27017
GEMINI_API_KEY=
```

## API Docs

After running, navigate to `http://localhost:8000/api/v1/docs` for Swagger UI. 

## Database migrations (Alembic)

```bash
# after installing deps and configuring .env
alembic upgrade head            # apply latest migrations
# when you change models
alembic revision --autogenerate -m "new change"
alembic upgrade head
```

## Seed dev data
```bash
python -m backend.scripts.seed
```

## Background worker

The Celery worker communicates via Redis (set `REDIS_URL` in `.env`).

```bash
celery -A backend.worker worker --loglevel=info --beat
```

The bundled `wearables.pull_fitbit` periodic task demonstrates how to ingest Fitbit sleep data; extend similarly for Oura and Google Fit. 