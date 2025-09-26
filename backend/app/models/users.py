from pydantic import BaseModel, EmailStr, Field
from enum import Enum
from bson import ObjectId

from .educational_institution import EducationalInstitution
from .professional_institution import ProfessionalInstitution
from .medical_specialty import MedicalSpecialty


class UserRole(str, Enum):
    admin = "admin"
    student = "student"
    doctor = "doctor"
    expert = "expert"


class Address(BaseModel):
    city: str
    country: str


class UserBase(BaseModel):
    id: str = Field(default=None, alias="_id")
    first_name: str
    family_name: str
    phone_number: str

    profile_image: str
    banner_image: str
    profile_title: str

    address: Address

    # Champs obligatoires
    educational_institution: EducationalInstitution = Field(...)
    professional_institution: ProfessionalInstitution = Field(...)
    medical_specialty: MedicalSpecialty = Field(...)

    email_address: EmailStr
    password: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
