from .user import UserBase, UserRole


class Student(UserBase):
    subscription_number: str
    certificate_of_enrollment: str
    role: UserRole = UserRole.student  # auto défini
