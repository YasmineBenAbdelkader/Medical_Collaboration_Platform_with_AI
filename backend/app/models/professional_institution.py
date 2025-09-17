from pydantic import BaseModel
from typing import Optional


class ProfessionalInstitution(BaseModel):
    id: Optional[str]
    pro_inst_name: str
