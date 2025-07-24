from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MONGO_HOST: str
    MONGO_PORT: int
    MONGO_DB: str

    class Config:
        env_file = "../.env"


settings = Settings()
