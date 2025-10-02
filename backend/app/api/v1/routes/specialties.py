from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List

from app.db.mongo import get_db
from app.schemas.medical_specialty import (
    MedicalSpecialtyListResponse,
    MedicalSpecialtyCreate,
)
from app.crud.medical_specialty import upsert_specialty, list_specialties
from app.services.nuccAPI import fetch_nucc_specialties

router = APIRouter(prefix="/specialties", tags=["Specialties"])  # Ajout prefix pour cohérence

@router.get("/", response_model=MedicalSpecialtyListResponse)
async def get_all_specialties(db: AsyncIOMotorDatabase = Depends(get_db)):
    docs = await list_specialties(db)
    return {
        "success": True,
        "message": "Liste des spécialités",
        "data": docs,
    }

@router.post("/import/nucc", response_model=MedicalSpecialtyListResponse)
async def import_from_nucc(
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    print("🚀 Début import NUCC")
    try:
        items = await fetch_nucc_specialties()
        print(f"📦 Items reçus: {len(items)}")
        saved = []
        for i, it in enumerate(items):
            if not it["name"]:
                print(f"❌ Skip item {i}: nom vide")
                continue
            try:
                doc = await upsert_specialty(db, MedicalSpecialtyCreate(**it))
                saved.append(doc)
                if i < 3:
                    print(f"💾 Upsert OK pour {it['name']} (ID: {doc.id})")
            except Exception as upsert_err:
                print(f"❌ Erreur upsert pour {it['name']}: {upsert_err}")
                continue
        print(f"✅ Total saved: {len(saved)}")
        return {
            "success": True,
            "message": f"Import NUCC terminé ({len(saved)} spécialités)",
            "data": saved,
        }
    except Exception as e:
        print(f"💥 Erreur globale: {e}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Erreur import NUCC: {str(e)}",
        )