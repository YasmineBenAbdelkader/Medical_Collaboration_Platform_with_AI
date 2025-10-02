import asyncio
import aiohttp
import csv
import io
from typing import List

CSV_URL = "https://www.nucc.org/images/stories/CSV/nucc_taxonomy_251.csv"  # Version 25.1 (juillet 2025)

async def fetch_nucc_specialties() -> List[dict]:
    """
    Récupère la liste complète des spécialités médicales depuis le CSV NUCC.
    Parse et retourne une liste de dicts compatibles avec MedicalSpecialtyCreate.
    """
    print(f"🔍 Tentative fetch de {CSV_URL}")
    async with aiohttp.ClientSession() as session:
        async with session.get(CSV_URL) as resp:
            print(f"📡 Status HTTP: {resp.status}")
            resp.raise_for_status()
            csv_text = await resp.text(encoding='utf-8')  # Fix encoding potentiel
            print(f"📄 Taille CSV text: {len(csv_text)} chars")
            
            csv_reader = csv.DictReader(io.StringIO(csv_text))
            print(f"📋 Colonnes CSV: {csv_reader.fieldnames}")
            
            specialties = []
            row_count = 0
            for row in csv_reader:
                row_count += 1
                code = row.get("Code", "").strip()  # Fix : majuscule
                if not code:
                    continue
                
                classification = row.get("Classification", "").strip()  # Fix : majuscule
                specialization = row.get("Specialization", "").strip()  # Fix : majuscule
                name = f"{classification} {specialization}".strip() if specialization else classification
                
                # Fallback sur "Display Name" si name vide
                if not name:
                    name = row.get("Display Name", "").strip()
                
                if not name:
                    continue
                
                specialties.append({
                    "name": name,
                    "slug": code,
                    "description": row.get("Definition", "").strip() or None,  # Fix : majuscule
                    "source": "nucc",
                })
                
                if row_count <= 3:  # Log premiers exemples
                    print(f"✅ Exemple row {row_count}: {name} (slug: {code})")
            
            print(f"🎯 Total spécialités parsées: {len(specialties)}")
            return specialties