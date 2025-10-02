from typing import List, Optional, Dict, Any
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from ..models.Post import Post
from ..models.Media import Media
from ..schemas.post import PostCreate, PostUpdate
from ..schemas.media import MediaCreate


async def create_post(db: AsyncIOMotorDatabase, post: PostCreate, author_id: str) -> Post:
    """Créer un nouveau post"""
    post_data = post.dict()
    post_data["author_id"] = ObjectId(author_id)
    post_data["created_at"] = datetime.utcnow()
    post_data["comment_count"] = 0
    post_data["like_count"] = 0
    post_data["solution_count"] = 0
    post_data["is_resolved"] = False
    
    # Traiter les médias si présents
    if post_data.get("media"):
        media_objects = []
        for media_data in post_data["media"]:
            media_data["user_id"] = ObjectId(author_id)
            media_data["uploaded_at"] = datetime.utcnow()
            media_objects.append(media_data)
        post_data["media"] = media_objects
    
    result = await db.posts.insert_one(post_data)
    created_post = await db.posts.find_one({"_id": result.inserted_id})
    return Post(**created_post)


async def get_post(db: AsyncIOMotorDatabase, post_id: str) -> Optional[Post]:
    """Récupérer un post par son ID"""
    post = await db.posts.find_one({"_id": ObjectId(post_id)})
    if post:
        return Post(**post)
    return None


async def get_posts(
    db: AsyncIOMotorDatabase,
    skip: int = 0,
    limit: int = 10,
    specialty: Optional[str] = None,
    is_urgent: Optional[bool] = None,
    is_resolved: Optional[bool] = None,
    search: Optional[str] = None,
    author_id: Optional[str] = None
) -> List[Post]:
    """Récupérer une liste de posts avec filtres"""
    query = {}
    
    if specialty:
        query["specialty"] = specialty
    if is_urgent is not None:
        query["is_urgent"] = is_urgent
    if is_resolved is not None:
        query["is_resolved"] = is_resolved
    if author_id:
        query["author_id"] = ObjectId(author_id)
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"summary": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}},
            {"tags": {"$in": [{"$regex": search, "$options": "i"}]}}
        ]
    
    cursor = db.posts.find(query).sort("created_at", -1).skip(skip).limit(limit)
    posts = await cursor.to_list(length=limit)
    return [Post(**post) for post in posts]


async def update_post(db: AsyncIOMotorDatabase, post_id: str, post_update: PostUpdate, user_id: str) -> Optional[Post]:
    """Mettre à jour un post"""
    # Vérifier que l'utilisateur est l'auteur du post
    existing_post = await db.posts.find_one({"_id": ObjectId(post_id)})
    if not existing_post:
        return None
    
    if existing_post["author_id"] != ObjectId(user_id):
        raise PermissionError("Vous ne pouvez modifier que vos propres posts")
    
    update_data = {k: v for k, v in post_update.dict().items() if v is not None}
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        
        await db.posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$set": update_data}
        )
    
    updated_post = await db.posts.find_one({"_id": ObjectId(post_id)})
    return Post(**updated_post) if updated_post else None


async def delete_post(db: AsyncIOMotorDatabase, post_id: str, user_id: str) -> bool:
    """Supprimer un post"""
    # Vérifier que l'utilisateur est l'auteur du post
    existing_post = await db.posts.find_one({"_id": ObjectId(post_id)})
    if not existing_post:
        return False
    
    if existing_post["author_id"] != ObjectId(user_id):
        raise PermissionError("Vous ne pouvez supprimer que vos propres posts")
    
    result = await db.posts.delete_one({"_id": ObjectId(post_id)})
    
    # Supprimer aussi les commentaires, réactions et solutions associés
    await db.comments.delete_many({"post_id": ObjectId(post_id)})
    await db.reactions.delete_many({"post_id": ObjectId(post_id)})
    await db.solutions.delete_many({"post_id": ObjectId(post_id)})
    
    return result.deleted_count > 0


async def increment_comment_count(db: AsyncIOMotorDatabase, post_id: str) -> bool:
    """Incrémenter le compteur de commentaires"""
    result = await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$inc": {"comment_count": 1}}
    )
    return result.modified_count > 0


async def decrement_comment_count(db: AsyncIOMotorDatabase, post_id: str) -> bool:
    """Décrémenter le compteur de commentaires"""
    result = await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$inc": {"comment_count": -1}}
    )
    return result.modified_count > 0


async def increment_like_count(db: AsyncIOMotorDatabase, post_id: str) -> bool:
    """Incrémenter le compteur de likes"""
    result = await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$inc": {"like_count": 1}}
    )
    return result.modified_count > 0


async def decrement_like_count(db: AsyncIOMotorDatabase, post_id: str) -> bool:
    """Décrémenter le compteur de likes"""
    result = await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$inc": {"like_count": -1}}
    )
    return result.modified_count > 0


async def increment_solution_count(db: AsyncIOMotorDatabase, post_id: str) -> bool:
    """Incrémenter le compteur de solutions"""
    result = await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$inc": {"solution_count": 1}}
    )
    return result.modified_count > 0


async def decrement_solution_count(db: AsyncIOMotorDatabase, post_id: str) -> bool:
    """Décrémenter le compteur de solutions"""
    result = await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$inc": {"solution_count": -1}}
    )
    return result.modified_count > 0


async def get_post_stats(db: AsyncIOMotorDatabase) -> Dict[str, Any]:
    """Récupérer les statistiques des posts"""
    total_posts = await db.posts.count_documents({})
    urgent_posts = await db.posts.count_documents({"is_urgent": True})
    resolved_posts = await db.posts.count_documents({"is_resolved": True})
    
    # Posts par spécialité
    specialty_pipeline = [
        {"$group": {"_id": "$specialty", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    specialty_stats = await db.posts.aggregate(specialty_pipeline).to_list(length=None)
    posts_by_specialty = {stat["_id"]: stat["count"] for stat in specialty_stats if stat["_id"]}
    
    # Posts par mois
    monthly_pipeline = [
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
    monthly_stats = await db.posts.aggregate(monthly_pipeline).to_list(length=None)
    posts_by_month = {
        f"{stat['_id']['year']}-{stat['_id']['month']:02d}": stat["count"] 
        for stat in monthly_stats
    }
    
    return {
        "total_posts": total_posts,
        "urgent_posts": urgent_posts,
        "resolved_posts": resolved_posts,
        "posts_by_specialty": posts_by_specialty,
        "posts_by_month": posts_by_month
    }


async def mark_post_as_resolved(db: AsyncIOMotorDatabase, post_id: str, user_id: str) -> Optional[Post]:
    """Marquer un post comme résolu (seul l'auteur peut le faire)"""
    existing_post = await db.posts.find_one({"_id": ObjectId(post_id)})
    if not existing_post:
        return None
    
    if existing_post["author_id"] != ObjectId(user_id):
        raise PermissionError("Seul l'auteur peut marquer son post comme résolu")
    
    await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {
            "$set": {
                "is_resolved": True,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    updated_post = await db.posts.find_one({"_id": ObjectId(post_id)})
    return Post(**updated_post) if updated_post else None
