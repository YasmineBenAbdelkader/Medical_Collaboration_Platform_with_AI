from typing import Optional
from pydantic import BaseModel
from .users import User


class Student(User):
    subscription_number: str                # numéro d’inscription universitaire
    certificate_of_enrollment: Optional[str] = None  # fichier justificatif (PDF, image)
