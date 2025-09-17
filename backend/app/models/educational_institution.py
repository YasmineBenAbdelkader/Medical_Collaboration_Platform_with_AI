from pydantic import BaseModel
from typing import Optional


class EducationalInstitution(BaseModel):
    id: Optional[str]
    educ_inst_name: str
