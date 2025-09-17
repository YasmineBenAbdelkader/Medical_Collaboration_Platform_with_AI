from pydantic import BaseModel
from typing import Optional


class MedicalSpecialty(BaseModel):
    id: Optional[str]
    med_spec_name: str
    description: Optional[str]
