from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from fastapi import HTTPException
from app.schemas.doctor import DoctorCreate, DoctorRead

COLLECTION_NAME = "users"

async def register_doctor(db: AsyncIOMotorDatabase, doctor: DoctorCreate) -> DoctorRead:
    doctor_dict = doctor.dict()
    doctor_dict['role'] = 'doctor'
    result = await db[COLLECTION_NAME].insert_one(doctor_dict)
    doctor_dict["_id"] = result.inserted_id
    return DoctorRead(**doctor_dict)

async def get_doctor(db: AsyncIOMotorDatabase, doctor_id: str) -> DoctorRead:
    doc = await db[COLLECTION_NAME].find_one({"_id": ObjectId(doctor_id), "role": "doctor"})
    if not doc:
        raise HTTPException(404, "Doctor not found")
    return DoctorRead(**doc)

async def update_doctor(db: AsyncIOMotorDatabase, doctor_id: str, data: dict) -> DoctorRead:
    await db[COLLECTION_NAME].update_one({"_id": ObjectId(doctor_id), "role": "doctor"}, {"$set": data})
    doc = await db[COLLECTION_NAME].find_one({"_id": ObjectId(doctor_id)})
    return DoctorRead(**doc)

async def delete_doctor(db: AsyncIOMotorDatabase, doctor_id: str):
    result = await db[COLLECTION_NAME].delete_one({"_id": ObjectId(doctor_id), "role": "doctor"})
    if result.deleted_count == 0:
        raise HTTPException(404, "Doctor not found")
    return {"message": "Doctor deleted successfully"}

async def get_profile_doctor(db: AsyncIOMotorDatabase, email: str) -> DoctorRead:
    doc = await db[COLLECTION_NAME].find_one({"email_address": email, "role": "doctor"})
    if not doc:
        raise HTTPException(404, "Doctor not found")
    return DoctorRead(**doc)
