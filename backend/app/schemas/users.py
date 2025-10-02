from typing import Optional
from pydantic import BaseModel, EmailStr
from typing import List


class UserCreate(BaseModel):
    first_name: str
    family_name: str
    phone_number: str
    profile_image: str
    profile_title: str
    address: str
    educational_institution_id: str
    professional_institution_id: str
    medical_specialty_id: str
    professional_email: str
    tweeter_url: str
    website_url: str
    email_address: EmailStr
    password: str
    acceptTerms: bool
    acceptPrivacy: bool
    acceptTerms: bool
    acceptPrivacy: bool
    



class UserRead(UserCreate):
    id: str
    role: str
