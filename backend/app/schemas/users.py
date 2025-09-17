from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    first_name: str
    family_name: str
    email: EmailStr
    password: str
    phone_number: Optional[str] = None

class UserOut(BaseModel):
    id: str
    first_name: str
    family_name: str
    email: EmailStr
    phone_number: Optional[str]

    class Config:
        orm_mode = True
