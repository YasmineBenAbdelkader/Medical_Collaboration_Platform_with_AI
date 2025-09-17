from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Media(BaseModel):
    id: Optional[str]
    type: str   # "image", "video", "document", "other"
    path: str   # chemin ou URL du fichier
    uploaded_at: datetime
