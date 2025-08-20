import { useState, useRef, useEffect } from 'react';
import type { RefObject } from 'react';
import { Navbar } from '../components/shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowUp, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Card } from '../components/shared/Card';
import heroVideo from '../videos/videoHome.mp4';
import { Footer } from '../components/shared/Footer';

const medicalSpecialties = [
  { id: 1, name: 'Anesthésiologie', description: 'Spécialité médicale concernée par la gestion de la douleur et des soins des patients avant, pendant et après une intervention chirurgicale.', interest: 'Gestion de la douleur, sédation, réanimation, médecine péri-opératoire' },
  { id: 2, name: 'Cardiologie', description: 'Spécialité médicale qui traite des troubles du cœur et du système circulatoire.', interest: 'Maladies cardiaques, hypertension, insuffisance cardiaque, troubles du rythme cardiaque' },
  { id: 3, name: 'Dermatologie', description: 'Spécialité médicale concernée par le diagnostic et le traitement des maladies de la peau, des cheveux et des ongles.', interest: 'Cancer de la peau, eczéma, psoriasis, acné, maladies des cheveux et des ongles' },
  { id: 4, name: 'Endocrinologie', description: 'Spécialité médicale qui traite des troubles des glandes endocrines et des hormones.', interest: 'Diabète, troubles thyroïdiens, obésité, maladies métaboliques, infertilité' },
  { id: 5, name: 'Gastro-entérologie', description: 'Spécialité médicale qui traite des maladies du système digestif.', interest: 'Maladies de l\'œsophage, estomac, intestins, foie, pancréas et vésicule biliaire' },
  { id: 6, name: 'Gériatrie', description: 'Spécialité médicale consacrée aux aspects cliniques, préventifs et sociaux des maladies des personnes âgées.', interest: 'Soins aux personnes âgées, maladies dégénératives, polypathologie, préservation de l\'autonomie' },
  { id: 7, name: 'Hématologie', description: 'Spécialité médicale qui traite des maladies du sang et des organes hématopoïétiques.', interest: 'Anémies, leucémies, lymphomes, troubles de la coagulation, transfusion sanguine' },
  { id: 8, name: 'Infectiologie', description: 'Spécialité médicale qui traite des maladies infectieuses.', interest: 'Infections bactériennes, virales, fongiques, parasitaires, maladies tropicales, VIH' },
  { id: 9, name: 'Médecine d\'urgence', description: 'Spécialité médicale concernée par la prise en charge des urgences vitales.', interest: 'Traumatismes, arrêt cardiaque, accidents vasculaires cérébraux, détresse respiratoire' },
  { id: 10, name: 'Médecine interne', description: 'Spécialité médicale qui traite des maladies complexes affectant plusieurs organes.', interest: 'Diagnostic des maladies complexes, prise en charge des polypathologies' },
  { id: 11, name: 'Néphrologie', description: 'Spécialité médicale qui traite des maladies des reins.', interest: 'Insuffisance rénale, dialyse, transplantation rénale, hypertension rénale' },
  { id: 12, name: 'Neurologie', description: 'Spécialité médicale qui traite des maladies du système nerveux.', interest: 'Accidents vasculaires cérébraux, épilepsie, maladie d\'Alzheimer, sclérose en plaques' },
  { id: 13, name: 'Oncologie', description: 'Spécialité médicale qui traite des cancers.', interest: 'Diagnostic, traitement et suivi des tumeurs malignes, chimiothérapie' },
  { id: 14, name: 'Ophtalmologie', description: 'Spécialité médicale et chirurgicale qui traite des maladies des yeux.', interest: 'Cataracte, glaucome, troubles de la vision, chirurgie réfractive' },
  { id: 15, name: 'Orthopédie', description: 'Spécialité chirurgicale qui traite des maladies du système musculo-squelettique.', interest: 'Fractures, arthrose, prothèses articulaires, traumatologie sportive' },
  { id: 16, name: 'Oto-rhino-laryngologie (ORL)', description: 'Spécialité médico-chirurgicale qui traite des maladies de la gorge, du nez et des oreilles.', interest: 'Surdité, vertiges, sinusites, cancers ORL, amygdalites' },
  { id: 17, name: 'Pédiatrie', description: 'Spécialité médicale consacrée à l\'enfant et à ses maladies.', interest: 'Croissance et développement, maladies infantiles, vaccination, suivi du nourrisson' },
  { id: 18, name: 'Pneumologie', description: 'Spécialité médicale qui traite des maladies de l\'appareil respiratoire.', interest: 'Asthme, bronchite chronique, cancer du poumon, insuffisance respiratoire' },
  { id: 19, name: 'Psychiatrie', description: 'Spécialité médicale qui traite des troubles mentaux.', interest: 'Dépression, schizophrénie, troubles anxieux, troubles bipolaires' },
  { id: 20, name: 'Radiologie', description: 'Spécialité médicale qui utilise les rayonnements pour le diagnostic et le traitement des maladies.', interest: 'Imagerie médicale (radiographie, scanner, IRM), radiologie interventionnelle' },
  { id: 21, name: 'Rhumatologie', description: 'Spécialité médicale qui traite des maladies des articulations et des tissus conjonctifs.', interest: 'Arthrite, arthrose, ostéoporose, lombalgies, maladies auto-immunes' },
  { id: 22, name: 'Urologie', description: 'Spécialité chirurgicale qui traite des maladies de l\'appareil urinaire et génital masculin.', interest: 'Calculs rénaux, cancer de la prostate, troubles urinaires, infertilité masculine' },
  { id: 23, name: 'Chirurgie générale', description: 'Spécialité chirurgicale qui traite des interventions sur l\'abdomen, le système digestif et autres.', interest: 'Appendicite, hernies, chirurgie digestive, chirurgie laparoscopique' },
  { id: 24, name: 'Chirurgie cardiaque', description: 'Spécialité chirurgicale qui traite des maladies cardiaques par la chirurgie.', interest: 'Pontages coronariens, valves cardiaques, transplantation cardiaque' },
  { id: 25, name: 'Médecine physique et réadaptation', description: 'Spécialité médicale qui traite de la rééducation fonctionnelle.', interest: 'Rééducation après accident, handicap, médecine du sport, lombalgies' },
  { id: 26, name: 'Gynécologie-obstétrique', description: 'Spécialité médico-chirurgicale qui traite de la femme, de la grossesse et de l\'accouchement.', interest: 'Suivi de grossesse, accouchement, cancers gynécologiques, fertilité' },
  { id: 27, name: 'Allergologie', description: 'Spécialité médicale qui traite des allergies.', interest: 'Allergies alimentaires, asthme allergique, rhinite allergique, eczéma' },
  { id: 28, name: 'Médecine légale', description: 'Spécialité médicale qui applique les connaissances médicales aux questions juridiques.', interest: 'Autopsies, détermination des causes de décès, expertise médicolégale' },
  { id: 29, name: 'Médecine du travail', description: 'Spécialité médicale consacrée à la santé des travailleurs.', interest: 'Pathologies professionnelles, prévention des risques, aptitude au travail' },
  { id: 30, name: 'Génétique médicale', description: 'Spécialité médicale qui traite des maladies génétiques.', interest: 'Maladies héréditaires, conseil génétique, diagnostic prénatal' }
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
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

  const scrollToSection = (ref: RefObject<HTMLElement | null>, section: string) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navIsTeal = !isTopBarVisible;

  return <div className="min-h-screen bg-gray-100 font-sans text-black">
    <div ref={topBarRef} className="bg-[#00A7A7] text-white text-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="mailto:contact@medcollabia.com" className="flex items-center gap-2 hover:text-gray-200 transition-colors duration-300">
            <Mail className="h-5 w-5" />
            <span>contact@Se77ati.com</span>
          </a>
          <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-gray-200 transition-colors duration-300">
            <Phone className="h-5 w-5" />
            <span>+216 77 777 777</span>
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" aria-label="Facebook" className="hover:text-gray-200 transition-colors duration-300"><Facebook className="h-5 w-5" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-gray-200 transition-colors duration-300"><Twitter className="h-5 w-5" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-gray-200 transition-colors duration-300"><Linkedin className="h-5 w-5" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-gray-200 transition-colors duration-300"><Instagram className="h-5 w-5" /></a>
        </div>
      </div>
    </div>
    <button onClick={scrollToTop} className="fixed bottom-8 right-8 p-3 rounded-full bg-[#00A7A7] text-white shadow-lg z-50 hover:bg-[#009999] transition-all duration-300">
      <ArrowUp className="h-6 w-6" />
    </button>

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
    <section ref={homeRef} className="relative h-screen overflow-hidden bg-[#00A7A7]">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
        <div className="w-full md:w-1/2 text-white pl-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Connecter les esprits, <br />
            <span className="text-white">améliorer les soins </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
          Tirez le meilleur de nos solutions intelligentes et collaborez avec des professionnels de santé pour révolutionner votre façon de soigner.          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button onClick={() => scrollToSection(servicesRef, 'services')} className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg bg-white text-[#00A7A7] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A7A7] transition-all duration-500 transform hover:scale-105">
              Découvrez Nos Services
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-100"></div>
    </section>

    <section ref={aboutRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#00A7A7] text-xl font-semibold uppercase tracking-wide">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mt-4">
            Bienvenue sur MedCollabIA
          </h2>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-black mb-10 leading-loose">
          MedCollab est la plateforme de collaboration médicale qui réunit médecins,
           experts de santé et étudiants en médecine pour partager leurs avis, 
           coordonner les soins et prendre des décisions éclairées sur des cas médicaux. 
           Elle offre une solution intelligente pour optimiser la coordination et la qualité des soins.
          </p>
          <div className="mt-10">
            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-semibold rounded-xl shadow-lg bg-[#00A7A7] text-white hover:bg-[#009999] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A7A7] transition-all duration-300">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>

    <section ref={servicesRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#00A7A7] text-xl font-semibold uppercase tracking-wide">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mt-4">
            Nos Services Médicaux
          </h2>
          <p className="mt-6 text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
            MedCollabIA propose une interface sur mesure pour chaque spécialité,
            enrichie d'outils et de ressources spécifiques à votre domaine.
          </p>
        </div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {medicalSpecialties.map((specialty) => (
            <div key={specialty.id} className="min-w-[250px] bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300" style={{ borderColor: '#00A7A7' }}>
              <h3 className="text-xl font-semibold text-black mb-2">{specialty.name}</h3>
              <p className="text-gray-600 mb-4">{specialty.description}</p>
              <button onClick={() => navigate(`/services/${specialty.name.toLowerCase().replace(/ /g, '-')}`)} className="px-4 py-2 bg-white text-[#00A7A7] border border-[#00A7A7] rounded-full hover:bg-[#00A7A7] hover:text-white transition-colors duration-300">
                Découvrir →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section ref={whyUsRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 pr-12">
            <span className="text-[#00A7A7] text-xl font-semibold uppercase tracking-wide">
              Nos avantages
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mt-4 mb-8">
              Pourquoi choisir MedCollabIA?
            </h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-7 w-7 text-[#00A7A7]" />
                </div>
                <div className="ml-6">
                  <h4 className="text-xl font-medium text-black">
                    Gain de temps
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Réduisez le temps consacré à la recherche d'informations
                    et à la consultation de collègues.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-7 w-7 text-[#00A7A7]" />
                </div>
                <div className="ml-6">
                  <h4 className="text-xl font-medium text-black">
                    Décisions éclairées
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Bénéficiez d'une IA entraînée sur les dernières données
                    médicales de votre spécialité.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-7 w-7 text-[#00A7A7]" />
                </div>
                <div className="ml-6">
                  <h4 className="text-xl font-medium text-black">
                    Collaboration simplifiée
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Échangez facilement avec des collègues de votre spécialité
                    ou d'autres disciplines.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-7 w-7 text-[#00A7A7]" />
                </div>
                <div className="ml-6">
                  <h4 className="text-xl font-medium text-black">
                    Sécurité des données
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Toutes les données sont cryptées et traitées conformément
                    aux normes de sécurité les plus strictes.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <button onClick={() => navigate('/login')} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-semibold rounded-xl shadow-lg bg-[#00A7A7] text-white hover:bg-[#009999] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A7A7] transition-all duration-300">
                Commencer maintenant
              </button>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2">
            <img src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Medical professionals using technology" className="rounded-2xl shadow-lg" />
          </div>
        </div>
      </div>
    </section>
    <Footer
      scrollToSection={scrollToSection}
      homeRef={homeRef}
      aboutRef={aboutRef}
      servicesRef={servicesRef}
      whyUsRef={whyUsRef}
    />
  </div>;
};