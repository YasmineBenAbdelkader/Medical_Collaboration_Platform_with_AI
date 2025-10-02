from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from typing import Optional

from app.db.mongo import get_db

# Expose la fonction comme dépendance
async def get_database():
    return get_db()

# Configuration de l'authentification
security = HTTPBearer(auto_error=False)

async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: AsyncIOMotorDatabase = Depends(get_db)
) -> dict:
    """
    Récupère l'utilisateur actuel à partir du token d'authentification.
    Pour l'instant, retourne un utilisateur mock pour les tests.
    """
    if not credentials:
        # Pour les tests, retourner un utilisateur mock
        return {
            "id": "507f1f77bcf86cd799439011",  # ObjectId mock
            "email_address": "test@example.com",
            "first_name": "Test",
            "family_name": "User",
            "role": "doctor"
        }
    
    try:
        # Ici vous devriez décoder le JWT token et récupérer l'utilisateur
        # Pour l'instant, on simule avec un utilisateur mock
        token = credentials.credentials
        
        # TODO: Implémenter la vérification JWT réelle
        # decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        # user_id = decoded_token.get("user_id")
        
        # Récupérer l'utilisateur depuis la base de données
        user = await db.users.find_one({"_id": ObjectId("507f1f77bcf86cd799439011")})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Utilisateur non trouvé"
            )
        
        return {
            "id": str(user["_id"]),
            "email_address": user["email_address"],
            "first_name": user["first_name"],
            "family_name": user["family_name"],
            "role": user["role"]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token invalide: {str(e)}"
        )
