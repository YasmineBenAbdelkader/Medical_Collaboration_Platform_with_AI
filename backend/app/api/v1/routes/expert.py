from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.crud.expert import register_expert, get_expert, update_expert, delete_expert, get_profile_expert
from app.schemas.expert import MedicalExpertCreate, MedicalExpertRead
from app.db.mongo import get_db

router = APIRouter(prefix="/experts", tags=["Experts"])

@router.post("/register", response_model=MedicalExpertRead)
async def register(expert: MedicalExpertCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await register_expert(db, expert)

@router.get("/{expert_id}", response_model=MedicalExpertRead)
async def get_expert_route(expert_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await get_expert(db, expert_id)

@router.get("/profile/{email}", response_model=MedicalExpertRead)
async def get_profile(email: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await get_profile_expert(db, email)

@router.put("/{expert_id}", response_model=MedicalExpertRead)
async def update_expert_route(expert_id: str, data: dict, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await update_expert(db, expert_id, data)

@router.delete("/{expert_id}")
async def delete_expert_route(expert_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await delete_expert(db, expert_id)
