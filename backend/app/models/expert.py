from typing import Optional
from .doctor import Doctor
from .user import UserRole


class MedicalExpert(Doctor):
    blog: Optional[str]
    cv: Optional[str]   # ex : chemin ou URL vers le CV PDF
    role: UserRole = UserRole.expert  # auto défini
