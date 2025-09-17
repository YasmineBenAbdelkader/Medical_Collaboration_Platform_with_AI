from app.db.mongo import get_db

# Expose la fonction comme dépendance
async def get_database():
    return get_db()
