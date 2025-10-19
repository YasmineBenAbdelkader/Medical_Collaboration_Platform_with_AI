import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  // Avatar pour l'admin
  const avatarUrl = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
        
        {/* Barre de recherche */}
        <div className="flex items-center flex-1">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-300 transition"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
            <Bell className="h-5 w-5 text-purple-500" />
          </button>
          
          {/* Profil admin */}
          <Link to="/profil" className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
                Yassmine 
              </span>
              <span className="text-xs text-gray-500">Administrateur</span>
            </div>
            <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-purple-300">
              <img src={avatarUrl} alt="Admin Principal" className="h-full w-full object-cover" />
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
}
