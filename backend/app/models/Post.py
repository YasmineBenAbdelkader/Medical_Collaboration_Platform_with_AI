from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from .base import PyObjectId
from .Media import Media


class Post(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    title: str
    details: Optional[str] = None
    summary: Optional[str] = None  # Résumé court du cas
    content: Optional[str] = None  # Contenu détaillé
    specialty: Optional[str] = None  # Spécialité médicale
    is_urgent: bool = False
    is_resolved: bool = False
    ai_suggest: Optional[str] = None
    
    # Relations avec les utilisateurs
    author_id: PyObjectId  # référence vers User
    
    # Un post peut contenir 0 ou plusieurs médias
    media: Optional[List[Media]] = []   # Liste des fichiers multimédias attachés au post
    # Types de médias supportés: 
    # - Images: jpg, jpeg, png, gif, webp, svg
    # - Vidéos: mp4, avi, mov, wmv, flv, webm
    # - Documents: pdf, docx, doc, txt, rtf, pptx, ppt
    # - Audio: mp3, wav, ogg, m4a
    
    # Tags et catégorisation
    tags: Optional[List[str]] = []     # liste de tags
    
    # Métadonnées temporelles
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    # Relations avec les interactions
    comment_count: int = 0
    like_count: int = 0
    solution_count: int = 0  # Nombre de solutions proposées par les experts
    
    # Anonymisation
    is_anonymized: bool = True  # Confirmation d'anonymisation des données patients

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
