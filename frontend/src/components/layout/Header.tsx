import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, MessageCircleIcon, SearchIcon, MenuIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
export const Header = () => {
  const {
    user
  } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center md:hidden">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden md:block flex-1">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm" placeholder="Rechercher des cas, experts..." type="search" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
              <BellIcon className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
              <MessageCircleIcon className="h-6 w-6" />
            </button>
            {user && <Link to="/profile/1" className="flex items-center">
                <img className="h-8 w-8 rounded-full object-cover border-2 border-blue-500" src={user.avatar} alt={user.name} />
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {user.name}
                </span>
              </Link>}
          </div>
        </div>
      </div>
    </header>;
};