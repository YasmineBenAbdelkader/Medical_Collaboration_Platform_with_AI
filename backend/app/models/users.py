from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from .base import PyObjectId

class Address(BaseModel):
    country: str
    city: str

class User(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    first_name: str
    family_name: str
    phone_number: Optional[str] = None
    profile_image: Optional[str] = None
    banner_image: Optional[str] = None
    profile_title: Optional[str] = None
    address: Optional[Address] = None
    educational_institution_id: Optional[str] = None
    professional_institution_id: Optional[str] = None
    medical_specialty_id: Optional[str] = None
    email_address: EmailStr
    password: str
    role: str  # 'student', 'doctor', 'expert'

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {PyObjectId: str}
