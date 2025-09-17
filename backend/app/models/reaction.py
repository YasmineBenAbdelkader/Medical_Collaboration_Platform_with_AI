from pydantic import BaseModel
from typing import Optional


class Reaction(BaseModel):
    id: Optional[str]
    reaction: str
    post_id: str
    user_id: str
