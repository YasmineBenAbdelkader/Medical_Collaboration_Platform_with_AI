import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Users2Icon, BrainCircuitIcon, UserIcon, LogOutIcon, FileTextIcon, SettingsIcon, BellIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      path: '/',
      label: 'Tableau de bord',
      icon: <HomeIcon size={20} />,
      description: 'Vue d\'ensemble'
    },
    {
      path: '/case/new',
      label: 'Nouveau cas',
      icon: <FileTextIcon size={20} />,
      description: 'Créer un cas'
    },
    {
      path: '/experts',
      label: 'Experts',
      icon: <Users2Icon size={20} />,
      description: 'Annuaire des experts'
    },
    {
      path: '/ai-assistant',
      label: 'Assistant IA',
      icon: <BrainCircuitIcon size={20} />,
      description: 'Intelligence artificielle'
    },
    {
      path: `/profile/${user?.id}`,
      label: 'Mon profil',
      icon: <UserIcon size={20} />,
      description: 'Gérer mon profil'
    }
  ];

  return (
    <div className="hidden md:flex flex-col w-72 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg">
      {/* Header avec logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-200 bg-white">
        <Link to="/" className="flex items-center group">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <BrainCircuitIcon size={28} />
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              MedCollab
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Collaboration médicale</p>
          </div>
        </Link>
      </div>

      {/* Navigation principale */}
      <div className="flex flex-col justify-between h-full py-6">
        <nav className="px-4 space-y-2">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive(item.path) 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm' 
                  : 'text-gray-700 hover:bg-white hover:shadow-md hover:border hover:border-gray-200'
              }`}
            >
              <span className={`p-1.5 rounded-lg transition-all duration-200 ${
                isActive(item.path) 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-500 group-hover:bg-gray-100 group-hover:text-gray-700'
              }`}>
                {item.icon}
              </span>
              <div className="ml-3 flex-1">
                <span className="block font-medium">{item.label}</span>
                <span className={`text-xs ${
                  isActive(item.path) ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  {item.description}
                </span>
              </div>
              {isActive(item.path) && (
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Section inférieure */}
        <div className="px-4 space-y-4">
          {/* Notifications */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-1.5 bg-amber-100 rounded-lg">
                  <BellIcon size={16} className="text-amber-600" />
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-amber-800">3 notifications</p>
                  <p className="text-xs text-amber-600">Nouveaux cas urgents</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Profil utilisateur */}
          {user?.role === 'doctor' && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <UserIcon size={20} className="text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-blue-800">Mode Médecin</p>
                  <p className="text-xs text-blue-600">{user.specialty}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-white text-blue-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">
                  <SettingsIcon size={12} className="inline mr-1" />
                  Paramètres
                </button>
                <button className="flex-1 bg-white text-blue-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">
                  <BellIcon size={12} className="inline mr-1" />
                  Alertes
                </button>
              </div>
            </div>
          )}

          {/* Bouton déconnexion */}
          <button 
            onClick={() => logout()} 
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group"
          >
            <div className="p-1.5 rounded-lg group-hover:bg-red-100 transition-colors">
              <LogOutIcon size={18} className="text-gray-500 group-hover:text-red-500" />
            </div>
            <span className="ml-3">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
};