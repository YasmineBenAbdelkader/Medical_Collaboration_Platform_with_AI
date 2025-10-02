from .user import UserBase, UserRole


class Doctor(UserBase):
    professional_number: str
    professional_card: str
    year_of_experience: str
    curriculum_vitae: str
    diploma: str
    role: UserRole = UserRole.doctor  # auto défini
