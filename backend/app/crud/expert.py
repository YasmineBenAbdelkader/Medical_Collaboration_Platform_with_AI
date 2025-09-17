from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from fastapi import HTTPException
from app.schemas.expert import MedicalExpertCreate, MedicalExpertRead

COLLECTION_NAME = "users"

async def register_expert(db: AsyncIOMotorDatabase, expert: MedicalExpertCreate) -> MedicalExpertRead:
    expert_dict = expert.dict()
    expert_dict['role'] = 'expert'
    result = await db[COLLECTION_NAME].insert_one(expert_dict)
    expert_dict["_id"] = result.inserted_id
    return MedicalExpertRead(**expert_dict)

async def get_expert(db: AsyncIOMotorDatabase, expert_id: str) -> MedicalExpertRead:
    doc = await db[COLLECTION_NAME].find_one({"_id": ObjectId(expert_id), "role": "expert"})
    if not doc:
        raise HTTPException(404, "Expert not found")
    return MedicalExpertRead(**doc)

async def update_expert(db: AsyncIOMotorDatabase, expert_id: str, data: dict) -> MedicalExpertRead:
    await db[COLLECTION_NAME].update_one({"_id": ObjectId(expert_id), "role": "expert"}, {"$set": data})
    doc = await db[COLLECTION_NAME].find_one({"_id": ObjectId(expert_id)})
    return MedicalExpertRead(**doc)

async def delete_expert(db: AsyncIOMotorDatabase, expert_id: str):
    result = await db[COLLECTION_NAME].delete_one({"_id": ObjectId(expert_id), "role": "expert"})
    if result.deleted_count == 0:
        raise HTTPException(404, "Expert not found")
    return {"message": "Expert deleted successfully"}

async def get_profile_expert(db: AsyncIOMotorDatabase, email: str) -> MedicalExpertRead:
    doc = await db[COLLECTION_NAME].find_one({"email_address": email, "role": "expert"})
    if not doc:
        raise HTTPException(404, "Expert not found")
    return MedicalExpertRead(**doc)
