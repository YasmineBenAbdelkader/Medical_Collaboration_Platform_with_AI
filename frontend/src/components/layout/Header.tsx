import React from 'react';
import { Bell, Search, UserPlus, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Barre de recherche */}
        <div className="flex items-center flex-1">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Invitations */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <UserPlus className="h-6 w-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profil utilisateur */}
          <a href="/profil" className="flex items-center">
            <div className="hidden md:flex flex-col items-end mr-3">
              <span className="text-sm font-medium text-gray-900">
                Dr. Sophie Martin
              </span>
              <span className="text-xs text-gray-500">Cardiologie</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}