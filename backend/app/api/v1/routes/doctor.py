from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Optional
from bson import ObjectId

from app.db.mongo import get_db
from app.schemas.doctor import DoctorCreate, DoctorRead
from app.utils.files import save_upload_file, validate_file
from app.api.v1.routes.educational_institution import read_all_edu_inst
from app.api.v1.routes.medical_specialty import read_all_specialties
from app.api.v1.routes.professional_institutions import read_all_institutions

router = APIRouter(prefix="/doctors", tags=["Doctors"])
COLLECTION_NAME = "users"

# ---------------------------
# Helper pour convertir ObjectId en str
# ---------------------------
def convert_id(doc: dict) -> dict:
    doc["_id"] = str(doc["_id"])
    return doc

# ---------------------------
# Register Doctor avec fichiers upload
# ---------------------------
@router.post("/register", response_model=DoctorRead)
async def register_doctor_route(
    first_name: str = Form(...),
    family_name: str = Form(...),
    email_address: str = Form(...),
    password: str = Form(...),
    phone_number: Optional[str] = Form(None),
    profile_title: Optional[str] = Form(None),
    diploma: UploadFile = File(...),
    professional_card: Optional[UploadFile] = File(None),
    profile_image: Optional[UploadFile] = File(None),
    educational_institution_id: str = Form(...),
    medical_specialty_id: str = Form(...),
    professional_institution_id: str = Form(...),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    # Validation fichiers
    validate_file(diploma)
    if professional_card:
        validate_file(professional_card)
    if profile_image:
        validate_file(profile_image)

    # Vérification des entités liées
    edu_inst = await db["educational_institutions"].find_one({"_id": ObjectId(educational_institution_id)})
    if not edu_inst:
        raise HTTPException(400, "Educational institution not found")
    med_spec = await db["medical_specialties"].find_one({"_id": ObjectId(medical_specialty_id)})
    if not med_spec:
        raise HTTPException(400, "Medical specialty not found")
    prof_inst = await db["professional_institutions"].find_one({"_id": ObjectId(professional_institution_id)})
    if not prof_inst:
        raise HTTPException(400, "Professional institution not found")

    # Sauvegarde fichiers
    diploma_path, _ = await save_upload_file(diploma, dest_folder="media/doctors/diplomas")
    professional_card_path = None
    if professional_card:
        professional_card_path, _ = await save_upload_file(professional_card, dest_folder="media/doctors/professional_cards")
    profile_image_path = None
    if profile_image:
        profile_image_path, _ = await save_upload_file(profile_image, dest_folder="media/doctors/profile_images")

    # Création du document Mongo
    doctor_doc = {
        "first_name": first_name,
        "family_name": family_name,
        "email_address": email_address,
        "password": password,  # HASHER EN PROD
        "phone_number": phone_number,
        "profile_title": profile_title,
        "diploma": diploma_path,
        "professional_card": professional_card_path,
        "profile_image": profile_image_path,
        "role": "doctor",
        "educational_institution_id": educational_institution_id,
        "medical_specialty_id": medical_specialty_id,
        "professional_institution_id": professional_institution_id
    }

    result = await db[COLLECTION_NAME].insert_one(doctor_doc)
    doctor_doc["_id"] = str(result.inserted_id)
    return doctor_doc

# ---------------------------
# Get Doctor by ID
# ---------------------------
@router.get("/{doctor_id}", response_model=DoctorRead)
async def get_doctor_route(doctor_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    doc = await db[COLLECTION_NAME].find_one({"_id": ObjectId(doctor_id), "role": "doctor"})
    if not doc:
        raise HTTPException(404, "Doctor not found")
    return convert_id(doc)

# ---------------------------
# Get Doctor by email (profile)
# ---------------------------
@router.get("/profile/{email}", response_model=DoctorRead)
async def get_profile_route(email: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    doc = await db[COLLECTION_NAME].find_one({"email_address": email, "role": "doctor"})
    if not doc:
        raise HTTPException(404, "Doctor not found")
    return convert_id(doc)

# ---------------------------
# Update Doctor (texte et fichiers)
# ---------------------------
@router.put("/{doctor_id}", response_model=DoctorRead)
async def update_doctor_route(
    doctor_id: str,
    first_name: Optional[str] = Form(None),
    family_name: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    profile_title: Optional[str] = Form(None),
    diploma: Optional[UploadFile] = File(None),
    professional_card: Optional[UploadFile] = File(None),
    profile_image: Optional[UploadFile] = File(None),
    educational_institution_id: Optional[str] = Form(None),
    medical_specialty_id: Optional[str] = Form(None),
    professional_institution_id: Optional[str] = Form(None),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    doc = await db[COLLECTION_NAME].find_one({"_id": ObjectId(doctor_id), "role": "doctor"})
    if not doc:
        raise HTTPException(404, "Doctor not found")

    update_data = {}
    if first_name:
        update_data["first_name"] = first_name
    if family_name:
        update_data["family_name"] = family_name
    if phone_number:
        update_data["phone_number"] = phone_number
    if profile_title:
        update_data["profile_title"] = profile_title

    # Upload fichiers
    if diploma:
        validate_file(diploma)
        diploma_path, _ = await save_upload_file(diploma, dest_folder="media/doctors/diplomas")
        update_data["diploma"] = diploma_path
    if professional_card:
        validate_file(professional_card)
        professional_card_path, _ = await save_upload_file(professional_card, dest_folder="media/doctors/professional_cards")
        update_data["professional_card"] = professional_card_path
    if profile_image:
        validate_file(profile_image)
        profile_image_path, _ = await save_upload_file(profile_image, dest_folder="media/doctors/profile_images")
        update_data["profile_image"] = profile_image_path

    # Vérification des entités liées si modifiées
    if educational_institution_id:
        edu_inst = await db["educational_institutions"].find_one({"_id": ObjectId(educational_institution_id)})
        if not edu_inst:
            raise HTTPException(400, "Educational institution not found")
        update_data["educational_institution_id"] = educational_institution_id
    if medical_specialty_id:
        med_spec = await db["medical_specialties"].find_one({"_id": ObjectId(medical_specialty_id)})
        if not med_spec:
            raise HTTPException(400, "Medical specialty not found")
        update_data["medical_specialty_id"] = medical_specialty_id
    if professional_institution_id:
        prof_inst = await db["professional_institutions"].find_one({"_id": ObjectId(professional_institution_id)})
        if not prof_inst:
            raise HTTPException(400, "Professional institution not found")
        update_data["professional_institution_id"] = professional_institution_id

    await db[COLLECTION_NAME].update_one({"_id": ObjectId(doctor_id)}, {"$set": update_data})
    updated_doc = await db[COLLECTION_NAME].find_one({"_id": ObjectId(doctor_id)})
    return convert_id(updated_doc)

# ---------------------------
# Delete Doctor
# ---------------------------
@router.delete("/{doctor_id}")
async def delete_doctor_route(doctor_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    result = await db[COLLECTION_NAME].delete_one({"_id": ObjectId(doctor_id), "role": "doctor"})
    if result.deleted_count == 0:
        raise HTTPException(404, "Doctor not found")
    return {"message": "Doctor deleted successfully"}
