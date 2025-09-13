from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from contextlib import asynccontextmanager

from app.config.config import settings
from app.models.users import User
from app.routers import users
from app.utils.security import get_hashed_password

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connexion asynchrone à MongoDB
    app.state.client = AsyncIOMotorClient(
        settings.MONGO_HOST,
        settings.MONGO_PORT,
        username=settings.MONGO_USER,
        password=settings.MONGO_PASSWORD
    )

    # Initialisation de Beanie avec le modèle User
    await init_beanie(
        database=app.state.client[settings.MONGO_DB],
        document_models=[User]
    )

    # Création du super utilisateur si inexistant
    user = await User.find_one({"email": settings.FIRST_SUPERUSER})
    if not user:
        user = User(
            name="Super",
            lastName="Admin",
            email=settings.FIRST_SUPERUSER,
            hashed_password=get_hashed_password(settings.FIRST_SUPERUSER_PASSWORD),
            is_superuser=True
        )
        await user.insert()
        print(f"✅ Superuser {settings.FIRST_SUPERUSER} créé")

    print(f"✅ Connected to MongoDB database: {settings.MONGO_DB}")
    yield  # point où l'app est opérationnelle

# Création de l'application FastAPI avec lifespan
app = FastAPI(lifespan=lifespan)

# CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(users.router)

@app.get("/")
async def read_root():
    return {"message": "API is running!"}
