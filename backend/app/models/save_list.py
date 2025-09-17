from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SaveList(BaseModel):
    id: Optional[str]
    add_to_save_list: datetime
    user_id: str
    post_id: str
