from .user import UserBase, UserRole


class Student(UserBase):
    certificate_of_university_enrollment: str
    certificate_of_professional_enrollment: str

    role: UserRole = UserRole.student  # auto défini
