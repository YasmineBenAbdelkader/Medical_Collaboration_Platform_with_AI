"""
Ce fichier regroupe toutes les routes (endpoints) liées aux opérations sur les utilisateurs :
- Récupérer un utilisateur par ID (GET)
- Créer un nouvel utilisateur (POST)
- Mettre à jour un utilisateur existant (PUT)

Il importe la collection MongoDB et la fonction de sérialisation depuis models/users.py,
ainsi que les schémas de validation depuis schemas/users.py.

Ce routeur est destiné à être inclus dans l’application FastAPI principale.
"""

from fastapi import APIRouter  # Pour créer un routeur FastAPI (groupement des routes)
from bson import ObjectId       # Pour convertir les string IDs en ObjectId MongoDB
from models.users import users_collection, serialize_user  # Import collection et fonction utilitaire
from schemas.users import User  # Import du modèle Pydantic pour validation des données utilisateur

# Création d'un routeur FastAPI spécifique aux routes utilisateurs
router = APIRouter()
# Route GET pour récupérer tous les utilisateurs
@router.get("/users/")
def get_all_users():
    # Récupérer tous les documents de la collection
    users = users_collection.find()
    # Sérialiser chaque document et les renvoyer sous forme de liste
    return [serialize_user(user) for user in users]

# Route GET pour récupérer un utilisateur par son ID (passé en paramètre d'URL)
@router.get("/users/{user_id}")
def get_user(user_id: str):
    try:
        # Recherche dans la collection MongoDB un utilisateur avec cet _id
        user = users_collection.find_one({"_id": ObjectId(user_id)})
    except Exception:
        # En cas d'erreur (ex : ID invalide), renvoyer un message d'erreur
        return {"error": "Invalid user ID format"}
    if user:
        # Si trouvé, on renvoie l'utilisateur sérialisé (format API)
        return serialize_user(user)
    # Sinon, renvoyer message d'erreur
    return {"error": "User not found"}

# Route POST pour créer un nouvel utilisateur avec les données reçues dans le body
@router.post("/users/")
def create_user(user: User):
    # Insère le nouvel utilisateur dans la collection (après validation par Pydantic)
    result = users_collection.insert_one(user.dict())
    # Récupère l'utilisateur nouvellement inséré par son ID retourné
    new_user = users_collection.find_one({"_id": result.inserted_id})
    # Renvoie l'utilisateur sérialisé
    return serialize_user(new_user)

# Route PUT pour mettre à jour un utilisateur existant par son ID
@router.put("/users/{user_id}")
def update_user(user_id: str, user: User):
    try:
        # Met à jour l'utilisateur dans la collection en remplaçant les champs par ceux reçus
        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},    # Filtre par ID MongoDB
            {"$set": user.dict()}          # Nouveau contenu des champs
        )
    except Exception:
        # En cas d'erreur (ex : ID invalide), renvoyer un message d'erreur
        return {"error": "Invalid user ID format"}
    # Renvoie un message avec le nombre de documents modifiés (0 ou 1)
    return {"updated": result.modified_count}
