from pydantic import BaseModel, Field
from typing import Optional, List
from ..models.base import PyObjectId


class MedicalSpecialtyBase(BaseModel):
    name: str
    slug: Optional[str] = None
    description: Optional[str] = None
    source: Optional[str] = None


class MedicalSpecialtyCreate(MedicalSpecialtyBase):
    pass


class MedicalSpecialty(MedicalSpecialtyBase):
    id: PyObjectId = Field(alias="_id")

    class Config:
        populate_by_name = True


class MedicalSpecialtyListResponse(BaseModel):
    success: bool
    message: str
    data: List[MedicalSpecialty]

