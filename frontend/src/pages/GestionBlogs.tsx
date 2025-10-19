import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'pending';
  publishedAt: string;
  views: number;
  image: string;
}

export const GestionBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'pending'>('all');

  const [posts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Les avancées en cardiologie interventionnelle',
      excerpt: 'Découvrez les dernières techniques en cardiologie...',
      author: 'Dr. Sophie Martin',
      category: 'Cardiologie',
      status: 'published',
      publishedAt: '2024-03-15',
      views: 1250,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d'
    },
    {
      id: '2',
      title: 'Diagnostic précoce des AVC',
      excerpt: 'L\'importance du diagnostic rapide dans les AVC...',
      author: 'Dr. Jean Dubois',
      category: 'Neurologie',
      status: 'draft',
      publishedAt: '2024-03-20',
      views: 0,
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc'
    },
    {
      id: '3',
      title: 'Vaccination pédiatrique : mise à jour 2024',
      excerpt: 'Nouvelles recommandations en matière de vaccination...',
      author: 'Dr. Marie Laurent',
      category: 'Pédiatrie',
      status: 'pending',
      publishedAt: '2024-03-18',
      views: 0,
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133'
    },
  ]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config = {
      published: { bg: 'bg-green-100', text: 'text-green-700', label: 'Publié' },
      draft: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Brouillon' },
      pending: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'En attente' }
    };
    const c = config[status as keyof typeof config];
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>{c.label}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des blogs</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A7A7] text-white rounded-lg hover:bg-[#008f8f] transition shadow-sm">
          <Plus size={18} />
          Nouvel article
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl border p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A7A7] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'published', 'draft', 'pending'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusFilter === status
                    ? 'bg-[#00A7A7] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'Tous' : status === 'published' ? 'Publiés' : status === 'draft' ? 'Brouillons' : 'En attente'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille d'articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition group">
            <div className="relative h-48 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute top-3 right-3">
                {getStatusBadge(post.status)}
              </div>
            </div>
            <div className="p-5">
              <div className="mb-3">
                <span className="text-xs font-medium text-[#00A7A7] bg-[#e0f7fa] px-2 py-1 rounded">{post.category}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00A7A7] transition">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
              {post.status === 'published' && (
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <Eye size={12} />
                  <span>{post.views} vues</span>
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium flex items-center justify-center gap-1">
                  <Edit size={14} />
                  Modifier
                </button>
                <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Aucun article trouvé</p>
        </div>
      )}
    </div>
  );
};