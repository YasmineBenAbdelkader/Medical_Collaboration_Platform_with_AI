from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_HOST: str = "localhost"
    MONGO_PORT: int = 27017
    MONGO_DB: str = "MedicalDB"
    MONGO_USER: str | None = None
    MONGO_PASSWORD: str | None = None

    class Config:
        env_file = ".env"

# ⚡ Instance globale que tu peux importer partout
settings = Settings()
