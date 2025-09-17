from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Message(BaseModel):
    id: Optional[str]
    message_body: str
    created_at: datetime
    user_id: str
    chat_id: str
