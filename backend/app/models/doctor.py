from .user import UserBase, UserRole


class Doctor(UserBase):
    rpps_number: str
    years_of_experience: int
    diploma: str
    professional_card: str
    role: UserRole = UserRole.doctor  # auto défini
