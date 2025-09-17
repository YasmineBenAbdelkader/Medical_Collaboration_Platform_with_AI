from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

# Connexion à MongoDB
client = AsyncIOMotorClient(
    host=settings.MONGO_HOST,
    port=settings.MONGO_PORT,
    username=settings.MONGO_USER,
    password=settings.MONGO_PASSWORD,
)

# Sélection de la base de données
db = client[settings.MONGO_DB]

# Fonction pour récupérer la DB dans les routes
def get_db():
    return db
