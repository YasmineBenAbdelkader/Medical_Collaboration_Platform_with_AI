from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.api.deps import get_database

router = APIRouter()

@router.get("/users")
async def list_users(db: AsyncIOMotorDatabase = Depends(get_database)):
    users = await db["users"].find().to_list(100)
    return users
