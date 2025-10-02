from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .base import PyObjectId


class Reaction(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    type: str  # "like", "dislike", "helpful", "expert_approved"
    post_id: Optional[PyObjectId] = None  # référence vers Post (pour les likes de posts)
    comment_id: Optional[PyObjectId] = None  # référence vers Comment (pour les likes de commentaires)
    solution_id: Optional[PyObjectId] = None  # référence vers Solution (pour les likes de solutions)
    user_id: PyObjectId  # référence vers User (auteur de la réaction)
    
    # Métadonnées temporelles
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
