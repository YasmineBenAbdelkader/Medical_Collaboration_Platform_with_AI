from pydantic import BaseModel
from typing import Optional


class ProfessionalInstitution(BaseModel):
    id: Optional[str] = None
    name: str
    city: Optional[str]
    country: Optional[str]
