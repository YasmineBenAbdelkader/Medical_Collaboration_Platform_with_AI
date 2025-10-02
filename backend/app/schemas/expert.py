from typing import Optional
from .doctor import DoctorCreate, DoctorRead
from typing import List

class MedicalExpertCreate(DoctorCreate):
    expertise_domain: str
    expertise_type: str
    expertise_description: str
    expertise_certificate: str  
    expertise_duration: str
    official_nomination: str
    publications: List[str] = []
    cover_letter: str  
    mission_availability: str
    professional_number: str
    professional_card: str
    year_of_experience: str
    curriculum_vitae: str
    diploma: str
    

class MedicalExpertRead(DoctorRead):
    expertise_domain: str
    expertise_type: str
    expertise_description: str
    expertise_certificate: str  
    expertise_duration: str
    official_nomination: str
    publications: List[str] = []
    cover_letter: str  
    mission_availability: str
    professional_number: str
    professional_card: str
    year_of_experience: str
    curriculum_vitae: str
    diploma: str
    
    
