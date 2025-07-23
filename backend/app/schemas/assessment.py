from pydantic import BaseModel
from typing import Dict

class AssessmentIn(BaseModel):
    answers: Dict[str, int]


# Response model that includes stored record metadata
class AssessmentOut(BaseModel):
    id: int
    type: str
    answers: Dict[str, int]
    score: int
    recommendation: str

    class Config:
        orm_mode = True 