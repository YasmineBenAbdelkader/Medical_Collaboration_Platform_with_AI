from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
from app.db.mongo import get_db
from app.schemas.medical_specialty import MedicalSpecialtyCreate, MedicalSpecialty  # Utilise Create pour input
from app.crud.medical_specialty import (
    create_med_specialty,
    get_all_med_specialties,
    get_med_specialty,
    update_med_specialty,
    delete_med_specialty
)

router = APIRouter(prefix="/medical-specialties", tags=["Medical Specialties"])

# Create
@router.post("/", response_model=MedicalSpecialty)
async def create_specialty(
    specialty: MedicalSpecialtyCreate,  # Fix : Create pour validation input
    db: AsyncIOMotorDatabase = Depends(get_db)  # Fix : type hint
):
    return await create_med_specialty(db, specialty)

# Read all
@router.get("/", response_model=List[MedicalSpecialty])
async def read_all_specialties(
    db: AsyncIOMotorDatabase = Depends(get_db)  # Fix : type hint
):
    return await get_all_med_specialties(db)

# Read by ID
@router.get("/{id}", response_model=MedicalSpecialty)
async def read_specialty(
    id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)  # Fix : type hint
):
    specialty = await get_med_specialty(db, id)
    if not specialty:
        raise HTTPException(status_code=404, detail="Specialty not found")
    return specialty

# Update
@router.put("/{id}", response_model=MedicalSpecialty)
async def update_specialty(
    id: str,
    specialty: MedicalSpecialtyCreate,  # Fix : Create pour input
    db: AsyncIOMotorDatabase = Depends(get_db)  # Fix : type hint
):
    updated = await update_med_specialty(db, id, specialty)
    if not updated:
        raise HTTPException(status_code=404, detail="Specialty not found")
    return updated

# Delete
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_specialty(
    id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)  # Fix : type hint
):
    deleted = await delete_med_specialty(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Specialty not found")
    return {"message": "Deleted successfully"}  # Ou return None pour 204