from typing import Dict
from pydantic import BaseModel

class SleepAssessmentBase(BaseModel):
    type: str  # e.g., "PSQI"
    answers: Dict[str, int]
    score: int

    class Config:
        orm_mode = True


class SleepAssessmentOut(SleepAssessmentBase):
    id: int
    user_id: int 