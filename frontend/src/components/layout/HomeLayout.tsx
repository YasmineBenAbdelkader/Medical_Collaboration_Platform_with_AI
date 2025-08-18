import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Home, FileText, Users, BrainCircuit, LogOut, Settings, Menu, X, User } from 'lucide-react';
export const Layout = () => {
  const {
    theme,
    specialty
  } = useTheme();
  const {
    user,
    logout
  } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = [{
    name: 'Tableau de bord',
    href: '/dashboard',
    icon: Home
  }, {
    name: 'Cas cliniques',
    href: '/dashboard/cases',
    icon: FileText
  }, {
    name: 'Experts',
    href: '/dashboard/experts',
    icon: Users
  }, {
    name: 'Assistant IA',
    href: '/dashboard/ai-assistant',
    icon: BrainCircuit
  }, {
    name: 'Changer de service',
    href: '/dashboard/service-selector',
    icon: Settings
  }];
  return <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 flex z-40 lg:hidden`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold">
                MedCollab<span className={theme.accent}>IA</span>
              </h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map(item => <Link key={item.name} to={item.href} className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <item.icon className="mr-4 h-6 w-6 text-gray-400" />
                  {item.name}
                </Link>)}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-700">
                  {user?.name}
                </p>
                <button onClick={logout} className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
                  <LogOut className="h-4 w-4 mr-1" />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold">
                  MedCollab<span className={theme.accent}>IA</span>
                </h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map(item => <Link key={item.name} to={item.href} className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                    <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                    {item.name}
                  </Link>)}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </p>
                  <button onClick={logout} className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center">
                    <LogOut className="h-3.5 w-3.5 mr-1" />
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button type="button" className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>;
};