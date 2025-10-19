import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { 
  HomeIcon, 
  UsersIcon, 
  MessageSquareIcon, 
  BrainCircuitIcon, 
  SettingsIcon, 
  HelpCircleIcon, 
  MenuIcon, 
  XIcon,
  FileTextIcon,
  CheckCircle,
  Shield,
  BookOpen
} from 'lucide-react';
import medicoLogo from '../../../public/Medico2.png';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  const isActive = (path: string) => location.pathname === path;

  // Configuration des menus par rôle
  const menuConfig = {
    medecin: [
      { icon: HomeIcon, label: 'Accueil', path: '/medecin/dashboard' },
      { icon: UsersIcon, label: 'Experts', path: '/experts' },
      { icon: FileTextIcon, label: 'Mes publications', path: '/pubs' },
      { icon: MessageSquareIcon, label: 'Discussions', path: '/discussions' },
      { icon: BrainCircuitIcon, label: 'Assistant IA', path: '/ai-assistant' }
    ],
    expert: [
      { icon: HomeIcon, label: 'Accueil', path: '/expert/dashboard' },
      { icon: CheckCircle, label: 'Mes réponses', path: '/mes-reponses' },
      { icon: MessageSquareIcon, label: 'Discussions', path: '/discussions' },
      { icon: BrainCircuitIcon, label: 'Assistant IA', path: '/ai-assistant' }
    ],
    admin: [
    
      { icon: Shield, label: 'Gestion utilisateurs', path: '/gestion-utilisateurs' },
      { icon: BookOpen, label: 'Gestion des blogs', path: '/gestion-blogs' }
    ]
  };

  // Menu secondaire (commun à tous)
  const secondaryMenu = [
    { icon: SettingsIcon, label: 'Paramètres', path: '/params' },
    { icon: HelpCircleIcon, label: 'Aide et assistance', path: '/help' }
  ];

  // Déterminer le menu à afficher selon l'URL
  let currentMenu = menuConfig.medecin; // fallback par défaut
  if (location.pathname.startsWith('/expert/dashboard')) {
    currentMenu = menuConfig.expert;
  } else if (location.pathname.startsWith('/admin/dashboard')) {
    currentMenu = menuConfig.admin;
  } else if (location.pathname.startsWith('/medecin/dashboard')) {
    currentMenu = menuConfig.medecin;
  }

  const NavItem = ({
    icon: Icon,
    label,
    to
  }: {
    icon: React.ElementType;
    label: string;
    to: string;
  }) => (
    <li>
      <Link
        to={to}
        className={`flex items-center p-3 rounded-lg transition-all font-medium text-sm ${
          isActive(to)
            ? "bg-[#00A7A7]/10 text-[#00A7A7] font-semibold shadow-sm"
            : "text-gray-700 hover:bg-[#00A7A7]/10 hover:text-[#00A7A7]"
        } ${collapsed ? "justify-center" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <Icon className={`h-5 w-5 ${isActive(to) ? "text-[#00A7A7]" : ""}`} />
        {!collapsed && <span className="ml-3">{label}</span>}
      </Link>
    </li>
  );

  return (
    <>
      {/* 🔹 Bouton mobile flottant */}
      <button 
        className="fixed z-50 bottom-4 right-4 p-3 rounded-full bg-[#00A7A7] text-white shadow-lg md:hidden" 
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
      </button>

      {/* 🖥️ Sidebar Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* 🔹 Header Logo */}
        <div
          className={`flex items-center h-20 px-4 border-b border-gray-100 ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          {!collapsed ? (
            <>
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={medicoLogo}
                  alt="Medico"
                  className="h-12 w-12 object-contain"
                />
                <span className="text-xl font-semibold text-[#00A7A7]">
                  Medico
                </span>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md hover:bg-gray-100 transition"
                title="Réduire le menu"
              >
                <MenuIcon className="h-5 w-5 text-gray-500" />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100 transition"
              title="Agrandir le menu"
            >
              <img
                src={medicoLogo}
                alt="Medico"
                className="h-8 w-8 object-contain"
              />
            </button>
          )}
        </div>

        {/* 🔹 Menu principal */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {currentMenu.map((item) => (
              <NavItem 
                key={item.path}
                icon={item.icon} 
                label={item.label} 
                to={item.path} 
              />
            ))}
          </ul>

          {/* 🔹 Section séparée */}
          <div className="pt-8 mt-8 border-t border-gray-100">
            <ul className="space-y-1">
              {secondaryMenu.map((item) => (
                <NavItem 
                  key={item.path}
                  icon={item.icon} 
                  label={item.label} 
                  to={item.path} 
                />
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* 📱 Sidebar Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* 🔹 Header mobile */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <img 
              src={medicoLogo} 
              alt="Medico" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-semibold text-[#00A7A7]">
              Medico
            </span>
          </Link>
          <button onClick={toggleMobileSidebar} className="p-1 rounded-md hover:bg-gray-100">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* 🔹 Menu mobile */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {currentMenu.map((item) => (
              <NavItem 
                key={item.path}
                icon={item.icon} 
                label={item.label} 
                to={item.path} 
              />
            ))}
          </ul>
          <div className="pt-8 mt-8 border-t border-gray-100">
            <ul className="space-y-1">
              {secondaryMenu.map((item) => (
                <NavItem 
                  key={item.path}
                  icon={item.icon} 
                  label={item.label} 
                  to={item.path} 
                />
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* 🔹 Fond sombre mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-30 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
}
