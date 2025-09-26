from typing import List
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.medical_specialty import MedicalSpecialty

collection_name = "medical_specialties"

async def create_med_specialty(db: AsyncIOMotorDatabase, specialty: MedicalSpecialty) -> MedicalSpecialty:
    specialty_dict = specialty.dict(by_alias=True, exclude={"id"})
    result = await db[collection_name].insert_one(specialty_dict)
    specialty.id = str(result.inserted_id)
    return specialty

async def get_all_med_specialties(db: AsyncIOMotorDatabase) -> List[MedicalSpecialty]:
    specialties = []
    async for doc in db[collection_name].find():
        doc["_id"] = str(doc["_id"])
        specialties.append(MedicalSpecialty(**doc))
    return specialties

async def get_med_specialty(db: AsyncIOMotorDatabase, id: str) -> MedicalSpecialty | None:
    doc = await db[collection_name].find_one({"_id": ObjectId(id)})
    if doc:
        doc["_id"] = str(doc["_id"])
        return MedicalSpecialty(**doc)
    return None

async def update_med_specialty(db: AsyncIOMotorDatabase, id: str, specialty: MedicalSpecialty) -> MedicalSpecialty | None:
    result = await db[collection_name].update_one(
        {"_id": ObjectId(id)},
        {"$set": specialty.dict(exclude={"id"}, by_alias=True)}
    )
    if result.matched_count == 0:
        return None
    specialty.id = id
    return specialty

async def delete_med_specialty(db: AsyncIOMotorDatabase, id: str) -> bool:
    result = await db[collection_name].delete_one({"_id": ObjectId(id)})
    return result.deleted_count > 0
