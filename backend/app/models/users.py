from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId

# --- Utilitaire pour ObjectId ---
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# --- Schéma Adresse ---
class Address(BaseModel):
    country: str
    city: str


# --- Schéma User ---
class User(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")

    first_name: str
    family_name: str
    phone_number: Optional[str] = None

    profile_image: Optional[str] = None   # URL ou chemin
    banner_image: Optional[str] = None    # URL ou chemin

    address: Optional[Address] = None     # Adresse structurée

    profile_title: Optional[str] = None

    # Références vers d'autres collections
    educational_institution_id: Optional[PyObjectId] = None
    professional_institution_id: Optional[PyObjectId] = None
    medical_specialty_id: Optional[PyObjectId] = None

    email_address: EmailStr
    password: str  # ⚠️ stocker hashé

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
