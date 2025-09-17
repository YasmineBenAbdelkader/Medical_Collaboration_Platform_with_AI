from .user import UserBase


class Admin(UserBase):
    subscription_number: str
