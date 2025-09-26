from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.crud.educational_institution import (
    create_institution,
    get_all_institutions,
    get_institution,
    update_institution,
    delete_institution
)
from app.models.educational_institution import EducationalInstitution
from app.db.mongo import get_db

router = APIRouter(prefix="/educational-institutions", tags=["Educational Institutions"])

@router.post("/", response_model=EducationalInstitution)
async def create_edu_inst(inst: EducationalInstitution, db=Depends(get_db)):
    return await create_institution(db, inst)

@router.get("/", response_model=List[EducationalInstitution])
async def read_all_edu_inst(db=Depends(get_db)):
    return await get_all_institutions(db)

@router.get("/{id}", response_model=EducationalInstitution)
async def read_edu_inst(id: str, db=Depends(get_db)):
    inst = await get_institution(db, id)
    if not inst:
        raise HTTPException(status_code=404, detail="Institution not found")
    return inst

@router.put("/{id}", response_model=EducationalInstitution)
async def update_edu_inst(id: str, inst: EducationalInstitution, db=Depends(get_db)):
    updated = await update_institution(db, id, inst)
    if not updated:
        raise HTTPException(status_code=404, detail="Institution not found")
    return updated

@router.delete("/{id}")
async def delete_edu_inst(id: str, db=Depends(get_db)):
    deleted = await delete_institution(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Institution not found")
    return {"message": "Deleted successfully"}
