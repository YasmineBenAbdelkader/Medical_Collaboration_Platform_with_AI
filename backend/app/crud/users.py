from fastapi import APIRouter, HTTPException
from app.models.users import User
from app.schemas.users import UserCreate
from app.utils.security import get_hashed_password

router = APIRouter()

@router.get("/users/{user_id}")
async def get_user(user_id: str):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.serialize()

@router.post("/users/")
async def create_user(user_data: UserCreate):
    existing_user = await User.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    user = User(
        name=user_data.name,
        lastName=user_data.lastName,
        email=user_data.email,
        hashed_password=get_hashed_password(user_data.password)
    )
    await user.insert()
    return user.serialize()
