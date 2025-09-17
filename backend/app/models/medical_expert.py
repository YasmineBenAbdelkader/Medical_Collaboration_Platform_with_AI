from typing import Optional
from pydantic import BaseModel
from .doctor import Doctor


class MedicalExpert(Doctor):
    blog: Optional[str] = None    # lien ou contenu blog
    cv: Optional[str] = None      # chemin fichier PDF CV
