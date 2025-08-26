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
    resolvedCases: 142,
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
    // TODO: brancher vers une vraie page d'édition avec pré-remplissage
    navigate(`/case/new?edit=${id}`);
    setOpenMenuId(null);
  };

  type ConnectionRequest = {
    id: string;
    name: string;
    role: 'Étudiant' | 'Médecin' | 'Expert';
    specialty?: string;
    avatar: string;
    message?: string;
    since: string;
  };

  type SentRequest = {
    id: string;
    name: string;
    role: 'Étudiant' | 'Médecin' | 'Expert';
    specialty?: string;
    avatar: string;
    status: 'en_attente' | 'acceptée' | 'refusée';
    sentAt: string;
  };

  const [receivedRequests, setReceivedRequests] = useState<ConnectionRequest[]>([
    {
      id: 'r1',
      name: 'Amine El Idrissi',
      role: 'Étudiant',
      specialty: '6ème année Médecine',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
      message: 'Demande de connexion pour suivre vos cas cardiologiques',
      since: "Il y a 5 min"
    },
    {
      id: 'r2',
      name: 'Dr. Salma Rahimi',
      role: 'Médecin',
      specialty: 'Dermatologie',
      avatar: 'https://images.unsplash.com/photo-1548898263-2f8a9d5b77f4?q=80&w=300&auto=format&fit=crop',
      message: 'Souhaite collaborer sur des cas multi-disciplinaires',
      since: 'Il y a 1 h'
    }
  ]);

  const [sentRequests, setSentRequests] = useState<SentRequest[]>([
    {
      id: 's1',
      name: 'Dr. Youssef B.',
      role: 'Expert',
      specialty: 'Électrophysiologie',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=300&auto=format&fit=crop',
      status: 'en_attente',
      sentAt: 'Hier'
    },
    {
      id: 's2',
      name: 'Dr. Nadia K.',
      role: 'Médecin',
      specialty: 'Radiologie',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop',
      status: 'acceptée',
      sentAt: 'Il y a 2 j'
    },
    {
      id: 's3',
      name: 'Omar S.',
      role: 'Étudiant',
      specialty: 'Interne',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300&auto=format&fit=crop',
      status: 'refusée',
      sentAt: 'Il y a 3 j'
    }
  ]);

  const acceptRequest = (id: string) => {
    setReceivedRequests(prev => prev.filter(r => r.id !== id));
  };

  const rejectRequest = (id: string) => {
    setReceivedRequests(prev => prev.filter(r => r.id !== id));
  };

  const cancelSentRequest = (id: string) => {
    setSentRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="flex max-w-7xl mx-auto">
      {/* Contenu principal */}
      <div className="flex-1 pr-6">
      {/* En-tête Cardiologie */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-500 shadow-lg hover:shadow-2xl transition-shadow duration-300">
         {/* Background SVG avec opacité et légère animation */}
        <div className="absolute inset-0 opacity-20 animate-pulse-slow">
          <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <polyline 
              fill="none" 
              stroke="white" 
              strokeWidth="3" 
              points="0,100 80,100 100,40 120,160 140,100 220,100 240,60 260,140 280,100 360,100 380,30 400,170 420,100 520,100 540,50 560,150 580,100 800,100" 
            />
          </svg>
        </div>

        <div className="relative z-10 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Texte principal */}
          <div className="sm:max-w-lg">
            <div className="flex items-center mb-2">
              <HeartPulseIcon size={24} className="mr-3 text-white animate-pulse" />
              <span className="uppercase text-xs tracking-wider font-medium text-white/90">Service</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-2">Cardiologie</h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Partagez vos cas, inspirez vos collègues et améliorez les diagnostics.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-3 mb-2">
          Cardiologie
        </h2>
        <div className="flex flex-wrap gap-2">
          <button className="bg-teal-600/10 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">Tous les cas</button>
          <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-teal-600/10 hover:text-teal-600">cas Urgent</button>
          <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-teal-600/10 hover:text-teal-600">Cas résolus</button>
        </div>
      </div>


      {/* Demandes de connexion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Reçues */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <UserPlusIcon size={20} className="mr-2 text-teal-600" />
              Demandes de connexion reçues
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-teal-600/10 text-teal-600">{receivedRequests.length}</span>
          </div>
          <div className="space-y-3">
            {receivedRequests.length === 0 && (
              <p className="text-sm text-gray-500">Aucune demande en attente.</p>
            )}
            {receivedRequests.map(req => (
              <div key={req.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{req.name} <span className="text-xs text-gray-500">• {req.role}</span></p>
                    <p className="text-xs text-gray-500">{req.specialty}</p>
                    {req.message && <p className="text-xs text-gray-600 mt-0.5">{req.message}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => acceptRequest(req.id)} className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
                    <CheckIcon size={14} className="mr-1" />
                    Accepter
                  </button>
                  <button onClick={() => rejectRequest(req.id)} className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100">
                    <XIcon size={14} className="mr-1" />
                    Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Envoyées */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <SendIcon size={20} className="mr-2 text-teal-600" />
              Demandes envoyées
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-teal-600/10 text-teal-600">{sentRequests.length}</span>
          </div>
          <div className="space-y-3">
            {sentRequests.length === 0 && (
              <p className="text-sm text-gray-500">Aucune demande envoyée.</p>
            )}
            {sentRequests.map(req => (
              <div key={req.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{req.name} <span className="text-xs text-gray-500">• {req.role}</span></p>
                    <p className="text-xs text-gray-500">{req.specialty}</p>
                    <p className="text-xs mt-0.5">
                      <span className={
                        req.status === 'en_attente' ? 'text-amber-600' : req.status === 'acceptée' ? 'text-green-600' : 'text-red-600'
                      }>
                        {req.status === 'en_attente' ? 'En attente' : req.status === 'acceptée' ? 'Acceptée' : 'Refusée'}
                      </span>
                      <span className="text-gray-400"> • {req.sentAt}</span>
                    </p>
                  </div>
                </div>
                {req.status === 'en_attente' && (
                  <button onClick={() => cancelSentRequest(req.id)} className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">
                    Annuler
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
        
      <div className="space-y-4">
          {cases.map(c => (
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
              />
            </div>
          ))}
          {cases.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-2">Aucun cas à afficher pour le moment.</p>
              <Link to="/case/new" className="text-teal-600 hover:text-teal-700 font-medium">Publier un premier cas →</Link>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar droite */}
      <div className="w-80 flex-shrink-0">
        <div className="space-y-6">
          {/* Statistiques */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <TrendingUpIcon size={20} className="mr-2 text-teal-600" />
              Statistiques
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total des cas</span>
                <span className="font-semibold text-gray-900">{stats.totalCases}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cas urgents</span>
                <span className="font-semibold text-red-600">{stats.urgentCases}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cas résolus</span>
                <span className="font-semibold text-green-600">{stats.resolvedCases}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Experts actifs</span>
                <span className="font-semibold text-teal-600">{stats.activeExperts}</span>
              </div>
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <ClockIcon size={20} className="mr-2 text-teal-600" />
              Activité récente
            </h3>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">Il y a {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experts en ligne */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <UsersIcon size={20} className="mr-2 text-teal-600" />
              Experts en ligne
            </h3>
            <div className="space-y-3">
              {onlineExperts.map(expert => (
                <div key={expert.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={expert.avatar} 
                      alt={expert.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{expert.name}</p>
                    <p className="text-xs text-gray-500">{expert.specialty}</p>
                  </div>
                  <button className="text-teal-600 hover:text-teal-700">
                    <MessageCircleIcon size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium">
              Voir tous les experts
            </button>
          </div>

          {/* Conseils IA */}
          <div className="bg-white rounded-lg border border-teal-600/30 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <StarIcon size={20} className="mr-2 text-teal-600" />
              Conseil IA
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Vous avez 3 cas cardiologiques en attente. L'assistant IA peut vous aider à analyser les ECG et suggérer des diagnostics.
            </p>
            <Link 
              to="/ai-assistant" 
              className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              Utiliser l'assistant IA →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};