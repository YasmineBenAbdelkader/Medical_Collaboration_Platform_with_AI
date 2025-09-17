from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.crud.student import register_student, get_student, update_student, delete_student, get_profile_student
from app.schemas.student import StudentCreate, StudentRead
from app.db.mongo import get_db

router = APIRouter(prefix="/students", tags=["Students"])

@router.post("/register", response_model=StudentRead)
async def register(student: StudentCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await register_student(db, student)

@router.get("/{student_id}", response_model=StudentRead)
async def get_student_route(student_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await get_student(db, student_id)

@router.get("/profile/{email}", response_model=StudentRead)
async def get_profile(email: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await get_profile_student(db, email)

@router.put("/{student_id}", response_model=StudentRead)
async def update_student_route(student_id: str, data: dict, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await update_student(db, student_id, data)

@router.delete("/{student_id}")
async def delete_student_route(student_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await delete_student(db, student_id)
