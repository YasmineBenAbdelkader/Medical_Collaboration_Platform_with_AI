import aiofiles
from pathlib import Path
from uuid import uuid4
from fastapi import HTTPException
from typing import Tuple

ALLOWED_CONTENT_TYPES = {"image/png", "image/jpeg", "image/jpg", "application/pdf"}
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB

async def save_upload_file(upload_file, dest_folder: str, max_size: int = MAX_FILE_SIZE) -> Tuple[str, int]:
    Path(dest_folder).mkdir(parents=True, exist_ok=True)
    suffix = Path(upload_file.filename).suffix.lower()
    unique_name = f"{uuid4().hex}{suffix}"
    dest_path = Path(dest_folder) / unique_name

    size = 0
    async with aiofiles.open(dest_path, "wb") as out_file:
        while chunk := await upload_file.read(1024*1024):  # 1MB par chunk
            size += len(chunk)
            if size > max_size:
                await out_file.close()
                dest_path.unlink(missing_ok=True)
                raise HTTPException(status_code=413, detail="File too large")
            await out_file.write(chunk)
    return str(dest_path), size

def validate_file(upload_file):
    if upload_file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail=f"Type de fichier non autorisé: {upload_file.content_type}")
