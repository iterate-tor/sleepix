from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from backend.app.db.base import Base
from backend.app.core.security import get_password_hash

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    organization_id = Column(Integer, ForeignKey("organizations.id", ondelete="SET NULL"), nullable=True)
    role = Column(String, nullable=False, server_default="user")  # roles: user, hr, admin
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    @staticmethod
    def get_password_hash(password: str) -> str:
        return get_password_hash(password) 