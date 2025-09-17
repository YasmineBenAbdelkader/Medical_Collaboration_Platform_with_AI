from typing import Optional
from .doctor import Doctor

class MedicalExpert(Doctor):
    blog: Optional[str] = None
    cv: Optional[str] = None
