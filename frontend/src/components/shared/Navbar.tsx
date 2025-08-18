import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

type NavbarProps = {
  isTeal: boolean;
  activeSection?: string;
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onServicesClick?: () => void;
  onWhyUsClick?: () => void;
  logoSrc?: string;
  brandTitle?: string;
  brandSubtitle?: string;
  useBrainIcon?: boolean;
};

export const Navbar = ({
  isTeal,
  activeSection,
  onHomeClick,
  onAboutClick,
  onServicesClick,
  onWhyUsClick,
  logoSrc = '/vite.svg',
  brandTitle = 'MedCollabIA',
  brandSubtitle,
  useBrainIcon = true
}: NavbarProps) => {
  const navigate = useNavigate();

  const navContainerClasses = isTeal ? 'bg-teal-600 text-white' : 'bg-white text-gray-900';
  const baseLinkClass = isTeal ? 'text-white hover:text-teal-100' : 'text-gray-700 hover:text-teal-600';
  const activeLinkClass = isTeal ? 'text-white' : 'text-teal-600';

  // 🎨 Gestion des couleurs du logo
  const iconBgClass = isTeal
    ? 'bg-white' // si navbar teal → fond blanc
    : 'bg-gradient-to-br from-[#00A7A7] to-[#19c2c2]'; // sinon fond teal

  const iconColorClass = isTeal
    ? 'text-teal-600' // si navbar teal → icône teal
    : 'text-white'; // sinon icône blanche

  return (
    <nav className={`${navContainerClasses} sticky top-0 shadow-sm z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div
              className={`h-10 w-10 rounded-xl ${iconBgClass} p-1 shadow flex items-center justify-center`}
            >
              {useBrainIcon ? (
                <BrainCircuit className={`h-6 w-6 ${iconColorClass}`} />
              ) : (
                <img
                  src={logoSrc}
                  alt="Logo"
                  className="h-full w-full object-contain rounded-lg"
                />
              )}
            </div>
            <div className="ml-2 leading-tight">
              <div
                className={`text-xl font-semibold ${
                  isTeal ? 'text-white' : 'text-gray-900'
                }`}
              >
                {brandTitle}
              </div>
              {brandSubtitle && (
                <div
                  className={`text-xs ${
                    isTeal ? 'text-teal-100' : 'text-gray-500'
                  }`}
                >
                  {brandSubtitle}
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={onHomeClick ?? (() => navigate('/home'))}
              className={`font-medium ${
                activeSection === 'home' ? activeLinkClass : baseLinkClass
              }`}
            >
              Home
            </button>
            <button
              onClick={onAboutClick ?? (() => navigate('/home'))}
              className={`font-medium ${
                activeSection === 'about' ? activeLinkClass : baseLinkClass
              }`}
            >
              À propos
            </button>
            <button
              onClick={onServicesClick ?? (() => navigate('/home'))}
              className={`font-medium ${
                activeSection === 'services' ? activeLinkClass : baseLinkClass
              }`}
            >
              Services
            </button>
            <button
              onClick={onWhyUsClick ?? (() => navigate('/home'))}
              className={`font-medium ${
                activeSection === 'whyUs' ? activeLinkClass : baseLinkClass
              }`}
            >
              Pourquoi nous
            </button>
            <button
              onClick={() => navigate('/blog')}
              className={`font-medium ${baseLinkClass}`}
            >
              Blog
            </button>
            <button
              onClick={() => navigate('/contactUs')}
              className={`font-medium ${baseLinkClass}`}
            >
              Contact
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className={`font-medium ${baseLinkClass}`}>
              Se connecter
            </Link>
            <button
              onClick={() => navigate('/login')}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isTeal
                  ? 'text-teal-600 bg-white hover:bg-teal-50 focus:ring-teal-200'
                  : 'text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500'
              }`}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
