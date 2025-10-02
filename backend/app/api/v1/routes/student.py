from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.crud.student import register_student, get_student, update_student, delete_student, get_profile_student
from app.schemas.student import StudentCreate, StudentRead
from app.db.mongo import get_db
from typing import Optional
from app.utils.files import save_upload_file, validate_file

router = APIRouter(prefix="/students", tags=["Students"])

@router.post("/register", response_model=StudentRead)
async def register(
    first_name: str = Form(...),
    family_name: str = Form(...),
    email_address: str = Form(...),
    password: str = Form(...),
    phone_number: Optional[str] = Form(None),
    subscription_number: str = Form(...),
    certificate_of_enrollment: Optional[UploadFile] = File(None),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    certificate_path = None
    if certificate_of_enrollment:
        validate_file(certificate_of_enrollment)
        certificate_path, _ = await save_upload_file(certificate_of_enrollment, dest_folder="media/students/certificates")

    student_doc = {
        "first_name": first_name,
        "family_name": family_name,
        "email_address": email_address,
        "password": password,  # À hasher en prod
        "phone_number": phone_number,
        "subscription_number": subscription_number,
        "certificate_of_enrollment": certificate_path,
        "role": "student"
    }
    result = await db["users"].insert_one(student_doc)
    student_doc["_id"] = str(result.inserted_id)
    return student_doc

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
