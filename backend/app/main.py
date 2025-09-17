from fastapi import FastAPI
from app.db.mongo import db

app = FastAPI(title="Medical Collaboration AI")

@app.on_event("startup")
async def startup_event():
    # Vérifie la connexion Mongo
    await db.command("ping")
    print("✅ MongoDB connecté !")

@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'application médicale IA"}
