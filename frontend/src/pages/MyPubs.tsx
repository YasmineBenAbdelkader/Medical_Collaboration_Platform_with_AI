import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircleIcon,
  PencilIcon,
  Trash2Icon,
  EyeIcon,
  FileTextIcon,
  Tag as TagIcon,
  MessageSquare as MessageSquareIcon,
  Heart as HeartIcon,
} from 'lucide-react';
import { getCases, deleteCaseById } from '../services/storage';
import type { StoredCase } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';

export const MyPubs = () => {
  const [pubs, setPubs] = useState<(StoredCase & { status: 'draft' | 'published' | 'resolved' })[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'resolved'>('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  const samplePubs: (StoredCase & { status: 'draft' | 'published' | 'resolved' })[] = [
    {
      id: 'sample-pub-1',
      title: 'Douleur thoracique — ECG atypique',
      excerpt: "Homme 52 ans, douleur thoracique intermittente. Examen initial et ECG montrant des anomalies non spécifiques.",
      tags: ['Cardio', 'ECG'],
      hasImage: false,
      imageUrl: '',
      commentCount: 4,
      likeCount: 12,
      status: 'published',
      author: {
        id: user?.id ?? 'demo',
        name: 'Moi',
        avatar: 'https://ui-avatars.com/api/?name=Moi',
        specialty: 'Généraliste',
      },
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: 'sample-draft-1',
      title: "Brouillon — Suspection d'embolie pulmonaire",
      excerpt: 'Notes initiales : dyspnée, antécédents de voyage long courrier. Investigations en attente.',
      tags: ['Urgent'],
      hasImage: false,
      imageUrl: '',
      commentCount: 0,
      likeCount: 0,
      status: 'draft',
      author: {
        id: user?.id ?? 'demo',
        name: 'Moi',
        avatar: 'https://ui-avatars.com/api/?name=Moi',
        specialty: 'Généraliste',
      },
      createdAt: Date.now() - 1000 * 60 * 60 * 5,
    },
    {
      id: 'sample-res-1',
      title: 'Cas résolu — Infection cutanée',
      excerpt: "Traitement efficace après antibiothérapie. Suivi 2 semaines sans complication.",
      tags: ['Dermato', 'Résolu'],
      hasImage: false,
      imageUrl: '',
      commentCount: 6,
      likeCount: 18,
      status: 'resolved',
      author: {
        id: user?.id ?? 'demo',
        name: 'Moi',
        avatar: 'https://ui-avatars.com/api/?name=Moi',
        specialty: 'Généraliste',
      },
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    },
  ];

  useEffect(() => {
    if (!user) return;
    const all = getCases()
      .filter((c) => c.author?.id === user.id)
      .map((c) => ({
        ...c,
        status: (c as any).status ?? 'published',
        author: {
          ...c.author,
          avatar: c.author.avatar ?? 'https://ui-avatars.com/api/?name=' + encodeURIComponent(c.author.name),
          specialty: c.author.specialty ?? 'Généraliste',
        },
      })) as (StoredCase & { status: 'draft' | 'published' | 'resolved' })[];
    setPubs(all.length ? all : samplePubs);
  }, [user]);

  const handleDelete = (id: string) => {
    if (!user) return;
    const ok = confirm('Supprimer définitivement cette publication ?');
    if (!ok) return;
    const remaining = getCases()
      .filter((c) => c.author?.id === user.id)
      .map((c) => ({
        ...c,
        status: (c as any).status ?? 'published',
        author: {
          ...c.author,
          avatar: c.author.avatar ?? 'https://ui-avatars.com/api/?name=' + encodeURIComponent(c.author.name),
          specialty: c.author.specialty ?? 'Généraliste',
        },
      })) as (StoredCase & { status: 'draft' | 'published' | 'resolved' })[];
    setPubs(remaining.length ? remaining : samplePubs);
  };

  const handleClick = (p: StoredCase & { status: 'draft' | 'published' | 'resolved' }) => {
    if (p.status === 'draft') {
      navigate(`/case/new?edit=${p.id}`);
    } else {
      navigate(`/case/${p.id}`);
    }
  };

  const visible = pubs.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'published') return p.status === 'published';
    if (filter === 'draft') return p.status === 'draft';
    if (filter === 'resolved') return p.status === 'resolved';
    return true;
  });

  const renderStatusBadge = (status: 'draft' | 'published' | 'resolved') => {
    return (
      <span
        className={`px-3 py-1 rounded-full font-semibold text-xs bg-gradient-to-r ${
          status === 'draft'
            ? 'from-yellow-100 to-yellow-200 text-yellow-800'
            : status === 'published'
            ? 'from-green-100 to-green-200 text-green-800'
            : 'from-blue-100 to-blue-200 text-blue-800'
        }`}
      >
        {status === 'draft' ? 'Brouillon' : status === 'published' ? 'Publié' : 'Résolu'}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#009688] tracking-tight leading-tight mb-2 sm:mb-0">
          Mes publications
        </h1>
        <Link
          to="/case/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e0f7fa] text-[#009688] font-medium shadow-sm border border-[#b2dfdb] hover:bg-[#b2ebf2] transition"
        >
          <PlusCircleIcon size={18} />
          Nouveau cas
        </Link>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 flex-wrap mb-8">
        {[
          { key: 'all', label: 'Tous' },
          { key: 'published', label: 'Publiés' },
          { key: 'draft', label: 'Brouillons' },
          { key: 'resolved', label: 'Résolus' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as any)}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition
              ${filter === f.key
                ? 'bg-[#b2dfdb] text-[#009688] border-[#b2dfdb] shadow'
                : 'bg-white text-gray-500 border-gray-200 hover:bg-[#e0f2f1]'}
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste soft et large */}
      <div className="space-y-4">
        {visible.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <FileTextIcon size={36} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">Aucune publication à afficher.</p>
            <Link to="/case/new" className="text-[#00A7A7] font-medium inline-block mt-3">
              Créer une nouvelle publication →
            </Link>
          </div>
        ) : (
          visible.map((p) => {
            // Couleurs soft
            let borderColor = "border-l-4 border-[#e0f2f1]";
            let badgeColor = "bg-gray-100 text-gray-500 border border-gray-200";
            if (p.status === "draft") {
              borderColor = "border-l-4 border-yellow-100";
              badgeColor = "bg-yellow-50 text-yellow-700 border border-yellow-100";
            } else if (p.status === "resolved") {
              borderColor = "border-l-4 border-green-100";
              badgeColor = "bg-green-50 text-green-700 border border-green-100";
            } else if (p.status === "published") {
              borderColor = "border-l-4 border-[#b2dfdb]";
              badgeColor = "bg-[#e0f2f1] text-[#009688] border border-[#b2dfdb]";
            }
            return (
              <article
                key={p.id}
                onClick={() => handleClick(p)}
                className={`group bg-white ${borderColor} rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 overflow-hidden flex flex-col md:flex-row cursor-pointer relative p-0`}
                aria-label={`Publication ${p.title}`}
              >
                {/* Image à gauche */}
                {p.hasImage && p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full md:w-48 h-32 md:h-40 object-cover rounded-l-xl md:rounded-xl md:rounded-r-none border-r border-gray-100"
                  />
                ) : (
                  <div className="w-full md:w-48 h-32 md:h-40 bg-gray-50 flex items-center justify-center text-gray-200 text-4xl rounded-l-xl md:rounded-xl md:rounded-r-none border-r border-gray-100">
                    <FileTextIcon size={32} />
                  </div>
                )}
                {/* Contenu */}
                <div className="flex-1 flex flex-col justify-between p-6 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-[#00A7A7] transition-colors">
                      {p.title || 'Sans titre'}
                    </h3>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}
                      style={{ fontWeight: 500 }}>
                      {p.status === 'draft' ? 'Brouillon' : p.status === 'published' ? 'Publié' : 'Résolu'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 mb-2 line-clamp-2 font-light">
                    {p.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(p.tags || []).slice(0, 3).map((t, idx) => {
                      // Palette pastel soft
                      const tagColors = [
                        'bg-blue-50 text-blue-600 border-blue-100',
                        'bg-green-50 text-green-600 border-green-100',
                        'bg-yellow-50 text-yellow-700 border-yellow-100',
                        'bg-pink-50 text-pink-600 border-pink-100',
                        'bg-purple-50 text-purple-600 border-purple-100',
                        'bg-orange-50 text-orange-600 border-orange-100',
                        'bg-teal-50 text-teal-600 border-teal-100',
                      ];
                      const color = tagColors[idx % tagColors.length];
                      return (
                        <span
                          key={t}
                          className={`flex items-center gap-1 text-xs border px-2 py-0.5 rounded-full font-normal ${color}`}
                        >
                          <TagIcon size={11} />
                          {t}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-gray-400">
                      <span className="flex items-center gap-1 text-xs">
                        <MessageSquareIcon size={13} />
                        <span className="font-medium">{p.commentCount ?? 0}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <HeartIcon size={13} />
                        <span className="font-medium">{p.likeCount ?? 0}</span>
                      </span>
                    </div>
                    {/* Date */}
                    <span className="italic text-xs text-gray-300">
                      {new Date(p.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {/* Actions soft */}
                <div className="flex flex-col items-center justify-center gap-2 p-6 bg-white border-l border-gray-50 z-10 min-w-[60px]">
                  <button
                    onClick={e => { e.stopPropagation(); navigate(p.status === 'draft' ? `/case/new?edit=${p.id}` : `/case/${p.id}`); }}
                    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 shadow-sm transition"
                    aria-label="Ouvrir"
                    title="Ouvrir la publication"
                  >
                    <EyeIcon size={16} />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/case/new?edit=${p.id}`); }}
                    className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 shadow-sm transition"
                    aria-label="Éditer"
                    title="Modifier la publication"
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(p.id); }}
                    className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 shadow-sm transition"
                    aria-label="Supprimer"
                    title="Supprimer la publication"
                  >
                    <Trash2Icon size={16} />
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
