from pydantic import BaseModel
from typing import Optional, List


class Post(BaseModel):
    id: Optional[str]
    title: str
    details: Optional[str]
    state: str
    ai_suggest: Optional[str]

    # Un post peut contenir 0 ou plusieurs médias
    media: Optional[List[dict]] = []   # chaque élément = Media

    tags: Optional[List[str]] = []     # liste de tags
    author_id: str                     # référence vers User
