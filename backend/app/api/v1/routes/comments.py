from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase

from ....db.mongo import get_db
from ....schemas.comment import CommentCreate, CommentUpdate, CommentResponse, CommentListResponse
from ....crud.comment import (
    create_comment, get_comment, get_comments_by_post, update_comment, delete_comment,
    increment_comment_like_count, decrement_comment_like_count
)
from ....api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_new_comment(
    comment: CommentCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Créer un nouveau commentaire"""
    try:
        created_comment = await create_comment(db, comment, current_user["id"])
        
        # Incrémenter le compteur de commentaires du post
        from ....crud.post import increment_comment_count
        await increment_comment_count(db, comment.post_id)
        
        return CommentResponse(
            success=True,
            message="Commentaire créé avec succès",
            data=created_comment
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erreur lors de la création du commentaire: {str(e)}"
        )


@router.get("/post/{post_id}", response_model=CommentListResponse)
async def get_comments_by_post_id(
    post_id: str,
    skip: int = Query(0, ge=0, description="Nombre de commentaires à ignorer"),
    limit: int = Query(20, ge=1, le=100, description="Nombre de commentaires à retourner"),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Récupérer les commentaires d'un post"""
    try:
        comments = await get_comments_by_post(db, post_id, skip, limit)
        total = await db.comments.count_documents({"post_id": post_id})
        
        return CommentListResponse(
            success=True,
            message="Commentaires récupérés avec succès",
            data=comments,
            total=total
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la récupération des commentaires: {str(e)}"
        )


@router.get("/{comment_id}", response_model=CommentResponse)
async def get_comment_by_id(
    comment_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Récupérer un commentaire par son ID"""
    try:
        comment = await get_comment(db, comment_id)
        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Commentaire non trouvé"
            )
        
        return CommentResponse(
            success=True,
            message="Commentaire récupéré avec succès",
            data=comment
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la récupération du commentaire: {str(e)}"
        )


@router.put("/{comment_id}", response_model=CommentResponse)
async def update_comment_by_id(
    comment_id: str,
    comment_update: CommentUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Mettre à jour un commentaire"""
    try:
        updated_comment = await update_comment(db, comment_id, comment_update, current_user["id"])
        if not updated_comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Commentaire non trouvé"
            )
        
        return CommentResponse(
            success=True,
            message="Commentaire mis à jour avec succès",
            data=updated_comment
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
            detail=f"Erreur lors de la mise à jour du commentaire: {str(e)}"
        )


@router.delete("/{comment_id}")
async def delete_comment_by_id(
    comment_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Supprimer un commentaire"""
    try:
        # Récupérer le commentaire pour obtenir le post_id
        comment = await get_comment(db, comment_id)
        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Commentaire non trouvé"
            )
        
        deleted = await delete_comment(db, comment_id, current_user["id"])
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Commentaire non trouvé"
            )
        
        # Décrémenter le compteur de commentaires du post
        from ....crud.post import decrement_comment_count
        await decrement_comment_count(db, str(comment.post_id))
        
        return {"success": True, "message": "Commentaire supprimé avec succès"}
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
            detail=f"Erreur lors de la suppression du commentaire: {str(e)}"
        )


@router.post("/{comment_id}/like")
async def like_comment(
    comment_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Aimer un commentaire"""
    try:
        success = await increment_comment_like_count(db, comment_id)
        return {"success": success, "message": "Commentaire aimé avec succès"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors du like: {str(e)}"
        )


@router.delete("/{comment_id}/like")
async def unlike_comment(
    comment_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Ne plus aimer un commentaire"""
    try:
        success = await decrement_comment_like_count(db, comment_id)
        return {"success": success, "message": "Like supprimé avec succès"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la suppression du like: {str(e)}"
        )
