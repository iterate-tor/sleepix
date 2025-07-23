from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    """Application configuration pulled from environment vars or .env"""

    api_v1_prefix: str = "/api/v1"
    secret_key: str = "CHANGE_ME"
    access_token_expire_minutes: int = 60

    postgres_dsn: str = "postgresql+asyncpg://user:password@localhost:5432/sleepfix"
    mongodb_uri: str = "mongodb://localhost:27017"
    gemini_api_key: str = ""

    # Celery / Redis
    redis_url: str = "redis://localhost:6379/0"

    # OAuth credentials for wearables (set in env file)
    fitbit_client_id: str | None = None
    fitbit_client_secret: str | None = None
    oura_client_id: str | None = None
    oura_client_secret: str | None = None

    google_fit_service_account_json: str | None = None  # path to SA for Google Fit REST

    allowed_origins: List[str] = ["*"]  # TODO: tighten in production

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings() 