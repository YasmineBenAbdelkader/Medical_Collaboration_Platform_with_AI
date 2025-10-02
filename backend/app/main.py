from fastapi import FastAPI
from app.api.v1.routes import doctor, expert, student, post, comments
from app.api.v1.routes import specialties
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
app.include_router(post.router, prefix="/posts", tags=["Posts"])
app.include_router(comments.router, prefix="/comments", tags=["Comments"])
app.include_router(specialties.router, prefix="/specialties", tags=["Specialties"])

@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'application médicale IA"}
