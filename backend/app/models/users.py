from pydantic import BaseModel, EmailStr, Field
from enum import Enum
from bson import ObjectId
from typing import List

from .educational_institution import EducationalInstitution
from .professional_institution import ProfessionalInstitution
from .medical_specialty import MedicalSpecialty

class ProfessionalExperience(BaseModel):
    title: str
    institution: ProfessionalInstitution
    date: str
    description: str
    skills: str
    certificate: str

class socialExperience(BaseModel):
    title: str
    association:str
    date: str
    description: str
    skills: str
    certificate: str
class UserRole(str, Enum):
    admin = "admin"
    student = "student"
    doctor = "doctor"
    expert = "expert"





class UserBase(BaseModel):
    id: str = Field(default=None, alias="_id")
    first_name: str
    family_name: str
    phone_number: str
    adress:str
    sexe:str
    birth_date:str
    profile_image: str
    banner_image: str
    profile_title: str
    profile_description:str

    # Champs obligatoires
    educational_institution: EducationalInstitution = Field(...)
    professional_institution: ProfessionalInstitution = Field(...)
    medical_specialty: MedicalSpecialty = Field(...)

    email_address: EmailStr
    password: str

    professional_experience: List[ProfessionalExperience] = []
    socialExperience: List[socialExperience] = []
    certificates: List[str] = []

    acceptTerms: bool
    acceptPrivacy: bool
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
