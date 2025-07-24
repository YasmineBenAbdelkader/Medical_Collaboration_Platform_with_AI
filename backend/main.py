from fastapi import FastAPI                    # Import de FastAPI pour créer l'application
from fastapi.middleware.cors import CORSMiddleware  # Middleware pour gérer le CORS (Cross-Origin Resource Sharing)
from routers import users                      # Import du routeur users défini dans routers/users.py

app = FastAPI()                               # Création d'une instance de l'application FastAPI

#pour reactTS
origins = [
    "http://localhost:3000",
]

# Ajout du middleware CORS à l'application FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Origines autorisées à faire des requêtes cross-origin
    allow_credentials=True,      # Autorise l'envoi des cookies et autres credentials dans la requête
    allow_methods=["*"],         # Autorise toutes les méthodes HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],         # Autorise tous les headers HTTP dans les requêtes
)

# Route racine pour tester que l'API fonctionne
@app.get("/")
def read_root():
    return {"message": "API is running!"}

# Inclusion du routeur users dans l'application principale FastAPI
app.include_router(users.router)
