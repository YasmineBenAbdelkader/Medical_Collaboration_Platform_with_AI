import { useMemo, useState } from 'react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  specialty: string;
};

const ALL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "Les avancées de l'IA en cardiologie",
    excerpt:
      "Découvrez comment l'intelligence artificielle révolutionne le diagnostic des maladies cardiovasculaires.",
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2070&q=80',
    specialty: 'Cardiologie'
  },
  {
    id: '2',
    title: 'Imagerie médicale assistée par IA',
    excerpt:
      "Analyse automatique des images et aide à la décision pour les radiologues.",
    image:
      'https://images.unsplash.com/photo-1581093588401-16ec8a8b6c85?auto=format&fit=crop&w=2070&q=80',
    specialty: 'Radiologie'
  },
  {
    id: '3',
    title: 'Prise en charge des cancers rares',
    excerpt:
      "La collaboration interdisciplinaire et l'IA pour des traitements personnalisés en oncologie.",
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2070&q=80',
    specialty: 'Oncologie'
  },
  {
    id: '4',
    title: 'IA et dépistage précoce des AVC',
    excerpt:
      'Les outils d’IA pour détecter plus tôt les signes neurologiques et réduire les délais de prise en charge.',
    image:
      'https://images.unsplash.com/photo-1582719478250-9225c9962552?auto=format&fit=crop&w=2070&q=80',
    specialty: 'Neurologie'
  }
];

const SPECIALTIES = ['Tous', 'Cardiologie', 'Radiologie', 'Oncologie', 'Neurologie'];

export const Blog = () => {
  const [selected, setSelected] = useState<string>('Tous');
  const [query, setQuery] = useState<string>('');

  const filtered = useMemo(() => {
    return ALL_POSTS.filter(post => {
      const matchSpecialty = selected === 'Tous' || post.specialty === selected;
      const matchQuery = query.trim().length === 0 ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchSpecialty && matchQuery;
    });
  }, [selected, query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isTeal={true} logoSrc="/vite.svg" brandTitle="MedCollab" brandSubtitle="Collaboration médicale" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Blog</h1>
        <p className="mt-2 text-lg text-gray-600">
          Articles Récents<br />
          Découvrez les dernières actualités médicales et les cas cliniques intéressants partagés par notre communauté.
        </p>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {SPECIALTIES.map(sp => (
                <button
                  key={sp}
                  onClick={() => setSelected(sp)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    selected === sp
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400 hover:text-teal-700'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher un article..."
                className="w-full rounded-md border-gray-300 focus:ring-teal-600 focus:border-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-gray-600">Aucun article ne correspond à votre filtre.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map(post => (
              <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
                      {post.specialty}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <button className="text-teal-600 font-medium hover:text-teal-700">Lire l'article</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Footer appName="MedCollab" description="Plateforme de collaboration médicale et d'assistance IA pour partager des cas cliniques et améliorer les décisions." />
    </div>
  );
};


