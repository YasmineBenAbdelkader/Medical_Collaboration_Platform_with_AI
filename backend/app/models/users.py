from beanie import Document, PydanticObjectId
from pydantic import BaseModel, EmailStr

class User(Document):
    name: str
    lastName: str
    email: EmailStr
    hashed_password: str
    is_superuser: bool = False

    class Settings:
        name = "users"  # Nom de la collection MongoDB

    def serialize(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "lastName": self.lastName,
            "email": self.email,
            "is_superuser": self.is_superuser,
        }
