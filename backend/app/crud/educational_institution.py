from typing import List
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.educational_institution import EducationalInstitution

collection_name = "educational_institutions"

async def create_institution(db: AsyncIOMotorDatabase, inst: EducationalInstitution) -> EducationalInstitution:
    inst_dict = inst.dict(by_alias=True, exclude={"id"})
    result = await db[collection_name].insert_one(inst_dict)
    inst.id = str(result.inserted_id)
    return inst

async def get_all_institutions(db: AsyncIOMotorDatabase) -> List[EducationalInstitution]:
    institutions = []
    async for doc in db[collection_name].find():
        doc["_id"] = str(doc["_id"])
        institutions.append(EducationalInstitution(**doc))
    return institutions

async def get_institution(db: AsyncIOMotorDatabase, id: str) -> EducationalInstitution | None:
    doc = await db[collection_name].find_one({"_id": ObjectId(id)})
    if doc:
        doc["_id"] = str(doc["_id"])
        return EducationalInstitution(**doc)
    return None

async def update_institution(db: AsyncIOMotorDatabase, id: str, inst: EducationalInstitution) -> EducationalInstitution | None:
    update_result = await db[collection_name].update_one(
        {"_id": ObjectId(id)},
        {"$set": inst.dict(exclude={"id"}, by_alias=True)}
    )
    if update_result.matched_count == 0:
        return None
    inst.id = id
    return inst

async def delete_institution(db: AsyncIOMotorDatabase, id: str) -> bool:
    delete_result = await db[collection_name].delete_one({"_id": ObjectId(id)})
    return delete_result.deleted_count > 0
