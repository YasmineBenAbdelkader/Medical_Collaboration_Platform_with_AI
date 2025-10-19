import { useEffect, useState } from 'react';
import { CaseCard } from '../components/ui/CaseCard';
import { 
  MoreVerticalIcon,
  ClockIcon,
  UsersIcon,
  MessageCircleIcon,
  StarIcon,
  HeartPulse as HeartPulseIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCases, seedCasesIfEmpty, deleteCaseById } from '../services/storage';
import type { StoredCase } from '../services/storage';

export const DashboardExpert = () => {
  const [cases, setCases] = useState<StoredCase[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'urgent' | 'resolved'>('all');
  const navigate = useNavigate();

  const user = { role: 'expert', name: 'Dr. Expert Martin', id: 'expert1' };

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

  const recentActivity = [
    { id: 1, text: 'Vous avez répondu à un cas urgent en neurologie', time: '2 min' },
    { id: 2, text: 'Nouveau cas en cardiologie vous attend', time: '15 min' },
    { id: 3, text: 'Votre réponse a été marquée comme solution dans un cas pédiatrique', time: '1h' },
    { id: 4, text: '3 nouveaux cas ont été assignés à votre expertise', time: '2h' }
  ];

  const onlineDoctors = [
    { id: 1, name: 'Dr. Thomas Dubois', specialty: 'Cardiologie', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Dr. Marie Laurent', specialty: 'Dermatologie', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Dr. Antoine Moreau', specialty: 'Pédiatrie', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 4, name: 'Dr. Jean Petit', specialty: 'Neurologie', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
  ];

  const handleDelete = (id: string) => {
    const ok = confirm('Supprimer cette publication ? Cette action est irréversible.');
    if (!ok) return;
    deleteCaseById(id, user.id);
    refresh();
    setOpenMenuId(null);
  };

  const filteredCases = cases.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'urgent') return c.isUrgent;
    if (filter === 'resolved') return c.isResolved;
    return true;
  });

  return (
    <div className="flex max-w-8xl mx-auto">
      {/* Contenu principal */}
      <div className="flex-1 pr-6">
        {/* Header expert */}
        <div className="relative mb-4 overflow-hidden rounded-xl border border-[#00A7A7]/40 bg-gradient-to-r from-teal-500 via-teal-600 to-purple-600 shadow-md">
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
              <span className="uppercase text-xs tracking-widest opacity-80">Medico</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight drop-shadow">Cardiologie</h2>
            <p className="text-white/80 text-sm sm:text-base mt-1">
              Consultez des cas cliniques et proposez des solutions.
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
        <div className="bg-white rounded-xl border border-[#00A7A7]/30 p-2 mb-2 shadow-sm flex flex-wrap gap-3">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full border ${filter==='all' ? 'border-[#00A7A7] bg-[#00A7A7]/20 text-[#00A7A7]' : 'border-[#00A7A7]/50 bg-[#00A7A7]/10 text-[#00A7A7]'} font-medium text-sm hover:bg-[#00A7A7]/20 transition`}>Tous les cas</button>
          <button onClick={() => setFilter('urgent')} className={`px-4 py-2 rounded-full border ${filter==='urgent' ? 'border-red-400 bg-red-100 text-red-600' : 'border-red-400/50 bg-red-50 text-red-600'} font-medium text-sm hover:bg-red-100 transition`}>Cas urgents</button>
          <button onClick={() => setFilter('resolved')} className={`px-4 py-2 rounded-full border ${filter==='resolved' ? 'border-green-400 bg-green-100 text-green-600' : 'border-green-400/50 bg-green-50 text-green-600'} font-medium text-sm hover:bg-green-100 transition`}>Cas résolus</button>
        </div>

        {/* Cases */}
        <div className="space-y-4">
          {filteredCases.map(c => (
            <div key={c.id} className="relative group">
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => setOpenMenuId(openMenuId===c.id ? null : c.id)} className="p-2 rounded-full bg-white shadow hover:bg-gray-50">
                  <MoreVerticalIcon size={18} />
                </button>
              </div>
              <CaseCard {...c} date={formatRelative(c.createdAt)} />
            </div>
          ))}
          {filteredCases.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-2">Aucun cas à afficher pour le moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar droite */}
      <div className="w-80 flex-shrink-0 space-y-6">
        {/* Activité récente */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <ClockIcon size={20} className="text-teal-500" /> Activité récente
          </h3>
          <div className="space-y-4">
            {recentActivity.map(a => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 bg-teal-400 rounded-full mt-1 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Médecins en ligne */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <UsersIcon size={20} className="text-teal-500" /> Médecins en ligne
          </h3>
          <div className="space-y-4">
            {onlineDoctors.map(doc => (
              <div key={doc.id} className="flex items-center gap-4 hover:bg-gray-50 rounded-xl p-2 transition">
                <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.specialty}</p>
                </div>
                <button className="text-teal-500 hover:text-teal-600 transition">
                  <MessageCircleIcon size={18} />
                </button>
              </div>
            ))}
          </div>
          <Link to="/experts">
            <button className="w-full mt-4 py-2 text-sm text-teal-600 font-medium rounded-xl bg-teal-50 hover:bg-teal-100 transition">
              Voir tous les médecins
            </button>
          </Link>
        </div>

        {/* Conseils IA */}
        <div className="bg-white rounded-3xl border border-teal-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <StarIcon size={20} className="text-teal-500" /> Conseils IA
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            L'IA a identifié 2 cas complexes qui pourraient bénéficier de votre expertise.
          </p>
          <Link to="/ai-assistant" className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800 transition">
            Consulter les suggestions →
          </Link>
        </div>
      </div>
    </div>
  );
};
