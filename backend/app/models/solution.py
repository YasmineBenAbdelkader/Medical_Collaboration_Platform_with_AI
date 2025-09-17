from pydantic import BaseModel
from typing import Optional


class Solution(BaseModel):
    id: Optional[str]
    solution: str
    post_id: str  # référence vers Post
    user_id: str