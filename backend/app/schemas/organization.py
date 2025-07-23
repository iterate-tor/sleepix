from pydantic import BaseModel

class OrganizationBase(BaseModel):
    name: str


class OrganizationOut(OrganizationBase):
    id: int

    class Config:
        orm_mode = True 