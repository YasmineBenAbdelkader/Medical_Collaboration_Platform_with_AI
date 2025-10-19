// src/services/storage.ts

export interface CaseAuthor { 
	id: string;
	name: string;
	avatar: string;
	specialty: string;
}

export interface StoredCase {
	id: string;
	title: string;
	excerpt: string;
	content?: string;
	author: CaseAuthor;
	createdAt: number;
	commentCount: number;
	likeCount: number;
	hasImage?: boolean;
	imageUrl?: string;
	tags?: string[];
	isUrgent?: boolean;
	isResolved?: boolean;
}

const STORAGE_KEY = 'medcollab.cases';

// 🔒 Fonctions sûres avec vérification de localStorage
function safeGetItem(key: string): string | null {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem(key);
}

function safeSetItem(key: string, value: string): void {
	if (typeof window === 'undefined') return;
	localStorage.setItem(key, value);
}

function readCases(): StoredCase[] {
	try {
		const raw = safeGetItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed: StoredCase[] = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch (err) {
		console.error("❌ Erreur de lecture localStorage :", err);
		return [];
	}
}

function writeCases(cases: StoredCase[]): void {
	console.log("💾 writeCases() =>", cases.length, "cas");
	safeSetItem(STORAGE_KEY, JSON.stringify(cases));
}

export function getCases(): StoredCase[] {
	return readCases().sort((a, b) => b.createdAt - a.createdAt);
}

export function addCase(
	newCase: Omit<StoredCase, 'id' | 'createdAt' | 'commentCount' | 'likeCount'>
): StoredCase {
	const cases = readCases();
	const created: StoredCase = {
		...newCase,
		id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
		createdAt: Date.now(),
		commentCount: 0,
		likeCount: 0,
	};
	cases.push(created);
	writeCases(cases);
	return created;
}

export function deleteCaseById(id: string, requesterId?: string): boolean {
	const cases = readCases();
	const idx = cases.findIndex(c => c.id === id);
	if (idx === -1) return false;
	if (requesterId && cases[idx].author.id !== requesterId) return false;
	cases.splice(idx, 1);
	writeCases(cases);
	return true;
}

export function clearCases(): void {
	writeCases([]);
}

export function seedCasesIfEmpty(): void {
	const existing = readCases();
	console.log("📦 seedCasesIfEmpty() —", existing.length, "cas existants");

	if (existing.length > 0) return;

	console.log("🌱 Aucun cas trouvé, création du seed initial...");

	const seed: StoredCase[] = [
		{
			id: '1',
			title: 'Suspicion de sténose sévère sur angiographie coronarienne',
			excerpt: "Homme de 62 ans, douleurs thoraciques à l'effort. Angiographie montre une sténose estimée à 80% de l'artère interventriculaire antérieure.",
			author: {
				id: '10',
				name: 'Dr. Claire Bernard',
				avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
				specialty: 'Cardiologie',
			},
			createdAt: Date.now() - 1000 * 60 * 20,
			commentCount: 14,
			likeCount: 32,
			hasImage: true,
			imageUrl: '/images/11.png',
			tags: ['Cardiologie', 'Angiographie', 'Sténose'],
			isUrgent: true,
			isResolved: false,
		},
		{
			id: '2',
			title: 'Infarctus du myocarde antérieur traité avec succès par angioplastie',
			excerpt: "Patient de 58 ans admis en urgence pour douleur thoracique aiguë. Angiographie : occlusion totale de la coronaire gauche. Pose de stent réussie.",
			author: {
				id: '11',
				name: 'Dr. Thomas Dubois',
				avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
				specialty: 'Cardiologie interventionnelle',
			},
			createdAt: Date.now() - 1000 * 60 * 60,
			commentCount: 20,
			likeCount: 45,
			hasImage: true,
			imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
			tags: ['Cardiologie', 'Infarctus', 'Stent', 'Urgence'],
			isUrgent: true,
			isResolved: true,
		},
		{
			id: '3',
			title: 'Arythmie post-infarctus chez un patient diabétique',
			excerpt: "Homme de 67 ans, antécédent d'infarctus il y a 3 mois. Présente des épisodes d’arythmie ventriculaire à répétition.",
			author: {
				id: '12',
				name: 'Dr. Nadia Lefèvre',
				avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
				specialty: 'Cardiologie rythmologie',
			},
			createdAt: Date.now() - 1000 * 60 * 60 * 24,
			commentCount: 9,
			likeCount: 22,
			hasImage: false,
			tags: ['Arythmie', 'Post-infarctus', 'Cardiologie'],
			isUrgent: false,
			isResolved: false,
		},
		{
			id: '4',
			title: 'Cas de cardiomyopathie dilatée avec insuffisance cardiaque',
			excerpt: "Patiente de 45 ans, essoufflement progressif. Échocardiographie : fraction d’éjection à 30%, ventricule gauche dilaté.",
			author: {
				id: '13',
				name: 'Dr. Jean Morel',
				avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
				specialty: 'Cardiologie clinique',
			},
			createdAt: Date.now() - 1000 * 60 * 60 * 5,
			commentCount: 11,
			likeCount: 18,
			hasImage: true,
			imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
			tags: ['Cardiologie', 'Insuffisance cardiaque', 'Échographie'],
			isUrgent: false,
			isResolved: false,
		},
	];

	writeCases(seed);
	console.log("✅ Cas seedés avec succès :", seed.length);
}
