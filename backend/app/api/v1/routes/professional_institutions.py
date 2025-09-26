from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.crud.professional_institution import (
    create_prof_inst,
    get_all_prof_inst,
    get_prof_inst,
    update_prof_inst,
    delete_prof_inst
)
from app.models.professional_institution import ProfessionalInstitution
from app.db.mongo import get_db

router = APIRouter(prefix="/professional-institutions", tags=["Professional Institutions"])

# Create
@router.post("/", response_model=ProfessionalInstitution)
async def create_institution(inst: ProfessionalInstitution, db=Depends(get_db)):
    return await create_prof_inst(db, inst)

# Read all
@router.get("/", response_model=List[ProfessionalInstitution])
async def read_all_institutions(db=Depends(get_db)):
    return await get_all_prof_inst(db)

# Read by ID
@router.get("/{id}", response_model=ProfessionalInstitution)
async def read_institution(id: str, db=Depends(get_db)):
    inst = await get_prof_inst(db, id)
    if not inst:
        raise HTTPException(status_code=404, detail="Institution not found")
    return inst

# Update
@router.put("/{id}", response_model=ProfessionalInstitution)
async def update_institution(id: str, inst: ProfessionalInstitution, db=Depends(get_db)):
    updated = await update_prof_inst(db, id, inst)
    if not updated:
        raise HTTPException(status_code=404, detail="Institution not found")
    return updated

# Delete
@router.delete("/{id}")
async def delete_institution(id: str, db=Depends(get_db)):
    deleted = await delete_prof_inst(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Institution not found")
    return {"message": "Deleted successfully"}
