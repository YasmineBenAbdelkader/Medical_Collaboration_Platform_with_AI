from fastapi import FastAPI
from app.api.v1.routes import doctor, expert, student
from app.db.mongo import get_db

app = FastAPI(title="Medical Collaboration AI")

@app.on_event("startup")
async def startup_event():
    db = get_db()
    try:
        await db.command("ping")
        print("✅ MongoDB connecté !")
    except Exception as e:
        print(f"❌ Erreur MongoDB : {e}")

app.include_router(doctor.router)
app.include_router(expert.router)
app.include_router(student.router)

@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'application médicale IA"}
