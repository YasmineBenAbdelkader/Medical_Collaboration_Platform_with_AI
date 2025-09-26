from typing import List
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.professional_institution import ProfessionalInstitution

collection_name = "professional_institutions"

async def create_prof_inst(db: AsyncIOMotorDatabase, inst: ProfessionalInstitution) -> ProfessionalInstitution:
    inst_dict = inst.dict(by_alias=True, exclude={"id"})
    result = await db[collection_name].insert_one(inst_dict)
    inst.id = str(result.inserted_id)
    return inst

async def get_all_prof_inst(db: AsyncIOMotorDatabase) -> List[ProfessionalInstitution]:
    institutions = []
    async for doc in db[collection_name].find():
        doc["_id"] = str(doc["_id"])
        institutions.append(ProfessionalInstitution(**doc))
    return institutions

async def get_prof_inst(db: AsyncIOMotorDatabase, id: str) -> ProfessionalInstitution | None:
    doc = await db[collection_name].find_one({"_id": ObjectId(id)})
    if doc:
        doc["_id"] = str(doc["_id"])
        return ProfessionalInstitution(**doc)
    return None

async def update_prof_inst(db: AsyncIOMotorDatabase, id: str, inst: ProfessionalInstitution) -> ProfessionalInstitution | None:
    result = await db[collection_name].update_one(
        {"_id": ObjectId(id)},
        {"$set": inst.dict(exclude={"id"}, by_alias=True)}
    )
    if result.matched_count == 0:
        return None
    inst.id = id
    return inst

async def delete_prof_inst(db: AsyncIOMotorDatabase, id: str) -> bool:
    result = await db[collection_name].delete_one({"_id": ObjectId(id)})
    return result.deleted_count > 0
