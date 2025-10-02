from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from ..models.base import PyObjectId
from .media import Media, MediaCreate


class PostBase(BaseModel):
    title: str
    summary: Optional[str] = None
    content: Optional[str] = None
    specialty: Optional[str] = None
    is_urgent: bool = False
    tags: Optional[List[str]] = []
    is_anonymized: bool = True

    @validator('title')
    def title_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Le titre ne peut pas être vide')
        return v.strip()

    @validator('is_anonymized')
    def must_be_anonymized(cls, v):
        if not v:
            raise ValueError('Vous devez confirmer l\'anonymisation des données patients')
        return v


class PostCreate(PostBase):
    media: Optional[List[MediaCreate]] = []


class PostUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    specialty: Optional[str] = None
    is_urgent: Optional[bool] = None
    is_resolved: Optional[bool] = None
    tags: Optional[List[str]] = None
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

    @validator('title')
    def title_must_not_be_empty(cls, v):
        if v is not None and (not v or not v.strip()):
            raise ValueError('Le titre ne peut pas être vide')
        return v.strip() if v else v


class Post(PostBase):
    id: PyObjectId = Field(alias="_id")
    author_id: PyObjectId
    media: Optional[List[Media]] = []
    created_at: datetime
    updated_at: Optional[datetime] = None
    comment_count: int = 0
    like_count: int = 0
    solution_count: int = 0
    is_resolved: bool = False
    ai_suggest: Optional[str] = None

    class Config:
        populate_by_name = True


class PostWithAuthor(Post):
    author: Optional[dict] = None  # Informations de l'auteur populées


class PostResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Post] = None


class PostListResponse(BaseModel):
    success: bool
    message: str
    data: List[Post]
    total: int
    page: int
    limit: int


class PostStats(BaseModel):
    total_posts: int
    urgent_posts: int
    resolved_posts: int
    posts_by_specialty: dict
    posts_by_month: dict
