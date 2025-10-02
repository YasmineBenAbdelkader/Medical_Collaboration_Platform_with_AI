from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime
from app.schemas.medical_specialty import MedicalSpecialtyCreate, MedicalSpecialty

async def create_med_specialty(db: AsyncIOMotorDatabase, spec: MedicalSpecialtyCreate) -> MedicalSpecialty:
    """Crée une nouvelle spécialité médicale."""
    payload = spec.model_dump()
    now = datetime.utcnow()
    payload.update({
        "created_at": now,
        "updated_at": now,
    })
    result = await db.medical_specialties.insert_one(payload)
    doc = await db.medical_specialties.find_one({"_id": result.inserted_id})
    if doc:
        doc["_id"] = str(doc["_id"])
        return MedicalSpecialty.model_validate(doc)
    raise ValueError("Erreur lors de la création")

async def get_med_specialty(db: AsyncIOMotorDatabase, id: str) -> Optional[MedicalSpecialty]:
    """Récupère une spécialité par ID."""
    doc = await db.medical_specialties.find_one({"_id": ObjectId(id)})
    if doc:
        doc["_id"] = str(doc["_id"])
        return MedicalSpecialty.model_validate(doc)
    return None

async def get_all_med_specialties(db: AsyncIOMotorDatabase) -> List[MedicalSpecialty]:
    """Récupère TOUTES les spécialités (sans pagination)."""
    cursor = db.medical_specialties.find({}).sort("name", 1)
    docs = await cursor.to_list(length=None)
    for d in docs:
        d["_id"] = str(d["_id"])
    return [MedicalSpecialty.model_validate(d) for d in docs]

async def list_specialties(db: AsyncIOMotorDatabase, skip: int = 0, limit: int = 100) -> List[MedicalSpecialty]:
    """Liste les spécialités avec pagination."""
    cursor = db.medical_specialties.find({}).sort("name", 1).skip(skip).limit(limit)
    docs = await cursor.to_list(length=None)
    for d in docs:
        d["_id"] = str(d["_id"])
    return [MedicalSpecialty.model_validate(d) for d in docs]

async def update_med_specialty(db: AsyncIOMotorDatabase, id: str, spec_in: MedicalSpecialtyCreate) -> Optional[MedicalSpecialty]:
    """Met à jour une spécialité par ID."""
    payload = spec_in.model_dump()
    payload["updated_at"] = datetime.utcnow()
    result = await db.medical_specialties.update_one(
        {"_id": ObjectId(id)},
        {"$set": payload}
    )
    if result.modified_count:
        doc = await db.medical_specialties.find_one({"_id": ObjectId(id)})
        if doc:
            doc["_id"] = str(doc["_id"])
            return MedicalSpecialty.model_validate(doc)
    return None

async def delete_med_specialty(db: AsyncIOMotorDatabase, id: str) -> bool:
    """Supprime une spécialité par ID."""
    result = await db.medical_specialties.delete_one({"_id": ObjectId(id)})
    return result.deleted_count > 0

async def upsert_specialty(db: AsyncIOMotorDatabase, spec: MedicalSpecialtyCreate) -> MedicalSpecialty:
    """Upsert (create or update) une spécialité par slug ou name."""
    payload = spec.model_dump()
    if payload.get("slug"):
        query = {"slug": payload["slug"]}
    else:
        query = {"name": payload["name"]}
    
    now = datetime.utcnow()
    payload["updated_at"] = now
    if "created_at" not in payload:
        payload["created_at"] = now
    
    await db.medical_specialties.update_one(query, {"$set": payload}, upsert=True)
    doc = await db.medical_specialties.find_one(query)
    if doc:
        doc["_id"] = str(doc["_id"])
        return MedicalSpecialty.model_validate(doc)
    raise ValueError("Erreur lors de l'upsert")