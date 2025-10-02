from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from ..models.base import PyObjectId


class CommentBase(BaseModel):
    content: str
    post_id: str
    parent_comment_id: Optional[str] = None

    @validator('content')
    def content_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Le contenu du commentaire ne peut pas être vide')
        return v.strip()


class CommentCreate(CommentBase):
    pass


class CommentUpdate(BaseModel):
    content: Optional[str] = None
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

    @validator('content')
    def content_must_not_be_empty(cls, v):
        if v is not None and (not v or not v.strip()):
            raise ValueError('Le contenu du commentaire ne peut pas être vide')
        return v.strip() if v else v


class Comment(CommentBase):
    id: PyObjectId = Field(alias="_id")
    user_id: PyObjectId
    created_at: datetime
    updated_at: Optional[datetime] = None
    reply_count: int = 0
    is_deleted: bool = False
    is_edited: bool = False
    like_count: int = 0

    class Config:
        populate_by_name = True


class CommentWithAuthor(Comment):
    author: Optional[dict] = None  # Informations de l'auteur populées


class CommentResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Comment] = None


class CommentListResponse(BaseModel):
    success: bool
    message: str
    data: List[Comment]
    total: int
