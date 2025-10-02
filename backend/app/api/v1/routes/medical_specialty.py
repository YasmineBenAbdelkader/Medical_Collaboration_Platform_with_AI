from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.crud.medical_specialty import (
    create_med_specialty,
    get_all_med_specialties,
    get_med_specialty,
    update_med_specialty,
    delete_med_specialty
)
from app.models.medical_specialty import MedicalSpecialty
from app.db.mongo import get_db

router = APIRouter(prefix="/medical-specialties", tags=["Medical Specialties"])

# Create
@router.post("/", response_model=MedicalSpecialty)
async def create_specialty(specialty: MedicalSpecialty, db=Depends(get_db)):
    return await create_med_specialty(db, specialty)

# Read all
@router.get("/", response_model=List[MedicalSpecialty])
async def read_all_specialties(db=Depends(get_db)):
    return await get_all_med_specialties(db)

# Read by ID
@router.get("/{id}", response_model=MedicalSpecialty)
async def read_specialty(id: str, db=Depends(get_db)):
    specialty = await get_med_specialty(db, id)
    if not specialty:
        raise HTTPException(status_code=404, detail="Specialty not found")
    return specialty

# Update
@router.put("/{id}", response_model=MedicalSpecialty)
async def update_specialty(id: str, specialty: MedicalSpecialty, db=Depends(get_db)):
    updated = await update_med_specialty(db, id, specialty)
    if not updated:
        raise HTTPException(status_code=404, detail="Specialty not found")
    return updated

# Delete
@router.delete("/{id}")
async def delete_specialty(id: str, db=Depends(get_db)):
    deleted = await delete_med_specialty(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Specialty not found")
    return {"message": "Deleted successfully"}
