from typing import Optional
from pydantic import BaseModel, EmailStr
from typing import List


class UserCreate(BaseModel):
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
    educational_institution:str
    professional_institution: str
    medical_specialty: str

    email_address: EmailStr
    password: str

    professional_experience: List[str] = []
    socialExperience: List[str] = []
    certificates: List[str] = []