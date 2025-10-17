from typing import Optional
from .users import UserCreate, UserRead
from typing import Optional


class DoctorCreate(UserCreate):
    professional_number: str
    professional_card: str
    year_of_experience: str
    curriculum_vitae: str
    diploma: str

class DoctorRead(UserRead):
    first_name: str
    family_name: str
    email_address: str
    password: str
    phone_number: str
    profile_title: str
    diploma: str
    professional_card: str
    profile_image: str
    role: str

    # Champs facultatifs
    adress: Optional[str] = None
    sexe: Optional[str] = None
    birth_date: Optional[str] = None
    banner_image: Optional[str] = None
    profile_description: Optional[str] = None
    professional_email: Optional[str] = None
    tweeter_url: Optional[str] = None
    website_url: Optional[str] = None
    acceptTerms: Optional[bool] = None
    acceptPrivacy: Optional[bool] = None
    id: Optional[str] = None
    educational_institution: Optional[dict] = None
    medical_specialty: Optional[dict] = None
    professional_institution: Optional[dict] = None
    professional_number: Optional[str] = None
    year_of_experience: Optional[int] = None
    curriculum_vitae: Optional[str] = None
