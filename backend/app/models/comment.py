from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .base import PyObjectId


class Comment(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    content: str  # Contenu du commentaire
    post_id: PyObjectId  # référence vers Post
    user_id: PyObjectId  # référence vers User (auteur du commentaire)
    
    # Métadonnées temporelles
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    # Relations avec les réponses
    parent_comment_id: Optional[PyObjectId] = None  # Pour les réponses aux commentaires
    reply_count: int = 0  # Nombre de réponses à ce commentaire
    
    # Modération
    is_deleted: bool = False
    is_edited: bool = False
    
    # Interactions
    like_count: int = 0  # Nombre de likes sur le commentaire

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
