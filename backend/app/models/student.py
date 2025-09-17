from typing import Optional
from .user import User

class Student(User):
    subscription_number: str
    certificate_of_enrollment: Optional[str] = None
