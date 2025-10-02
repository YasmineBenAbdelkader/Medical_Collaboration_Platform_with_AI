from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase  # ← CET IMPORT MANQUANT ! Ajoute-le ici
from bson import ObjectId
from datetime import datetime  # Pour timestamps
from ..schemas.medical_specialty import MedicalSpecialtyCreate, MedicalSpecialty

async def upsert_specialty(db: AsyncIOMotorDatabase, spec: MedicalSpecialtyCreate) -> MedicalSpecialty:
    payload = spec.model_dump()
    if payload.get("slug"):
        query = {"slug": payload["slug"]}
    else:
        query = {"name": payload["name"]}
    
    print(f"🔧 Upsert query: {query}, payload keys: {list(payload.keys())}")  # Log optionnel pour debug
    
    payload["updated_at"] = datetime.utcnow()
    result = await db.medical_specialties.update_one(query, {"$set": payload}, upsert=True)
    print(f"🔧 Résultat upsert: matched={result.matched_count}, modified={result.modified_count}, upserted={result.upserted_id}")  # Log optionnel
    
    doc = await db.medical_specialties.find_one(query)
    if doc:
        return MedicalSpecialty.model_validate(doc)
    raise ValueError("Erreur lors de l'upsert")

async def list_specialties(db: AsyncIOMotorDatabase) -> List[MedicalSpecialty]:  # ← Type maintenant défini
    cursor = db.medical_specialties.find({}).sort("name", 1)
    docs = await cursor.to_list(length=None)
    return [MedicalSpecialty.model_validate(d) for d in docs]