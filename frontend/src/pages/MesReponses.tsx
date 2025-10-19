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
  CheckCircle,
} from 'lucide-react';
import { getCases, deleteCaseById } from '../services/storage';
import type { StoredCase } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';

export const MesReponses = () => {
  const [responses, setResponses] = useState<(StoredCase & { status: 'pending' | 'accepted' | 'rejected' })[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  const sampleResponses: (StoredCase & { status: 'pending' | 'accepted' | 'rejected' })[] = [
    {
      id: 'sample-resp-1',
      title: 'Réponse — Douleur thoracique ECG atypique',
      excerpt: "J'ai examiné l'ECG et je suggère une coronarographie compte tenu des antécédents familiaux et des symptômes persistants.",
      tags: ['Cardio', 'Diagnostic'],
      hasImage: false,
      imageUrl: '',
      commentCount: 8,
      likeCount: 15,
      status: 'accepted',
      author: {
        id: user?.id ?? 'expert-demo',
        name: 'Moi',
        avatar: 'https://ui-avatars.com/api/?name=Moi',
        specialty: 'Cardiologie',
      },
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    },
    {
      id: 'sample-resp-2',
      title: 'Réponse en attente — Infection cutanée',
      excerpt: "Recommandation d'antibiothérapie locale et surveillance. Pourrait être un impétigo.",
      tags: ['Dermato', 'En attente'],
      hasImage: false,
      imageUrl: '',
      commentCount: 2,
      likeCount: 5,
      status: 'pending',
      author: {
        id: user?.id ?? 'expert-demo',
        name: 'Moi',
        avatar: 'https://ui-avatars.com/api/?name=Moi',
        specialty: 'Dermatologie',
      },
      createdAt: Date.now() - 1000 * 60 * 60 * 3,
    },
  ];

  useEffect(() => {
    if (!user) return;
    const all = getCases()
      .filter((c) => c.author?.id === user.id)
      .map((c) => ({
        ...c,
        status: (c as any).status ?? 'pending',
        author: {
          ...c.author,
          avatar: c.author.avatar ?? 'https://ui-avatars.com/api/?name=' + encodeURIComponent(c.author.name),
          specialty: c.author.specialty ?? 'Expert',
        },
      })) as (StoredCase & { status: 'pending' | 'accepted' | 'rejected' })[];
    setResponses(all.length ? all : sampleResponses);
  }, [user]);

  const handleDelete = (id: string) => {
    if (!user) return;
    const ok = confirm('Supprimer définitivement cette réponse ?');
    if (!ok) return;
    deleteCaseById(id, user.id);
    const remaining = getCases()
      .filter((c) => c.author?.id === user.id)
      .map((c) => ({
        ...c,
        status: (c as any).status ?? 'pending',
        author: {
          ...c.author,
          avatar: c.author.avatar ?? 'https://ui-avatars.com/api/?name=' + encodeURIComponent(c.author.name),
          specialty: c.author.specialty ?? 'Expert',
        },
      })) as (StoredCase & { status: 'pending' | 'accepted' | 'rejected' })[];
    setResponses(remaining.length ? remaining : sampleResponses);
  };

  const visible = responses.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const renderStatusBadge = (status: 'pending' | 'accepted' | 'rejected') => {
    const config = {
      pending: { bg: 'from-yellow-100 to-yellow-200', text: 'text-yellow-800', label: 'En attente' },
      accepted: { bg: 'from-green-100 to-green-200', text: 'text-green-800', label: 'Acceptée' },
      rejected: { bg: 'from-red-100 to-red-200', text: 'text-red-800', label: 'Rejetée' },
    };
    const c = config[status];
    return (
      <span className={`px-3 py-1 rounded-full font-semibold text-xs bg-gradient-to-r ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#009688] tracking-tight leading-tight">
          Mes réponses
        </h1>
        <Link
          to="/case/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e0f7fa] text-[#009688] font-medium shadow-sm border border-[#b2dfdb] hover:bg-[#b2ebf2] transition"
        >
          <PlusCircleIcon size={18} />
          Nouvelle réponse
        </Link>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'accepted', label: 'Acceptées' },
          { key: 'pending', label: 'En attente' },
          { key: 'rejected', label: 'Rejetées' },
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

      <div className="space-y-4">
        {visible.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <FileTextIcon size={36} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">Aucune réponse à afficher.</p>
          </div>
        ) : (
          visible.map((r) => {
            let borderColor = "border-l-4 border-[#b2dfdb]";
            if (r.status === "pending") borderColor = "border-l-4 border-yellow-100";
            else if (r.status === "rejected") borderColor = "border-l-4 border-red-100";
            else if (r.status === "accepted") borderColor = "border-l-4 border-green-100";

            return (
              <article
                key={r.id}
                onClick={() => navigate(`/case/${r.id}`)}
                className={`group bg-white ${borderColor} rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 overflow-hidden flex flex-col md:flex-row cursor-pointer relative p-0`}
              >
                {r.hasImage && r.imageUrl ? (
                  <img
                    src={r.imageUrl}
                    alt={r.title}
                    className="w-full md:w-48 h-32 md:h-40 object-cover rounded-l-xl border-r border-gray-100"
                  />
                ) : (
                  <div className="w-full md:w-48 h-32 md:h-40 bg-gray-50 flex items-center justify-center text-gray-200 rounded-l-xl border-r border-gray-100">
                    <CheckCircle size={32} />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between p-6 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-[#00A7A7] transition-colors">
                      {r.title || 'Sans titre'}
                    </h3>
                    {renderStatusBadge(r.status)}
                  </div>
                  <p className="text-sm text-gray-400 mt-1 mb-2 line-clamp-2 font-light">
                    {r.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(r.tags || []).slice(0, 3).map((t, idx) => (
                      <span
                        key={t}
                        className="flex items-center gap-1 text-xs border px-2 py-0.5 rounded-full font-normal bg-teal-50 text-teal-600 border-teal-100"
                      >
                        <TagIcon size={11} />
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4 text-gray-400">
                      <span className="flex items-center gap-1 text-xs">
                        <MessageSquareIcon size={13} />
                        <span className="font-medium">{r.commentCount ?? 0}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <HeartIcon size={13} />
                        <span className="font-medium">{r.likeCount ?? 0}</span>
                      </span>
                    </div>
                    <span className="italic text-xs text-gray-300">
                      {new Date(r.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 p-6 bg-white border-l border-gray-50 z-10 min-w-[60px]">
                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/case/${r.id}`); }}
                    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm transition"
                    title="Voir"
                  >
                    <EyeIcon size={16} />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/case/new?edit=${r.id}`); }}
                    className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 shadow-sm transition"
                    title="Modifier"
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(r.id); }}
                    className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 shadow-sm transition"
                    title="Supprimer"
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