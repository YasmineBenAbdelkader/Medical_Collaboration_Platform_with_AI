from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from .base import PyObjectId

class MedicalSpecialty(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    slug: Optional[str] = None
    description: Optional[str] = None
    source: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(  # Fix v2
        populate_by_name=True,
        from_attributes=True,
        validate_by_name=True,  # Fix warning
    )