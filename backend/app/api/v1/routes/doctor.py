from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.crud.doctor import register_doctor, get_doctor, update_doctor, delete_doctor, get_profile_doctor
from app.schemas.doctor import DoctorCreate, DoctorRead
from app.db.mongo import get_db

router = APIRouter(prefix="/doctors", tags=["Doctors"])

@router.post("/register", response_model=DoctorRead)
async def register(doctor: DoctorCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await register_doctor(db, doctor)

@router.get("/{doctor_id}", response_model=DoctorRead)
async def get_doctor_route(doctor_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await get_doctor(db, doctor_id)

@router.get("/profile/{email}", response_model=DoctorRead)
async def get_profile(email: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await get_profile_doctor(db, email)

@router.put("/{doctor_id}", response_model=DoctorRead)
async def update_doctor_route(doctor_id: str, data: dict, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await update_doctor(db, doctor_id, data)

@router.delete("/{doctor_id}")
async def delete_doctor_route(doctor_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await delete_doctor(db, doctor_id)
