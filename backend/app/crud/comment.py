from typing import List, Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from ..models.comment import Comment
from ..schemas.comment import CommentCreate, CommentUpdate


async def create_comment(db: AsyncIOMotorDatabase, comment: CommentCreate, user_id: str) -> Comment:
    """Créer un nouveau commentaire"""
    comment_data = comment.dict()
    comment_data["user_id"] = ObjectId(user_id)
    comment_data["post_id"] = ObjectId(comment_data["post_id"])
    comment_data["created_at"] = datetime.utcnow()
    comment_data["reply_count"] = 0
    comment_data["is_deleted"] = False
    comment_data["is_edited"] = False
    comment_data["like_count"] = 0
    
    if comment_data.get("parent_comment_id"):
        comment_data["parent_comment_id"] = ObjectId(comment_data["parent_comment_id"])
    
    result = await db.comments.insert_one(comment_data)
    created_comment = await db.comments.find_one({"_id": result.inserted_id})
    return Comment(**created_comment)


async def get_comment(db: AsyncIOMotorDatabase, comment_id: str) -> Optional[Comment]:
    """Récupérer un commentaire par son ID"""
    comment = await db.comments.find_one({"_id": ObjectId(comment_id)})
    if comment:
        return Comment(**comment)
    return None


async def get_comments_by_post(
    db: AsyncIOMotorDatabase, 
    post_id: str, 
    skip: int = 0, 
    limit: int = 20
) -> List[Comment]:
    """Récupérer les commentaires d'un post"""
    cursor = db.comments.find({"post_id": ObjectId(post_id)}).sort("created_at", -1).skip(skip).limit(limit)
    comments = await cursor.to_list(length=limit)
    return [Comment(**comment) for comment in comments]


async def get_comment_replies(
    db: AsyncIOMotorDatabase, 
    parent_comment_id: str, 
    skip: int = 0, 
    limit: int = 10
) -> List[Comment]:
    """Récupérer les réponses à un commentaire"""
    cursor = db.comments.find({"parent_comment_id": ObjectId(parent_comment_id)}).sort("created_at", 1).skip(skip).limit(limit)
    comments = await cursor.to_list(length=limit)
    return [Comment(**comment) for comment in comments]


async def update_comment(db: AsyncIOMotorDatabase, comment_id: str, comment_update: CommentUpdate, user_id: str) -> Optional[Comment]:
    """Mettre à jour un commentaire"""
    # Vérifier que l'utilisateur est l'auteur du commentaire
    existing_comment = await db.comments.find_one({"_id": ObjectId(comment_id)})
    if not existing_comment:
        return None
    
    if existing_comment["user_id"] != ObjectId(user_id):
        raise PermissionError("Vous ne pouvez modifier que vos propres commentaires")
    
    update_data = {k: v for k, v in comment_update.dict().items() if v is not None}
    if update_data:
        update_data["is_edited"] = True
        update_data["updated_at"] = datetime.utcnow()
        
        await db.comments.update_one(
            {"_id": ObjectId(comment_id)},
            {"$set": update_data}
        )
    
    updated_comment = await db.comments.find_one({"_id": ObjectId(comment_id)})
    return Comment(**updated_comment) if updated_comment else None


async def delete_comment(db: AsyncIOMotorDatabase, comment_id: str, user_id: str) -> bool:
    """Supprimer un commentaire"""
    # Vérifier que l'utilisateur est l'auteur du commentaire
    existing_comment = await db.comments.find_one({"_id": ObjectId(comment_id)})
    if not existing_comment:
        return False
    
    if existing_comment["user_id"] != ObjectId(user_id):
        raise PermissionError("Vous ne pouvez supprimer que vos propres commentaires")
    
    # Marquer comme supprimé au lieu de supprimer complètement
    await db.comments.update_one(
        {"_id": ObjectId(comment_id)},
        {"$set": {"is_deleted": True, "updated_at": datetime.utcnow()}}
    )
    
    return True


async def increment_comment_like_count(db: AsyncIOMotorDatabase, comment_id: str) -> bool:
    """Incrémenter le compteur de likes d'un commentaire"""
    result = await db.comments.update_one(
        {"_id": ObjectId(comment_id)},
        {"$inc": {"like_count": 1}}
    )
    return result.modified_count > 0


async def decrement_comment_like_count(db: AsyncIOMotorDatabase, comment_id: str) -> bool:
    """Décrémenter le compteur de likes d'un commentaire"""
    result = await db.comments.update_one(
        {"_id": ObjectId(comment_id)},
        {"$inc": {"like_count": -1}}
    )
    return result.modified_count > 0


async def increment_comment_reply_count(db: AsyncIOMotorDatabase, parent_comment_id: str) -> bool:
    """Incrémenter le compteur de réponses d'un commentaire parent"""
    result = await db.comments.update_one(
        {"_id": ObjectId(parent_comment_id)},
        {"$inc": {"reply_count": 1}}
    )
    return result.modified_count > 0


async def decrement_comment_reply_count(db: AsyncIOMotorDatabase, parent_comment_id: str) -> bool:
    """Décrémenter le compteur de réponses d'un commentaire parent"""
    result = await db.comments.update_one(
        {"_id": ObjectId(parent_comment_id)},
        {"$inc": {"reply_count": -1}}
    )
    return result.modified_count > 0


async def get_comment_stats(db: AsyncIOMotorDatabase) -> dict:
    """Récupérer les statistiques des commentaires"""
    total_comments = await db.comments.count_documents({"is_deleted": False})
    deleted_comments = await db.comments.count_documents({"is_deleted": True})
    edited_comments = await db.comments.count_documents({"is_edited": True})
    
    # Commentaires par mois
    monthly_pipeline = [
        {"$match": {"is_deleted": False}},
        {
            "$group": {
                "_id": {
                    "year": {"$year": "$created_at"},
                    "month": {"$month": "$created_at"}
                },
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id.year": -1, "_id.month": -1}}
    ]
    monthly_stats = await db.comments.aggregate(monthly_pipeline).to_list(length=None)
    comments_by_month = {
        f"{stat['_id']['year']}-{stat['_id']['month']:02d}": stat["count"] 
        for stat in monthly_stats
    }
    
    return {
        "total_comments": total_comments,
        "deleted_comments": deleted_comments,
        "edited_comments": edited_comments,
        "comments_by_month": comments_by_month
    }
