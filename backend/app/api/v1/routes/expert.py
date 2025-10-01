from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.crud.expert import register_expert, get_expert, update_expert, delete_expert, get_profile_expert
from app.schemas.expert import MedicalExpertCreate, MedicalExpertRead
from app.db.mongo import get_db
from typing import Optional
from app.utils.files import save_upload_file, validate_file

router = APIRouter(prefix="/experts", tags=["Experts"])

@router.post("/register", response_model=MedicalExpertRead)
async def register(
    first_name: str = Form(...),
    family_name: str = Form(...),
    email_address: str = Form(...),
    password: str = Form(...),
    phone_number: Optional[str] = Form(None),
    profile_title: Optional[str] = Form(None),
    blog: Optional[str] = Form(None),
    cv: Optional[UploadFile] = File(None),
    professional_card: Optional[UploadFile] = File(None),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    # Validation fichiers
    cv_path = None
    professional_card_path = None
    if cv:
        validate_file(cv)
        cv_path, _ = await save_upload_file(cv, dest_folder="media/experts/cvs")
    if professional_card:
        validate_file(professional_card)
        professional_card_path, _ = await save_upload_file(professional_card, dest_folder="media/experts/professional_cards")

    expert_doc = {
        "first_name": first_name,
        "family_name": family_name,
        "email_address": email_address,
        "password": password,  # À hasher en prod
        "phone_number": phone_number,
        "profile_title": profile_title,
        "blog": blog,
        "cv": cv_path,
        "professional_card": professional_card_path,
        "role": "expert"
    }
    result = await db["users"].insert_one(expert_doc)
    expert_doc["_id"] = str(result.inserted_id)
    return expert_doc

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
