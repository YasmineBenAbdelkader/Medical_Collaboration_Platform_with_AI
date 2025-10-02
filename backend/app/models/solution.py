from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .base import PyObjectId


class Solution(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    content: str  # Contenu de la solution proposée
    post_id: PyObjectId  # référence vers Post
    expert_id: PyObjectId  # référence vers User (expert qui propose la solution)
    
    # Métadonnées temporelles
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    # Statut de la solution
    status: str = "pending"  # "pending", "accepted", "rejected"
    is_marked_as_resolution: bool = False  # Marqué comme résolution officielle
    
    # Interactions et évaluations
    like_count: int = 0
    helpful_count: int = 0  # Nombre de votes "helpful"
    expert_approvals: int = 0  # Nombre d'approbations d'autres experts
    
    # Références et justifications
    references: Optional[list] = []  # Références médicales/scientifiques
    confidence_level: Optional[str] = None  # "low", "medium", "high"
    
    # Modération
    is_deleted: bool = False
    is_edited: bool = False

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True