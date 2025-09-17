from typing import Optional
from .user import User

class Doctor(User):
    rpps_number: str
    years_of_experience: Optional[int] = None
    diploma: Optional[str] = None
    professional_card: Optional[str] = None
