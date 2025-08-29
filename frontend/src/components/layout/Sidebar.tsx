import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  HomeIcon, FilesIcon, UsersIcon, 
  MessageSquareIcon, BrainCircuitIcon, 
  BarChartIcon, SettingsIcon, HelpCircleIcon, 
  MenuIcon, XIcon 
} from 'lucide-react';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

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
        className={`flex items-center p-3 rounded-lg transition-all text-gray-700 hover:bg-[#00A7A7]/10 hover:text-[#00A7A7] ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <Icon className="h-5 w-5" />
        {!collapsed && <span className="ml-3 font-medium">{label}</span>}
      </Link>
    </li>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="fixed z-50 bottom-4 right-4 p-2 rounded-full bg-[#00A7A7] text-white shadow-lg md:hidden" 
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* Desktop sidebar */}
      <aside className={`hidden md:flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
        <div className={`flex items-center h-16 px-4 border-b border-gray-100 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="flex items-center">
              <BrainCircuitIcon className="h-8 w-8 text-[#00A7A7]" />
              <span className="ml-2 text-lg font-semibold text-[#00A7A7]">
                MedCollab
              </span>
            </div>
          )}
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-100 transition">
            <MenuIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            <NavItem icon={HomeIcon} label="Accueil" to="/dashboard" />
            <NavItem icon={UsersIcon} label="Experts" to="/experts" />
            <NavItem icon={FilesIcon} label="Mes publications" to="/pubs" />
            <NavItem icon={MessageSquareIcon} label="Discussions" to="/discussions" />
            <NavItem icon={BrainCircuitIcon} label="Assistant IA" to="/ai-assistant" />
          </ul>

          <div className="pt-8 mt-8 border-t border-gray-100">
            <ul className="space-y-1">
              <NavItem icon={BarChartIcon} label="Statistiques" to="/stats" />
              <NavItem icon={SettingsIcon} label="Paramètres" to="/params"/>
              <NavItem icon={HelpCircleIcon} label="Aide et assistance" to="/help"/>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <div className="flex items-center">
            <BrainCircuitIcon className="h-8 w-8 text-[#00A7A7]" />
            <span className="ml-2 text-lg font-semibold text-[#00A7A7]">
              MedCollab
            </span>
          </div>
          <button onClick={toggleMobileSidebar} className="p-1 rounded-md hover:bg-gray-100">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            <NavItem icon={HomeIcon} label="Accueil" to="/dashboard" />
            <NavItem icon={UsersIcon} label="Experts" to="/experts" />
            <NavItem icon={FilesIcon} label="Mes publications" to="/pubs" />
            <NavItem icon={MessageSquareIcon} label="Discussions" to="/discussions" />
            <NavItem icon={BrainCircuitIcon} label="Assistant IA" to="/ai-assistant" />
          </ul>
          <div className="pt-8 mt-8 border-t border-gray-100">
            <ul className="space-y-1">
              <NavItem icon={BarChartIcon} label="Statistiques" to="/stats" />
              <NavItem icon={SettingsIcon} label="Paramètres" to="/params"/>
              <NavItem icon={HelpCircleIcon} label="Aide et assistance" to="/help"/>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Backdrop mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-30 z-30 md:hidden" 
          onClick={toggleMobileSidebar} 
        />
      )}
    </>
  );
}
