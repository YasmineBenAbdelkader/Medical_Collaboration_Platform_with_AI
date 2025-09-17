from typing import Optional
from .users import UserCreate, UserRead

class DoctorCreate(UserCreate):
    rpps_number: str
    years_of_experience: Optional[int] = None
    diploma: Optional[str] = None
    professional_card: Optional[str] = None

class DoctorRead(UserRead):
    rpps_number: str
    years_of_experience: Optional[int] = None
    diploma: Optional[str] = None
    professional_card: Optional[str] = None
