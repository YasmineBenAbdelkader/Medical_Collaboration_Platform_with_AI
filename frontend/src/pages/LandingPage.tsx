import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuitIcon, Users2Icon, MessageSquareIcon, ShieldCheckIcon, AwardIcon, ArrowRightIcon, CheckCircleIcon } from 'lucide-react';
export const LandingPage = () => {
  return <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-blue-600 text-white p-1 rounded-md">
                  <BrainCircuitIcon size={24} />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  MedCollab
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/login" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                Se connecter
              </Link>
              <Link to="/login" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Collaboration médicale</span>
                  <span className="block text-blue-600">assistée par IA</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Partagez des cas cliniques, obtenez l'avis d'experts et
                  bénéficiez d'une assistance IA pour améliorer vos décisions
                  médicales et offrir les meilleurs soins à vos patients.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                      Commencer
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                      En savoir plus
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Équipe médicale collaborant" />
        </div>
      </div>
      {/* Features Section */}
      <div id="features" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Fonctionnalités
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Une plateforme complète pour les professionnels de santé
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              MedCollab réunit le meilleur de la collaboration médicale et de
              l'intelligence artificielle pour vous aider dans votre pratique
              quotidienne.
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <MessageSquareIcon className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Partage de cas cliniques
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Partagez des cas complexes avec la communauté médicale et
                  recevez des commentaires de collègues du monde entier.
                </p>
              </div>
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <BrainCircuitIcon className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Assistant IA médical
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Bénéficiez d'une aide à la décision clinique basée sur les
                  dernières données médicales et recherches scientifiques.
                </p>
              </div>
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <AwardIcon className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Avis d'experts certifiés
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Consultez des spécialistes reconnus dans leur domaine pour des
                  cas particulièrement complexes.
                </p>
              </div>
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <ShieldCheckIcon className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Sécurité et confidentialité
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Toutes les données sont anonymisées et protégées selon les
                  plus hauts standards de sécurité médicale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Témoignages
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Ce que disent nos utilisateurs
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                "MedCollab a transformé ma pratique. L'avis de collègues sur des
                cas complexes m'a permis d'améliorer significativement ma prise
                en charge."
              </p>
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Dr. Thomas Dubois" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Dr. Thomas Dubois
                  </p>
                  <p className="text-sm text-gray-500">
                    Cardiologue, CHU de Lyon
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                "L'assistant IA est remarquable. Il m'a suggéré un diagnostic
                rare que je n'avais pas envisagé et qui s'est avéré être le
                bon."
              </p>
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Dr. Marie Laurent" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Dr. Marie Laurent
                  </p>
                  <p className="text-sm text-gray-500">
                    Dermatologue, CHU de Marseille
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                "En tant qu'interne, avoir accès à cette communauté et aux
                experts est inestimable pour ma formation. J'apprends chaque
                jour."
              </p>
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Dr. Antoine Moreau" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Dr. Antoine Moreau
                  </p>
                  <p className="text-sm text-gray-500">
                    Interne en Pédiatrie, Toulouse
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Rejoignez la communauté MedCollab
            </h2>
            <p className="mt-3 text-xl text-blue-200 sm:mt-4">
              Des milliers de professionnels de santé collaborent déjà sur notre
              plateforme
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                Médecins
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                5,000+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                Cas partagés
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                12,000+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                Spécialités
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                25+
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/* CTA */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">
              Prêt à améliorer votre pratique médicale?
            </span>
            <span className="block text-blue-600">
              Inscrivez-vous gratuitement dès aujourd'hui.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Créer un compte
                <ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" />
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                À propos
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Fonctionnalités
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Confidentialité
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Conditions d'utilisation
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Contact
              </a>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2023 MedCollab. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>;
};