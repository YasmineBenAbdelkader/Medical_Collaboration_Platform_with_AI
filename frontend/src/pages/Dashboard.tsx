import { useEffect, useState } from 'react';
import { CaseCard } from '../components/ui/CaseCard';
import { FilterIcon, PlusCircleIcon, TrendingUpIcon, ClockIcon, UsersIcon, MessageCircleIcon, StarIcon, Trash2Icon, MoreVerticalIcon, PencilIcon, CheckIcon, XIcon, SendIcon, UserPlusIcon, Activity as ActivityIcon, HeartPulse as HeartPulseIcon, AlertTriangle as AlertTriangleIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCases, seedCasesIfEmpty, deleteCaseById } from '../services/storage';
import type { StoredCase } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard = () => {
  const [cases, setCases] = useState<StoredCase[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'urgent' | 'resolved'>('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  const refresh = () => setCases(getCases());

  useEffect(() => {
    seedCasesIfEmpty();
    refresh();
  }, []);

  const formatRelative = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Hier';
    return `Il y a ${days} jours`;
  };

  // Données pour la sidebar
  const stats = {
    totalCases: cases.length,
    urgentCases: cases.filter(c => c.isUrgent).length,
    resolvedCases: cases.filter(c => c.isResolved).length,
    activeExperts: 23
  };

  const recentActivity = [
    { id: 1, text: 'Dr. Dubois a commenté sur un cas cardiologique', time: '2 min' },
    { id: 2, text: 'Nouveau cas urgent en dermatologie', time: '15 min' },
    { id: 3, text: 'Dr. Moreau a résolu un cas pédiatrique', time: '1h' },
    { id: 4, text: '5 nouveaux experts ont rejoint la plateforme', time: '2h' }
  ];

  const onlineExperts = [
    { id: 1, name: 'Dr. Thomas Dubois', specialty: 'Cardiologie', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Dr. Marie Laurent', specialty: 'Dermatologie', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Dr. Antoine Moreau', specialty: 'Pédiatrie', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 4, name: 'Dr. Sophie Martin', specialty: 'Neurologie', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
  ];

  const handleDelete = (id: string, ownerId: string) => {
    if (!user || user.id !== ownerId) return;
    const ok = confirm('Supprimer cette publication ? Cette action est irréversible.');
    if (!ok) return;
    const success = deleteCaseById(id, user.id);
    if (success) refresh();
    setOpenMenuId(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/case/new?edit=${id}`);
    setOpenMenuId(null);
  };

  return (
    <div className="flex max-w-7xl mx-auto">
      {/* Contenu principal */}
      <div className="flex-1 pr-6">
        <div className="flex items-center justify-between mb-8">
          {/* Titre stylisé */}
          <h1 className="text-3xl font-extrabold flex items-center tracking-tight">
            <span className="inline-block w-1.5 h-8 bg-[#00A7A7] rounded-full mr-3 shadow-sm"></span>
            <span className="bg-gradient-to-r from-[#00A7A7] to-teal-800 bg-clip-text text-transparent">
              Accueil
            </span>
          </h1>
          {/* Bouton Nouveau cas */}
          <Link 
            to="/case/new" 
            className="relative group inline-flex items-center px-5 py-2.5 rounded-xl text-white bg-[#00A7A7] shadow-md hover:shadow-lg transition-all duration-200 hover:bg-[#008f8f]"
          >
            <PlusCircleIcon size={20} className="mr-2 transition-transform group-hover:rotate-90" />
            <span className="font-medium">Nouveau cas</span>
            <span className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-white/30 transition"></span>
          </Link>
        </div>

        {/* En-tête Cardiologie */}
        <div className="relative mb-4 overflow-hidden rounded-xl border border-[#00A7A7]/40 bg-gradient-to-r from-[#00A7A7] via-teal-600 to-rose-500 shadow-md">
          <div className="absolute inset-0 opacity-40">
            <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polyline 
                fill="none" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className="animate-ecg"
                points="0,100 80,100 100,40 120,160 140,100 220,100 240,60 260,140 280,100 360,100 380,30 400,170 420,100 520,100 540,50 560,150 580,100 800,100" 
              />
            </svg>
          </div>
          <div className="relative z-10 p-4 sm:p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <HeartPulseIcon size={22} className="text-white drop-shadow animate-pulse" />
              <span className="uppercase text-xs tracking-widest opacity-80">MedCollab</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight drop-shadow">
              Cardiologie
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl">
              Partagez vos cas cliniques, demandez l’avis d’experts et utilisez l’IA pour vous accompagner dans vos décisions cardiologiques.
            </p>
          </div>
        </div>

        <style>{`
          @keyframes ecg {
            0% { stroke-dashoffset: 1000; filter: drop-shadow(0 0 4px #fff); }
            50% { filter: drop-shadow(0 0 8px #00ffff); }
            100% { stroke-dashoffset: -1000; filter: drop-shadow(0 0 4px #fff); }
          }
          .animate-ecg { animation: ecg 3s linear infinite; }
        `}</style>

        {/* Filtres */}
        <div className="bg-white rounded-xl border border-[#00A7A7]/30 p-4 mb-6 shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
            <span className="inline-block w-1.5 h-5 bg-[#00A7A7] rounded-full mr-2"></span>
            Affinez votre sélection
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full border ${
                filter === 'all' ? 'border-[#00A7A7] bg-[#00A7A7]/20 text-[#00A7A7]' : 'border-[#00A7A7]/50 bg-[#00A7A7]/10 text-[#00A7A7]'
              } font-medium text-sm hover:bg-[#00A7A7]/20 hover:scale-105 transition`}
            >
              Tous les cas
            </button>
            <button
              onClick={() => setFilter('urgent')}
              className={`px-4 py-2 rounded-full border ${
                filter === 'urgent' ? 'border-red-400 bg-red-100 text-red-600' : 'border-red-400/50 bg-red-50 text-red-600'
              } font-medium text-sm hover:bg-red-100 hover:scale-105 transition`}
            >
              Cas urgents
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-full border ${
                filter === 'resolved' ? 'border-green-400 bg-green-100 text-green-600' : 'border-green-400/50 bg-green-50 text-green-600'
              } font-medium text-sm hover:bg-green-100 hover:scale-105 transition`}
            >
              Cas résolus
            </button>
          </div>
        </div>

        {/* Cases */}
        <div className="space-y-4">
          {cases.filter(c => {
            if (filter === 'all') return true;
            if (filter === 'urgent') return c.isUrgent;
            if (filter === 'resolved') return c.isResolved;
            return true;
          }).map(c => (
            <div key={c.id} className="relative group">
              {user && user.id === c.author.id && (
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === c.id ? null : c.id)}
                    title="Options de la publication"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white/90 backdrop-blur shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600/40 opacity-0 group-hover:opacity-100 transition"
                  >
                    <MoreVerticalIcon size={18} className="text-gray-600" />
                  </button>
                  {openMenuId === c.id && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-10">
                      <button
                        onClick={() => handleEdit(c.id)}
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <PencilIcon size={16} className="mr-2 text-gray-500" />
                        Modifier la publication
                      </button>
                      <div className="my-1 h-px bg-gray-100"></div>
                      <button
                        onClick={() => handleDelete(c.id, c.author.id)}
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2Icon size={16} className="mr-2" />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              )}
              <CaseCard
                id={c.id}
                title={c.title}
                excerpt={c.excerpt}
                author={c.author}
                date={formatRelative(c.createdAt)}
                commentCount={c.commentCount}
                likeCount={c.likeCount}
                hasImage={c.hasImage}
                imageUrl={c.imageUrl}
                tags={c.tags}
                isUrgent={c.isUrgent}
                isResolved={c.isResolved}
              />
            </div>
          ))}
          {cases.filter(c => {
            if (filter === 'all') return true;
            if (filter === 'urgent') return c.isUrgent;
            if (filter === 'resolved') return c.isResolved;
            return true;
          }).length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-2">Aucun cas à afficher pour le moment.</p>
            </div>
          )}
        </div>
      </div>
      {/* Sidebar droite  */}
      <div className="w-80 flex-shrink-0 space-y-6">
        {/* Activité récente */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <ClockIcon size={20} className="text-teal-500" />
            Activité récente
          </h3>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 bg-teal-400 rounded-full mt-1 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experts en ligne */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <UsersIcon size={20} className="text-teal-500" />
            Experts en ligne
          </h3>
          <div className="space-y-4">
            {onlineExperts.map(expert => (
              <div key={expert.id} className="flex items-center gap-4 hover:bg-gray-50 rounded-xl p-2 transition">
                <div className="relative flex-shrink-0">
                  <img 
                    src={expert.avatar} 
                    alt={expert.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border border-white rounded-full"></span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{expert.name}</p>
                  <p className="text-xs text-gray-500">{expert.specialty}</p>
                </div>
                <button className="text-teal-500 hover:text-teal-600 transition">
                  <MessageCircleIcon size={18} />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-teal-600 font-medium rounded-xl bg-teal-50 hover:bg-teal-100 transition">
            Voir tous les experts
          </button>
        </div>

        {/* Conseils IA */}
        <div className="bg-white rounded-3xl border border-teal-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <StarIcon size={20} className="text-teal-500" />
            Conseil IA
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Vous avez 3 cas cardiologiques en attente. L'assistant IA peut vous aider à analyser les ECG et suggérer des diagnostics.
          </p>
          <Link 
            to="/ai-assistant" 
            className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800 transition"
          >
            Utiliser l'IA →
          </Link>
        </div>
      </div>


    </div>
  );
};
