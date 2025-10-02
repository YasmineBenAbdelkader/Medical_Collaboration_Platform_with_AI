from pydantic import BaseModel, Field
from typing import Optional
from .base import PyObjectId


class MedicalSpecialty(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    slug: Optional[str] = None
    description: Optional[str] = None
    source: Optional[str] = None  # e.g. "betterdoctor"

    class Config:
        populate_by_name = True
