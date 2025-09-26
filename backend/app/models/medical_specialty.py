from pydantic import BaseModel
from typing import Optional


class MedicalSpecialty(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str]
