from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from backend.app.core.config import settings

engine = create_async_engine(settings.postgres_dsn, echo=False, future=True)

AsyncSessionLocal = sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession,
)

async def get_db():
    """FastAPI dependency that provides an async database session per request."""
    async with AsyncSessionLocal() as session:
        yield session 