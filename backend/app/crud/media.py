from typing import List, Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from ..models.Media import Media
from ..schemas.media import MediaCreate, MediaUpdate


async def create_media(db: AsyncIOMotorDatabase, media: MediaCreate) -> Media:
    """Créer un nouveau média"""
    media_data = media.dict()
    media_data["uploaded_at"] = datetime.utcnow()
    media_data["is_processed"] = False
    media_data["is_public"] = True
    media_data["virus_scan_status"] = "pending"
    
    result = await db.media.insert_one(media_data)
    created_media = await db.media.find_one({"_id": result.inserted_id})
    return Media(**created_media)


async def get_media(db: AsyncIOMotorDatabase, media_id: str) -> Optional[Media]:
    """Récupérer un média par son ID"""
    media = await db.media.find_one({"_id": ObjectId(media_id)})
    if media:
        return Media(**media)
    return None


async def get_media_by_post(db: AsyncIOMotorDatabase, post_id: str) -> List[Media]:
    """Récupérer tous les médias d'un post"""
    cursor = db.media.find({"post_id": ObjectId(post_id)})
    media_list = await cursor.to_list(length=None)
    return [Media(**media) for media in media_list]


async def get_media_by_user(db: AsyncIOMotorDatabase, user_id: str, skip: int = 0, limit: int = 10) -> List[Media]:
    """Récupérer les médias d'un utilisateur"""
    cursor = db.media.find({"user_id": ObjectId(user_id)}).skip(skip).limit(limit)
    media_list = await cursor.to_list(length=limit)
    return [Media(**media) for media in media_list]


async def update_media(db: AsyncIOMotorDatabase, media_id: str, media_update: MediaUpdate, user_id: str) -> Optional[Media]:
    """Mettre à jour un média"""
    # Vérifier que l'utilisateur est le propriétaire du média
    existing_media = await db.media.find_one({"_id": ObjectId(media_id)})
    if not existing_media:
        return None
    
    if existing_media["user_id"] != ObjectId(user_id):
        raise PermissionError("Vous ne pouvez modifier que vos propres médias")
    
    update_data = {k: v for k, v in media_update.dict().items() if v is not None}
    
    if update_data:
        await db.media.update_one(
            {"_id": ObjectId(media_id)},
            {"$set": update_data}
        )
    
    updated_media = await db.media.find_one({"_id": ObjectId(media_id)})
    return Media(**updated_media) if updated_media else None


async def delete_media(db: AsyncIOMotorDatabase, media_id: str, user_id: str) -> bool:
    """Supprimer un média"""
    # Vérifier que l'utilisateur est le propriétaire du média
    existing_media = await db.media.find_one({"_id": ObjectId(media_id)})
    if not existing_media:
        return False
    
    if existing_media["user_id"] != ObjectId(user_id):
        raise PermissionError("Vous ne pouvez supprimer que vos propres médias")
    
    result = await db.media.delete_one({"_id": ObjectId(media_id)})
    return result.deleted_count > 0


async def delete_media_by_post(db: AsyncIOMotorDatabase, post_id: str) -> int:
    """Supprimer tous les médias d'un post"""
    result = await db.media.delete_many({"post_id": ObjectId(post_id)})
    return result.deleted_count


async def update_virus_scan_status(db: AsyncIOMotorDatabase, media_id: str, status: str) -> bool:
    """Mettre à jour le statut du scan antivirus"""
    allowed_statuses = ['pending', 'clean', 'infected']
    if status not in allowed_statuses:
        raise ValueError(f"Status must be one of: {', '.join(allowed_statuses)}")
    
    result = await db.media.update_one(
        {"_id": ObjectId(media_id)},
        {"$set": {"virus_scan_status": status}}
    )
    return result.modified_count > 0


async def mark_as_processed(db: AsyncIOMotorDatabase, media_id: str) -> bool:
    """Marquer un média comme traité"""
    result = await db.media.update_one(
        {"_id": ObjectId(media_id)},
        {"$set": {"is_processed": True}}
    )
    return result.modified_count > 0


async def get_media_stats(db: AsyncIOMotorDatabase) -> dict:
    """Récupérer les statistiques des médias"""
    total_media = await db.media.count_documents({})
    processed_media = await db.media.count_documents({"is_processed": True})
    pending_scan = await db.media.count_documents({"virus_scan_status": "pending"})
    clean_media = await db.media.count_documents({"virus_scan_status": "clean"})
    infected_media = await db.media.count_documents({"virus_scan_status": "infected"})
    
    # Médias par type
    type_pipeline = [
        {"$group": {"_id": "$type", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    type_stats = await db.media.aggregate(type_pipeline).to_list(length=None)
    media_by_type = {stat["_id"]: stat["count"] for stat in type_stats}
    
    return {
        "total_media": total_media,
        "processed_media": processed_media,
        "pending_scan": pending_scan,
        "clean_media": clean_media,
        "infected_media": infected_media,
        "media_by_type": media_by_type
    }
