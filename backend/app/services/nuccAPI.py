import asyncio
import aiohttp
import csv
import io
from typing import List

CSV_URL = "https://www.nucc.org/images/stories/CSV/nucc_taxonomy_251.csv"

async def fetch_nucc_specialties() -> List[dict]:
    print(f"🔍 Tentative fetch de {CSV_URL}")  # Log 1
    async with aiohttp.ClientSession() as session:
        async with session.get(CSV_URL) as resp:
            print(f"📡 Status HTTP: {resp.status}")  # Log 2
            resp.raise_for_status()
            csv_text = await resp.text()
            print(f"📄 Taille CSV text: {len(csv_text)} chars")  # Log 3
            
            csv_reader = csv.DictReader(io.StringIO(csv_text))
            print(f"📋 Colonnes CSV: {csv_reader.fieldnames}")  # Log 4
            
            specialties = []
            row_count = 0
            for row in csv_reader:
                row_count += 1
                code = row.get("code", "").strip()
                if not code:
                    continue
                classification = row.get("classification", "").strip()
                specialization = row.get("specialization", "").strip()
                name = f"{classification} {specialization}".strip() if specialization else classification
                if not name:
                    continue
                
                specialties.append({
                    "name": name,
                    "slug": code,
                    "description": row.get("definition", "").strip() or None,
                    "source": "nucc",
                })
                if row_count <= 3:  # Log premiers exemples
                    print(f"✅ Exemple row {row_count}: {name} (slug: {code})")
            
            print(f"🎯 Total spécialités parsées: {len(specialties)}")  # Log 5
            return specialties