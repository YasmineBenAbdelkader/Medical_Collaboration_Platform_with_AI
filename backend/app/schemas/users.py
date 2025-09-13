from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    lastName: str
    email: EmailStr
    password: str
