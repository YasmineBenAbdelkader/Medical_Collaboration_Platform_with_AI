// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  FileText, 
  MessageCircle, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

export const DashboardAdmin = () => {
  // const { user } = useAuth();

  // Simulation d'un utilisateur admin pour l'affichage statique
  // const user = { role: 'admin', name: 'Admin System' };

  const stats = [
    { label: 'Utilisateurs totaux', value: '1,247', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Cas médicaux', value: '89', icon: FileText, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Discussions actives', value: '156', icon: MessageCircle, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Taux de résolution', value: '94%', icon: TrendingUp, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const recentActivities = [
    { id: 1, text: 'Nouveau médecin inscrit: Dr. Marie Dubois', time: '2 min', type: 'user' },
    { id: 2, text: 'Cas urgent signalé en cardiologie', time: '15 min', type: 'urgent' },
    { id: 3, text: 'Expert validé: Dr. Antoine Moreau', time: '1h', type: 'expert' },
    { id: 4, text: 'Système de sauvegarde terminé', time: '2h', type: 'system' },
  ];

  const systemAlerts = [
    { id: 1, message: 'Espace disque à 85%', severity: 'warning', icon: AlertTriangle },
    { id: 2, message: 'Sauvegarde réussie', severity: 'success', icon: CheckCircle },
    { id: 3, message: 'Mise à jour disponible', severity: 'info', icon: Clock },
  ];

  return (
    <div className="flex max-w-7xl mx-auto p-6">
      {/* Contenu principal */}
      <div className="flex-1 pr-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold flex items-center tracking-tight">
            <span className="inline-block w-1.5 h-8 bg-red-500 rounded-full mr-3 shadow-sm"></span>
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Administration
            </span>
          </h1>
        </div>

        {/* En-tête admin */}
        <div className="relative mb-6 overflow-hidden rounded-xl border border-red-400/40 bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-md">
          <div className="absolute inset-0 opacity-40">
            <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polyline 
                fill="none" 
                stroke="white" 
                strokeWidth="3" 
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className="animate-pulse"
                points="0,100 80,100 100,40 120,160 140,100 220,100 240,60 260,140 280,100 360,100 380,30 400,170 420,100 520,100 540,50 560,150 580,100 800,100" 
              />
            </svg>
          </div>
          <div className="relative z-10 p-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={22} className="drop-shadow animate-pulse" />
              <span className="uppercase text-xs tracking-widest opacity-80">MedCollab Admin</span>
            </div>
            <h2 className="text-xl font-bold">Tableau de bord administrateur</h2>
            <p className="text-white/80 text-sm mt-1">
              Gérez les utilisateurs, surveillez l'activité et maintenez la plateforme.
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alertes système */}
        <div className="bg-white rounded-xl border p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" />
            Alertes système
          </h3>
          <div className="space-y-3">
            {systemAlerts.map(alert => {
              const Icon = alert.icon;
              return (
                <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-lg ${
                  alert.severity === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                  alert.severity === 'success' ? 'bg-green-50 border border-green-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    alert.severity === 'warning' ? 'text-yellow-600' :
                    alert.severity === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                  <span className="text-sm text-gray-700">{alert.message}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activité récente */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-teal-500" />
            Activité récente
          </h3>
          <div className="space-y-4">
            {recentActivities.map(activity => (
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
      </div>

      {/* Sidebar droite */}
      <div className="w-80 flex-shrink-0 space-y-6">
        {/* Actions rapides */}
        <div className="bg-white rounded-3xl border p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-red-500" />
            Actions rapides
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition text-sm font-medium text-blue-700">
              Gérer les utilisateurs
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition text-sm font-medium text-green-700">
              Modérer les cas
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition text-sm font-medium text-purple-700">
              Configurer le système
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition text-sm font-medium text-orange-700">
              Rapports d'activité
            </button>
          </div>
        </div>

        {/* Statut système */}
        <div className="bg-white rounded-3xl border p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-green-500" />
            Statut système
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Serveur</span>
              <span className="text-sm text-green-600 font-medium">En ligne</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Base de données</span>
              <span className="text-sm text-green-600 font-medium">Opérationnelle</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">IA Service</span>
              <span className="text-sm text-green-600 font-medium">Actif</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Notifications</span>
              <span className="text-sm text-green-600 font-medium">Fonctionnelles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
