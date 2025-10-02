from typing import Optional
from .users import UserCreate, UserRead
from typing import List
from pydantic import EmailStr


class StudentCreate(UserCreate):
    certificate_of_university_enrollment: Optional[str] = None
    certificate_of_professional_enrollment: Optional[str] = None



class StudentRead(UserRead):
    certificate_of_university_enrollment: Optional[str] = None
    certificate_of_professional_enrollment: Optional[str] = None
    certificates: Optional[List[str]] = None
    first_name: str
    family_name: str
    phone_number: Optional[str] = None
    profile_image: Optional[str] = None
    banner_image: Optional[str] = None
    profile_title: Optional[str] = None
    address: Optional[str] = None
    educational_institution_id: Optional[str] = None
    professional_institution_id: Optional[str] = None
    medical_specialty_id: Optional[str] = None
    professional_email: Optional[str] = None
    tweeter_url: Optional[str] = None
    website_url: Optional[str] = None
 

