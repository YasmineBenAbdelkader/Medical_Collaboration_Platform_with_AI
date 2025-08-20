import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, BrainCircuit } from 'lucide-react';
import type { RefObject } from 'react';

type FooterProps = {
  appName?: string;
  description?: string;
  scrollToSection?: (ref: RefObject<HTMLElement | null>, section: string) => void;
  homeRef?: RefObject<HTMLElement | null>;
  aboutRef?: RefObject<HTMLElement | null>;
  servicesRef?: RefObject<HTMLElement | null>;
  whyUsRef?: RefObject<HTMLElement | null>;
};

export const Footer = ({
  appName = 'MedCollabIA',
  description = "Plateforme de collaboration médicale et d'assistance IA pour partager des cas cliniques et améliorer les décisions.",
  scrollToSection,
  homeRef,
  aboutRef,
  servicesRef,
  whyUsRef
}: FooterProps) => {
  const navigate = useNavigate();

  const handleClick = (ref?: RefObject<HTMLElement | null>, section?: string, fallbackPath?: string) => {
    if (ref && section && scrollToSection) {
      scrollToSection(ref, section);
    } else if (fallbackPath) {
      navigate(fallbackPath);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#E6FAFA] via-[#F6FCFC] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_auto_auto_auto] gap-y-10 gap-x-16 py-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#00A7A7] to-[#19c2c2] p-1 shadow flex items-center justify-center">
                <BrainCircuit className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block text-2xl font-semibold text-[#0b3b3b]">{appName}</span>
                <span className="block text-sm text-[#2f6f6f]">Collaboration médicale</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#00A7A7]/30 text-[#00A7A7] hover:bg-[#00A7A7]/10">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#00A7A7]/30 text-[#00A7A7] hover:bg-[#00A7A7]/10">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#00A7A7]/30 text-[#00A7A7] hover:bg-[#00A7A7]/10">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#00A7A7]/30 text-[#00A7A7] hover:bg-[#00A7A7]/10">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
          {/* Plateforme */}
          <div className="min-w-[200px]">
            <h3 className="text-sm font-semibold tracking-wider text-[#00A7A7] uppercase border-b border-[#00A7A7]/30 pb-2 mb-4">Plateforme</h3>
            <ul className="space-y-3 text-gray-700 w-max">
              <li><button onClick={() => handleClick(homeRef, 'home', '/home')} className="hover:text-[#00A7A7]">Accueil</button></li>
              <li><button onClick={() => handleClick(aboutRef, 'about', '/home')} className="hover:text-[#00A7A7]">À propos</button></li>
              <li><button onClick={() => handleClick(servicesRef, 'services', '/home')} className="hover:text-[#00A7A7]">Services</button></li>
              <li><button onClick={() => handleClick(whyUsRef, 'whyUs', '/home')} className="hover:text-[#00A7A7]">Pourquoi nous</button></li>
            </ul>
          </div>
          {/* Ressources */}
          <div className="min-w-[200px]">
            <h3 className="text-sm font-semibold tracking-wider text-[#00A7A7] uppercase border-b border-[#00A7A7]/30 pb-2 mb-4">Ressources</h3>
            <ul className="space-y-3 text-gray-700 w-max">
              <li>
                <button
                  onClick={() => {
                    navigate('/blog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#00A7A7]"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/contactUs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#00A7A7]"
                >
                  Contact
                </button>
              </li>
              <li><a href="#" className="hover:text-[#00A7A7]">FAQ</a></li>
            </ul>
          </div>
          {/* Spécialités */}
          <div className="min-w-[200px]">
            <h3 className="text-sm font-semibold tracking-wider text-[#00A7A7] uppercase border-b border-[#00A7A7]/30 pb-2 mb-4">Spécialités</h3>
            <ul className="space-y-3 text-gray-700 w-max">
              <li><button onClick={() => navigate('/blog?specialty=Cardiologie')} className="hover:text-[#00A7A7]">Cardiologie</button></li>
              <li><button onClick={() => navigate('/blog?specialty=Neurologie')} className="hover:text-[#00A7A7]">Neurologie</button></li>
              <li><button onClick={() => navigate('/blog?specialty=Radiologie')} className="hover:text-[#00A7A7]">Radiologie</button></li>
              <li><button onClick={() => navigate('/blog?specialty=Oncologie')} className="hover:text-[#00A7A7]">Oncologie</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#00A7A7]/20 py-6 text-center text-gray-600">
          &copy; 2025 MedCollabIA. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};