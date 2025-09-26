from pydantic import BaseModel
from typing import Optional

class MedicalSpecialtyCreate(BaseModel):
    name: str
    description: Optional[str]

class MedicalSpecialtyRead(MedicalSpecialtyCreate):
    id: Optional[str] = None
