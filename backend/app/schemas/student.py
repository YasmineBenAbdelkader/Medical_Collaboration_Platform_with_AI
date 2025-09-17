from typing import Optional
from .users import UserCreate, UserRead

class StudentCreate(UserCreate):
    subscription_number: str
    certificate_of_enrollment: Optional[str] = None

class StudentRead(UserRead):
    subscription_number: str
    certificate_of_enrollment: Optional[str] = None
