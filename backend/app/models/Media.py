from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .base import PyObjectId


class Media(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str  # Nom original du fichier
    type: str  # "image", "video", "document", "audio"
    mime_type: str  # Type MIME complet (ex: "image/jpeg", "application/pdf")
    url: str  # URL ou chemin du fichier
    size: int  # Taille du fichier en bytes
    
    # Métadonnées pour les images
    width: Optional[int] = None  # Largeur en pixels (pour images/vidéos)
    height: Optional[int] = None  # Hauteur en pixels (pour images/vidéos)
    duration: Optional[float] = None  # Durée en secondes (pour vidéos/audio)
    
    # Métadonnées temporelles
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relations
    post_id: Optional[PyObjectId] = None  # Post associé (si stocké séparément)
    user_id: PyObjectId  # Utilisateur qui a uploadé le fichier
    
    # Statut et sécurité
    is_processed: bool = False  # Si le fichier a été traité (redimensionné, etc.)
    is_public: bool = True  # Si le fichier est accessible publiquement
    virus_scan_status: Optional[str] = None  # "pending", "clean", "infected"

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
