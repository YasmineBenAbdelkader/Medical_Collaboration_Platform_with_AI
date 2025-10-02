from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
from ..models.base import PyObjectId


class MediaBase(BaseModel):
    name: str
    type: str  # "image", "video", "document", "audio"
    mime_type: str
    url: str
    size: int
    width: Optional[int] = None
    height: Optional[int] = None
    duration: Optional[float] = None


    @validator('type')
    def validate_type(cls, v):
        allowed_types = ['image', 'video', 'document', 'audio']
        if v not in allowed_types:
            raise ValueError(f'Type must be one of: {", ".join(allowed_types)}')
        return v

    @validator('size')
    def validate_size(cls, v):
        max_size = 100 * 1024 * 1024  # 100MB
        if v > max_size:
            raise ValueError('File size cannot exceed 100MB')
        return v


class MediaCreate(MediaBase):
    post_id: Optional[PyObjectId] = None
    user_id: Optional[PyObjectId] = None


class MediaUpdate(BaseModel):
    name: Optional[str] = None
    is_processed: Optional[bool] = None
    is_public: Optional[bool] = None
    virus_scan_status: Optional[str] = None

    @validator('virus_scan_status')
    def validate_virus_scan_status(cls, v):
        if v is not None:
            allowed_statuses = ['pending', 'clean', 'infected']
            if v not in allowed_statuses:
                raise ValueError(f'Virus scan status must be one of: {", ".join(allowed_statuses)}')
        return v


class Media(BaseModel):
    id: PyObjectId = Field(alias="_id")
    uploaded_at: datetime
    post_id: Optional[PyObjectId] = None
    user_id: PyObjectId
    is_processed: bool = False
    is_public: bool = True
    virus_scan_status: Optional[str] = None

    class Config:
        populate_by_name = True


class MediaResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Media] = None


class MediaListResponse(BaseModel):
    success: bool
    message: str
    data: list[Media]
    total: int
