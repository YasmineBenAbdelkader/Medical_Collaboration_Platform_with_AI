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
	createdAt: number; // epoch ms
	commentCount: number;
	likeCount: number;
	hasImage?: boolean;
	imageUrl?: string; // can be base64 data URL
	tags?: string[];
	isUrgent?: boolean;
}

const STORAGE_KEY = 'medcollab.cases';

function readCases(): StoredCase[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed: StoredCase[] = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function writeCases(cases: StoredCase[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}

export function getCases(): StoredCase[] {
	return readCases().sort((a, b) => b.createdAt - a.createdAt);
}

export function addCase(newCase: Omit<StoredCase, 'id' | 'createdAt' | 'commentCount' | 'likeCount'>): StoredCase {
	const cases = readCases();
	const created: StoredCase = {
		...newCase,
		id: (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`),
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
	if (existing.length > 0) return;
	const seed: StoredCase[] = [
		{
			id: '1',
			title: 'Patient avec arythmie cardiaque inexpliquée',
			excerpt: "Homme de 54 ans présentant des épisodes d'arythmie cardiaque depuis 3 semaines. ECG et analyses sanguines normaux. Antécédents familiaux de problèmes cardiaques...",
			author: {
				id: '2',
				name: 'Dr. Thomas Dubois',
				avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
				specialty: 'Cardiologie',
			},
			createdAt: Date.now() - 1000 * 60 * 10,
			commentCount: 12,
			likeCount: 24,
			hasImage: true,
			imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
			tags: ['Cardiologie', 'Arythmie', 'ECG'],
			isUrgent: false,
		},
		{
			id: '2',
			title: "Cas complexe de dermatite - besoin d'avis",
			excerpt: 'Patiente de 32 ans avec éruption cutanée progressive depuis 2 mois. Résistante aux traitements standard. Biopsie suggère...',
			author: {
				id: '3',
				name: 'Dr. Marie Laurent',
				avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
				specialty: 'Dermatologie',
			},
			createdAt: Date.now() - 1000 * 60 * 60,
			commentCount: 8,
			likeCount: 15,
			hasImage: true,
			imageUrl: 'https://images.unsplash.com/photo-1579165466991-467135ad3110?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
			tags: ['Dermatologie', 'Allergie', 'Biopsie'],
			isUrgent: true,
		},
		{
			id: '3',
			title: 'Douleur abdominale atypique chez un adolescent',
			excerpt: "Adolescent de 16 ans avec douleur abdominale intermittente depuis 6 semaines. Examens d'imagerie normaux mais symptômes persistants...",
			author: {
				id: '4',
				name: 'Dr. Antoine Moreau',
				avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
				specialty: 'Pédiatrie',
			},
			createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
			commentCount: 5,
			likeCount: 9,
			hasImage: false,
			tags: ['Pédiatrie', 'Gastroentérologie', 'Douleur chronique'],
			isUrgent: false,
		},
	];
	writeCases(seed);
}
