from typing import Optional
from .users import User


class Doctor(User):
    rpps_number: str                         # Numéro RPPS (identifiant unique du médecin)
    years_of_experience: Optional[int] = None
    
    # Fichiers
    diploma: Optional[str] = None            # chemin/URL du diplôme scanné
    professional_card: Optional[str] = None  # chemin/URL de la carte professionnelle
