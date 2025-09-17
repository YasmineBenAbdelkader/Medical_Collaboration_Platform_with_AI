from typing import Optional
from .doctor import DoctorCreate, DoctorRead

class MedicalExpertCreate(DoctorCreate):
    blog: Optional[str] = None
    cv: Optional[str] = None

class MedicalExpertRead(DoctorRead):
    blog: Optional[str] = None
    cv: Optional[str] = None
