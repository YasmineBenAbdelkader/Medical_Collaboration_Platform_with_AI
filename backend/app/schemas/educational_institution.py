from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class EducationalInstitutionCreate(BaseModel):
    name: str
    city: str
    country: str

class EducationalInstitutionRead(EducationalInstitutionCreate):
    id: Optional[str] = Field(default=None, alias="_id")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
