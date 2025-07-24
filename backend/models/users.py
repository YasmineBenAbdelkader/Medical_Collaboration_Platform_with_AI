"""
Ce fichier contient :
- La connexion à la base de données MongoDB via pymongo.
- La sélection de la collection 'users'.
- Une fonction utilitaire `serialize_user` pour convertir un document MongoDB en dictionnaire Python
  adapté à la réponse JSON de l'API (notamment la conversion de l’ObjectId en string).
"""

from pymongo import MongoClient  # Client MongoDB pour se connecter à la base de données
from bson import ObjectId        # Pour manipuler les IDs MongoDB (de type ObjectId)
from config.config import settings  # Import des paramètres de configuration (host, port, db name)

# Connexion au serveur MongoDB avec l'hôte et le port définis dans la config
client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)

# Sélection de la base de données MongoDB à utiliser
db = client[settings.MONGO_DB]

# Sélection de la collection 'users' dans la base de données
users_collection = db["users"]

# Fonction utilitaire pour convertir un document MongoDB en dictionnaire python simple
# en transformant l'ObjectId en string et en gardant uniquement les champs utiles
def serialize_user(user):
    return {
        "id": str(user["_id"]),       # Conversion de l'ObjectId en string pour l'API
        "name": user["name"],         # Nom de l'utilisateur
        "lastName": user["lastName"], # Nom de famille
        "email": user["email"]        # Email
    }
