from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Index
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from backend.app.db.base import Base

class WearableAccount(Base):
    __tablename__ = "wearable_accounts"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    provider = Column(String, nullable=False)  # e.g., "fitbit", "oura", "google_fit"
    access_token = Column(String, nullable=False)
    refresh_token = Column(String, nullable=True)
    expires_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="wearable_accounts")

    __table_args__ = (
        Index("ix_wearable_user_provider", "user_id", "provider", unique=True),
    )


class WearableReading(Base):
    __tablename__ = "wearable_readings"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    provider = Column(String, nullable=False)
    metric = Column(String, nullable=False)  # e.g., "sleep", "activity"
    timestamp = Column(DateTime(timezone=True), nullable=False)
    data = Column(JSON, nullable=False)

    user = relationship("User", backref="wearable_readings")

    __table_args__ = (
        Index("ix_reading_user_metric_ts", "user_id", "metric", "timestamp"),
    ) 