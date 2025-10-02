from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase

from ....db.mongo import get_db
from ....schemas.post import PostCreate, PostUpdate, PostResponse, PostListResponse, PostStats
from ....crud.post import (
    create_post, get_post, get_posts, update_post, delete_post,
    increment_comment_count, decrement_comment_count,
    increment_like_count, decrement_like_count,
    increment_solution_count, decrement_solution_count,
    get_post_stats, mark_post_as_resolved
)
from ....api.deps import get_current_user

router = APIRouter()


@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_new_post(
    post: PostCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Créer un nouveau post"""
    try:
        created_post = await create_post(db, post, current_user["id"])
        return PostResponse(
            success=True,
            message="Post créé avec succès",
            data=created_post
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erreur lors de la création du post: {str(e)}"
        )


@router.get("/", response_model=PostListResponse)
async def get_posts_list(
    skip: int = Query(0, ge=0, description="Nombre de posts à ignorer"),
    limit: int = Query(10, ge=1, le=100, description="Nombre de posts à retourner"),
    specialty: Optional[str] = Query(None, description="Filtrer par spécialité"),
    is_urgent: Optional[bool] = Query(None, description="Filtrer par urgence"),
    is_resolved: Optional[bool] = Query(None, description="Filtrer par statut résolu"),
    search: Optional[str] = Query(None, description="Rechercher dans le contenu"),
    author_id: Optional[str] = Query(None, description="Filtrer par auteur"),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Récupérer la liste des posts avec filtres"""
    try:
        posts = await get_posts(
            db=db,
            skip=skip,
            limit=limit,
            specialty=specialty,
            is_urgent=is_urgent,
            is_resolved=is_resolved,
            search=search,
            author_id=author_id
        )
        
        total = await db.posts.count_documents({})
        
        return PostListResponse(
            success=True,
            message="Posts récupérés avec succès",
            data=posts,
            total=total,
            page=skip // limit + 1,
            limit=limit
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la récupération des posts: {str(e)}"
        )


@router.get("/{post_id}", response_model=PostResponse)
async def get_post_by_id(
    post_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Récupérer un post par son ID"""
    try:
        post = await get_post(db, post_id)
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post non trouvé"
            )
        
        return PostResponse(
            success=True,
            message="Post récupéré avec succès",
            data=post
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la récupération du post: {str(e)}"
        )


@router.put("/{post_id}", response_model=PostResponse)
async def update_post_by_id(
    post_id: str,
    post_update: PostUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Mettre à jour un post"""
    try:
        updated_post = await update_post(db, post_id, post_update, current_user["id"])
        if not updated_post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post non trouvé"
            )
        
        return PostResponse(
            success=True,
            message="Post mis à jour avec succès",
            data=updated_post
        )
    except PermissionError as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(e)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la mise à jour du post: {str(e)}"
        )


@router.delete("/{post_id}")
async def delete_post_by_id(
    post_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Supprimer un post"""
    try:
        deleted = await delete_post(db, post_id, current_user["id"])
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post non trouvé"
            )
        
        return {"success": True, "message": "Post supprimé avec succès"}
    except PermissionError as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(e)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la suppression du post: {str(e)}"
        )


@router.patch("/{post_id}/resolve", response_model=PostResponse)
async def mark_post_resolved(
    post_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Marquer un post comme résolu"""
    try:
        resolved_post = await mark_post_as_resolved(db, post_id, current_user["id"])
        if not resolved_post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post non trouvé"
            )
        
        return PostResponse(
            success=True,
            message="Post marqué comme résolu",
            data=resolved_post
        )
    except PermissionError as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(e)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la mise à jour du post: {str(e)}"
        )


@router.get("/stats/overview", response_model=PostStats)
async def get_posts_statistics(
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Récupérer les statistiques des posts"""
    try:
        stats = await get_post_stats(db)
        return PostStats(**stats)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la récupération des statistiques: {str(e)}"
        )


@router.post("/{post_id}/increment-comments")
async def increment_post_comments(
    post_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Incrémenter le compteur de commentaires (appelé lors de l'ajout d'un commentaire)"""
    try:
        success = await increment_comment_count(db, post_id)
        return {"success": success, "message": "Compteur de commentaires mis à jour"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la mise à jour du compteur: {str(e)}"
        )


@router.post("/{post_id}/decrement-comments")
async def decrement_post_comments(
    post_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Décrémenter le compteur de commentaires (appelé lors de la suppression d'un commentaire)"""
    try:
        success = await decrement_comment_count(db, post_id)
        return {"success": success, "message": "Compteur de commentaires mis à jour"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la mise à jour du compteur: {str(e)}"
        )
