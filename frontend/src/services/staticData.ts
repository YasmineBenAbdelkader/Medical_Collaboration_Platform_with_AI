import type { StoredCase } from '../types/post'; // Ajustez si StoredCase est dans un autre fichier types/

export const staticCases: StoredCase[] = [
  {
    id: '1',
    title: 'Suspicion de sténose sévère sur angiographie coronarienne',
    excerpt: "Homme de 62 ans présentant des douleurs thoraciques à l'effort. L’angiographie révèle une sténose estimée à 80% de l’artère interventriculaire antérieure.",
    content: "Patient hypertendu, dyslipidémique, fumeur depuis 30 ans. Test d’effort positif. L’angiographie montre une sténose significative de la branche IVA. Discussion sur l’indication d’une angioplastie avec pose de stent.",
    author: { 
      id: 'user-medecin',
      name: 'Dr. Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      specialty: 'Cardiologie'
    },
    createdAt: Date.now() - 1000 * 60 * 10,
    commentCount: 15,
    likeCount: 40,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1600959907703-4a00b7c5aeca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['Cardiologie', 'Angiographie', 'Sténose', 'Angioplastie'],
    isUrgent: true,
    isResolved: false,
  },
  {
    id: '2',
    title: "Infarctus du myocarde traité par angioplastie d'urgence",
    excerpt: "Patient de 58 ans admis en urgence pour douleur thoracique aiguë, sueurs et dyspnée. ECG : élévation du segment ST en antérieur.",
    content: "Cathétérisme d'urgence réalisé : occlusion totale de la coronaire gauche proximale. Stent posé avec succès. Post-traitement par double antiagrégation plaquettaire. Évolution favorable après 48 heures de surveillance en USIC.",
    author: { 
      id: 'user-expert',
      name: 'Dr. Marie Laurent',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      specialty: 'Cardiologie interventionnelle'
    },
    createdAt: Date.now() - 1000 * 60 * 60,
    commentCount: 22,
    likeCount: 50,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['Cardiologie', 'Infarctus', 'Stent', 'Urgence'],
    isUrgent: true,
    isResolved: true,
  },
  {
    id: '3',
    title: 'Arythmie ventriculaire post-infarctus chez un patient diabétique',
    excerpt: "Homme de 67 ans présentant des épisodes d’arythmie ventriculaire à répétition trois mois après un infarctus antérieur.",
    content: "L’électrocardiogramme montre des extrasystoles ventriculaires fréquentes. Une exploration électrophysiologique est envisagée. Discussion sur l’indication d’un défibrillateur implantable (DAI).",
    author: { 
      id: 'user-medecin',
      name: 'Dr. Antoine Moreau',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      specialty: 'Cardiologie rythmologie'
    },
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    commentCount: 9,
    likeCount: 21,
    hasImage: false,
    tags: ['Cardiologie', 'Arythmie', 'Post-infarctus', 'Rythmologie'],
    isUrgent: false,
    isResolved: false,
  },
  {
    id: '4',
    title: 'Cardiomyopathie dilatée avec insuffisance cardiaque modérée',
    excerpt: "Patiente de 45 ans avec dyspnée progressive. Échocardiographie : fraction d’éjection à 30%, dilatation ventriculaire gauche marquée.",
    content: "BNP élevé, échocardiographie confirmant une dysfonction systolique. Mise en place d’un traitement par IEC, bêtabloquant et diurétiques. Suivi clinique prévu dans 1 mois.",
    author: { 
      id: 'user-expert',
      name: 'Dr. Jean Morel',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      specialty: 'Cardiologie clinique'
    },
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    commentCount: 6,
    likeCount: 17,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['Cardiologie', 'Insuffisance cardiaque', 'Échographie'],
    isUrgent: false,
    isResolved: false,
  },
];

export const getStaticCases = (role: 'medecin' | 'expert'): StoredCase[] => {
  return staticCases.filter(c => c.author.id === (role === 'medecin' ? 'user-medecin' : 'user-expert'));
};

export const seedStaticCases = () => staticCases; // Retourne le tableau pour mock seed
