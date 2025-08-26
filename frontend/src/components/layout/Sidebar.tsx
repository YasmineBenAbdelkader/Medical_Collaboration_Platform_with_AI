import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HomeIcon, FilesIcon, UsersIcon, MessageSquareIcon, BrainCircuitIcon, BarChartIcon, SettingsIcon, HelpCircleIcon, MenuIcon, XIcon } from 'lucide-react';
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
        className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <Icon className="h-5 w-5" />
        {!collapsed && <span className="ml-3">{label}</span>}
      </Link>
    </li>
  );
  return <>
      {/* Mobile sidebar toggle */}
      <button className="fixed z-50 bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white shadow-lg md:hidden" onClick={toggleMobileSidebar}>
        {mobileOpen ? <XIcon /> : <MenuIcon />}
      </button>
      {/* Sidebar for desktop */}
      <aside className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
        <div className={`flex items-center h-16 px-4 border-b border-gray-200 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && <div className="flex items-center">
              <BrainCircuitIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                MedCollab
              </span>
            </div>}
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-100">
            <MenuIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            <NavItem icon={HomeIcon} label="Accueil" to="/dashbord" />
            <NavItem icon={UsersIcon} label="Experts" to="/experts" />
            <NavItem icon={UsersIcon} label="médecins" to="/medecins" />
            <NavItem icon={FilesIcon} label="Cas cliniques" to="/cas" />
            <NavItem icon={MessageSquareIcon} label="Discussions" to="/discussions" />
            <NavItem icon={BrainCircuitIcon} label="Assistant IA" to="/assistant-ia" />
            
          </ul>
          <div className="pt-8 mt-8 border-t border-gray-200">
            <ul className="space-y-1">
              <NavItem icon={BarChartIcon} label="Statistiques" to="/stats" />
              <NavItem icon={SettingsIcon} label="Paramètres" to='/'/>
              <NavItem icon={HelpCircleIcon} label="Aide et assistance" to='/'/>
            </ul>
          </div>
        </nav>
      </aside>
      {/* Mobile sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <BrainCircuitIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">
              MedCollab
            </span>
          </div>
          <button onClick={toggleMobileSidebar} className="p-1 rounded-md hover:bg-gray-100">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
          <NavItem icon={HomeIcon} label="Accueil" to="" />
            <NavItem icon={UsersIcon} label="Experts" to="/experts" />
            <NavItem icon={UsersIcon} label="médecins" to="/medecins" />
            <NavItem icon={FilesIcon} label="Cas cliniques" to="/cas" />
            <NavItem icon={MessageSquareIcon} label="Discussions" to="/discussions" />
            <NavItem icon={BrainCircuitIcon} label="Assistant IA" to="/assistant-ia" />
          </ul>
          <div className="pt-8 mt-8 border-t border-gray-200">
            <ul className="space-y-1">
              <NavItem icon={BarChartIcon} label="Statistiques" to="/stats" />
              <NavItem icon={SettingsIcon} label="Paramètres" to='/'/>
              <NavItem icon={HelpCircleIcon} label="Aide et assistance" to='/'/>
            </ul>
          </div>
        </nav>
      </aside>
      {/* Backdrop for mobile */}
      {mobileOpen && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 md:hidden" onClick={toggleMobileSidebar} />}
    </>;
}