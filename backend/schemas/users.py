"""
Ce fichier définit les modèles Pydantic (schémas) utilisés pour la validation des données
de l’utilisateur en entrée/sortie de l’API.

Ici, le modèle `User` précise que chaque utilisateur doit avoir un nom, un nom de famille,
et un email, tous obligatoires et de type chaîne de caractères.
"""

from pydantic import BaseModel  # Import du modèle de base Pydantic pour la validation

# Modèle Pydantic qui définit la structure des données utilisateur attendues
class User(BaseModel):
    name: str           # Le champ "name" est une chaîne obligatoire
    lastName: str       # Le champ "lastName" est une chaîne obligatoire
    email: str          # Le champ "email" est une chaîne obligatoire (pas de validation email stricte ici)
