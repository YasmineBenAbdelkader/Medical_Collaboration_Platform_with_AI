import { useState, useRef, useEffect } from 'react';
import type { RefObject } from 'react';
// import { Link } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowUp, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { medicalServices } from '../contexts/AuthContext2';
import { Card } from '../components/shared/Card';
import heroVideo from '../videos/videoHome.mp4';
import { Footer } from '../components/shared/Footer';
export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  // Références pour la navigation par ancre
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  // const blogRef = useRef<HTMLElement | null>(null);
  const whyUsRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    const element = topBarRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsTopBarVisible(entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  // Fonction pour scroller vers une section
  const scrollToSection = (ref: RefObject<HTMLElement | null>, section: string) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth'
    });
    setActiveSection(section);
  };
  // Fonction pour revenir en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  // Modifier les services pour enlever les emojis
  const servicesWithoutEmojis = medicalServices.map(service => ({
    ...service,
    icon: service.name.charAt(0) // Utiliser la première lettre au lieu de l'emoji
  }));
  const navIsTeal = !isTopBarVisible;
  // Using shared Navbar; keep state only

  return <div className="min-h-screen bg-white">
      {/* Top info bar */}
      <div ref={topBarRef} className="bg-teal-600 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:contact@medcollabia.com" className="flex items-center gap-2 hover:text-teal-100">
              <Mail className="h-4 w-4" />
              <span>contact@Se77ati.com</span>
            </a>
            <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-teal-100">
              <Phone className="h-4 w-4" />
              <span>+216 77 777 777</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-teal-100"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-teal-100"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-teal-100"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-teal-100"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      {/* Bouton retour en haut */}
      <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-2 rounded-full bg-teal-600 text-white shadow-lg z-50 hover:bg-teal-700 transition-all">
        <ArrowUp className="h-6 w-6" />
      </button>

      {/* Navigation */}
      <Navbar
        isTeal={navIsTeal}
        activeSection={activeSection}
        onHomeClick={() => scrollToSection(homeRef, 'home')}
        onAboutClick={() => scrollToSection(aboutRef, 'about')}
        onServicesClick={() => scrollToSection(servicesRef, 'services')}
        onWhyUsClick={() => scrollToSection(whyUsRef, 'whyUs')}
        logoSrc="/vite.svg"
        brandTitle="MedCollab"
        brandSubtitle="Collaboration médicale"
      />

      {/* Hero Section */}
      <section ref={homeRef} className="relative overflow-hidden bg-teal-600">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 text-white">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Votre Santé est <br />
                <span className="text-blue-100">Notre Priorité</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Une plateforme dédiée aux professionnels de santé pour partager
                des cas cliniques, collaborer entre spécialités et bénéficier
                d'une assistance IA spécialisée.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button onClick={() => scrollToSection(servicesRef, 'services')} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-teal-700 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                  Nos Services
                </button>
              </div>
            </div>
            
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{
        clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
      }}></div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-teal-600 text-lg font-semibold">
              About Us
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mt-2">
              Bienvenue sur MedCollabIA
            </h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600">
              MedCollabIA est une plateforme innovante qui combine l'expertise
              médicale humaine et l'intelligence artificielle pour améliorer les
              diagnostics et les traitements. Notre mission est de faciliter la
              collaboration entre professionnels de santé tout en leur
              fournissant des outils d'IA avancés adaptés à leur spécialité.
            </p>
            <div className="mt-10">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-lg font-semibold">
              Services
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mt-2">
              Nos Services Médicaux
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              MedCollabIA offre une interface adaptée à chaque spécialité, avec
              des outils et des ressources spécifiques à votre domaine
              d'expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesWithoutEmojis.slice(0, 3).map(service => <Card key={service.id} icon={service.icon} title={service.name} description={`Consultez et partagez des cas cliniques spécifiques à la ${service.name.toLowerCase()}, et bénéficiez d'une IA spécialisée dans ce domaine.`} onClick={() => console.log(`Service ${service.name} clicked`)} />)}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Moved before Blog section as requested */}
      <section ref={whyUsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 pr-8">
              <span className="text-teal-600 text-lg font-semibold">
                Nos avantages
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mt-2 mb-6">
                Pourquoi choisir MedCollabIA?
              </h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">
                      Gain de temps
                    </h4>
                    <p className="text-gray-600">
                      Réduisez le temps consacré à la recherche d'informations
                      et à la consultation de collègues.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">
                      Décisions éclairées
                    </h4>
                    <p className="text-gray-600">
                      Bénéficiez d'une IA entraînée sur les dernières données
                      médicales de votre spécialité.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">
                      Collaboration simplifiée
                    </h4>
                    <p className="text-gray-600">
                      Échangez facilement avec des collègues de votre spécialité
                      ou d'autres disciplines.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">
                      Sécurité des données
                    </h4>
                    <p className="text-gray-600">
                      Toutes les données sont cryptées et traitées conformément
                      aux normes de sécurité les plus strictes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button onClick={() => navigate('/login')} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  Commencer maintenant
                </button>
              </div>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2">
              <img src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Medical professionals using technology" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>;
};