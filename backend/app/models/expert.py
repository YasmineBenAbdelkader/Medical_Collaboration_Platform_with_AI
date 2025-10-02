from typing import List
from pydantic import BaseModel
from .doctor import Doctor
from .user import UserRole

class Publication(BaseModel):
    publication_title: str
    publication_domain: str
    publication_description: str
    publication_link: str
    publication_journal: str
    publication_date: str


class MedicalExpert(Doctor):
    expertise_domain: str
    expertise_type: str
    expertise_description: str
    expertise_certificate: str  
    expertise_duration: str
    official_nomination: str
    publications: List[Publication] = []
    cover_letter: str  
    mission_availability: str
    professional_number: str
    professional_card: str
    year_of_experience: str
    curriculum_vitae: str
    diploma: str
    role: UserRole = UserRole.expert  # auto défini
