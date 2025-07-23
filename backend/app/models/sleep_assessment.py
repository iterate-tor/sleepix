from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from backend.app.db.base import Base

class SleepAssessment(Base):
    __tablename__ = "sleep_assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    type = Column(String, nullable=False)  # e.g., "PSQI"
    score = Column(Integer, nullable=False)
    answers = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="assessments") 