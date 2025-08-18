import { useEffect, useState } from 'react';
import { CaseCard } from '../components/ui/CaseCard';
import { FilterIcon, PlusCircleIcon, TrendingUpIcon, ClockIcon, UsersIcon, MessageCircleIcon, StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCases, seedCasesIfEmpty } from '../services/storage';
import type { StoredCase } from '../services/storage';

export const Dashboard = () => {
  const [cases, setCases] = useState<StoredCase[]>([]);

  useEffect(() => {
    seedCasesIfEmpty();
    setCases(getCases());
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

  return (
    <div className="flex max-w-7xl mx-auto">
      {/* Contenu principal */}
      <div className="flex-1 pr-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <div className="flex space-x-3">
            <button className="flex items-center text-gray-700 bg-white px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50">
              <FilterIcon size={18} className="mr-2" />
              Filtres
            </button>
            <Link to="/case/new" className="flex items-center text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
              <PlusCircleIcon size={18} className="mr-2" />
              Nouveau cas
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Votre spécialité: Cardiologie
          </h2>
          <div className="flex flex-wrap gap-2">
            <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Tous les cas
            </button>
            <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800">
              Cas urgents
            </button>
            <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800">
              Non résolus
            </button>
            <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800">
              Récemment actifs
            </button>
            <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800">
              Sauvegardés
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {cases.map(c => (
            <CaseCard
              key={c.id}
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
          ))}
          {cases.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-2">Aucun cas à afficher pour le moment.</p>
              <Link to="/case/new" className="text-blue-600 hover:text-blue-700 font-medium">Publier un premier cas →</Link>
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
              <TrendingUpIcon size={20} className="mr-2 text-blue-600" />
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
                <span className="font-semibold text-blue-600">{stats.activeExperts}</span>
              </div>
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <ClockIcon size={20} className="mr-2 text-blue-600" />
              Activité récente
            </h3>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
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
              <UsersIcon size={20} className="mr-2 text-blue-600" />
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
                  <button className="text-blue-600 hover:text-blue-700">
                    <MessageCircleIcon size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Voir tous les experts
            </button>
          </div>

          {/* Conseils IA */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <StarIcon size={20} className="mr-2 text-blue-600" />
              Conseil IA
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Vous avez 3 cas cardiologiques en attente. L'assistant IA peut vous aider à analyser les ECG et suggérer des diagnostics.
            </p>
            <Link 
              to="/ai-assistant" 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Utiliser l'assistant IA →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};