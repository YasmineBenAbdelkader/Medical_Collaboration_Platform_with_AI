from pydantic import BaseModel
from typing import Optional

class ProfessionalInstitutionCreate(BaseModel):
    name: str
    city: Optional[str]
    country: Optional[str]

class ProfessionalInstitutionRead(ProfessionalInstitutionCreate):
    id: Optional[str] = None
