from typing import Optional
from pydantic import BaseModel, EmailStr
from .address import Address  # <-- ici, pas de boucle

class UserCreate(BaseModel):
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

class UserRead(UserCreate):
    id: str
    role: str
