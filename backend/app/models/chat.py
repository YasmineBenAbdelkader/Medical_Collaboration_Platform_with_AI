from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Chat(BaseModel):
    id: Optional[str]
    created_at: datetime
