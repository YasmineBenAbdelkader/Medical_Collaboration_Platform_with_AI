from pydantic import BaseModel
from typing import Optional


class Comment(BaseModel):
    id: Optional[str]
    comment: str
    post_id: str
    user_id: str
