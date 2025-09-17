from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from fastapi import HTTPException
from app.schemas.student import StudentCreate, StudentRead

COLLECTION_NAME = "users"

async def register_student(db: AsyncIOMotorDatabase, student: StudentCreate) -> StudentRead:
    student_dict = student.dict()
    student_dict['role'] = 'student'
    result = await db[COLLECTION_NAME].insert_one(student_dict)
    student_dict["_id"] = result.inserted_id
    return StudentRead(**student_dict)

async def get_student(db: AsyncIOMotorDatabase, student_id: str) -> StudentRead:
    doc = await db[COLLECTION_NAME].find_one({"_id": ObjectId(student_id), "role": "student"})
    if not doc:
        raise HTTPException(404, "Student not found")
    return StudentRead(**doc)

async def update_student(db: AsyncIOMotorDatabase, student_id: str, data: dict) -> StudentRead:
    await db[COLLECTION_NAME].update_one({"_id": ObjectId(student_id), "role": "student"}, {"$set": data})
    doc = await db[COLLECTION_NAME].find_one({"_id": ObjectId(student_id)})
    return StudentRead(**doc)

async def delete_student(db: AsyncIOMotorDatabase, student_id: str):
    result = await db[COLLECTION_NAME].delete_one({"_id": ObjectId(student_id), "role": "student"})
    if result.deleted_count == 0:
        raise HTTPException(404, "Student not found")
    return {"message": "Student deleted successfully"}

async def get_profile_student(db: AsyncIOMotorDatabase, email: str) -> StudentRead:
    doc = await db[COLLECTION_NAME].find_one({"email_address": email, "role": "student"})
    if not doc:
        raise HTTPException(404, "Student not found")
    return StudentRead(**doc)
