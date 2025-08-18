import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, AwardIcon, MapPinIcon, ClockIcon, StarIcon, MessageCircleIcon, PhoneIcon, BuildingIcon } from 'lucide-react';

export const ExpertDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Mock data - would come from API in real app
  const specialties = ['Toutes spécialités', 'Cardiologie', 'Dermatologie', 'Endocrinologie', 'Gastroentérologie', 'Neurologie', 'Oncologie', 'Pédiatrie', 'Pneumologie', 'Psychiatrie', 'Radiologie', 'Rhumatologie'];
  
  const experts = [
    {
      id: '1',
      name: 'Dr. Sophie Martin',
      specialty: 'Cardiologie',
      expertise: ['Cardiologie structurelle', 'Valvulopathies'],
      location: 'Lyon, France',
      hospital: 'Hôpital Cardiologique Louis Pradel',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      responseTime: '< 24h',
      rating: 4.9,
      reviewCount: 124,
      isOnline: true,
      experience: '15 ans',
      languages: ['Français', 'Anglais'],
      verified: true
    },
    {
      id: '2',
      name: 'Dr. Jean Dubois',
      specialty: 'Neurologie',
      expertise: ['Maladies neurodégénératives', 'Épilepsie'],
      location: 'Paris, France',
      hospital: 'Hôpital de la Pitié-Salpêtrière',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      responseTime: '< 48h',
      rating: 4.7,
      reviewCount: 98,
      isOnline: false,
      experience: '12 ans',
      languages: ['Français', 'Espagnol'],
      verified: true
    },
    {
      id: '3',
      name: 'Dr. Marie Laurent',
      specialty: 'Dermatologie',
      expertise: ['Dermatologie pédiatrique', 'Maladies inflammatoires cutanées'],
      location: 'Marseille, France',
      hospital: 'CHU de Marseille',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      responseTime: '< 24h',
      rating: 4.8,
      reviewCount: 112,
      isOnline: true,
      experience: '18 ans',
      languages: ['Français', 'Anglais', 'Italien'],
      verified: true
    },
    {
      id: '4',
      name: 'Dr. Antoine Moreau',
      specialty: 'Pédiatrie',
      expertise: ['Gastroentérologie pédiatrique', 'Nutrition infantile'],
      location: 'Toulouse, France',
      hospital: 'Hôpital des Enfants',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      responseTime: '< 72h',
      rating: 4.6,
      reviewCount: 87,
      isOnline: false,
      experience: '10 ans',
      languages: ['Français'],
      verified: false
    },
    {
      id: '5',
      name: 'Dr. Claire Petit',
      specialty: 'Oncologie',
      expertise: ['Cancer du sein', 'Immunothérapie'],
      location: 'Bordeaux, France',
      hospital: 'Institut Bergonié',
      avatar: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      responseTime: '< 48h',
      rating: 4.9,
      reviewCount: 143,
      isOnline: true,
      experience: '20 ans',
      languages: ['Français', 'Anglais', 'Allemand'],
      verified: true
    },
    {
      id: '6',
      name: 'Dr. Thomas Bernard',
      specialty: 'Cardiologie',
      expertise: ['Rythmologie', 'Insuffisance cardiaque'],
      location: 'Lille, France',
      hospital: 'CHRU de Lille',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      responseTime: '< 24h',
      rating: 4.8,
      reviewCount: 105,
      isOnline: true,
      experience: '14 ans',
      languages: ['Français', 'Anglais'],
      verified: true
    }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         expert.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || 
                            selectedSpecialty === 'Toutes spécialités' || 
                            expert.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Annuaire des experts
        </h1>
        <p className="text-gray-600">
          Trouvez et contactez des experts médicaux qualifiés pour vos cas complexes
        </p>
      </div>

      {/* Barre de recherche améliorée */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Rechercher un expert par nom ou spécialité..." 
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 sm:text-sm" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
          <div className="flex items-center">
            <FilterIcon className="h-5 w-5 text-gray-400 mr-3" />
            <select 
              className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-50 focus:bg-white transition-all duration-200" 
              value={selectedSpecialty} 
              onChange={e => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty === 'Toutes spécialités' ? '' : specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grille des experts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredExperts.map(expert => (
          <div key={expert.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Header avec avatar et badges */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="relative">
                    <img 
                      src={expert.avatar} 
                      alt={expert.name} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg" 
                    />
                    {expert.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {expert.name}
                      </h3>
                      {expert.verified && (
                        <div className="p-1 bg-blue-100 rounded-full">
                          <AwardIcon size={14} className="text-blue-600" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-blue-600">{expert.specialty}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            size={14} 
                            className={`${i < Math.floor(expert.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-xs text-gray-600">
                        {expert.rating} ({expert.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges d'expertise */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {expert.expertise.map((item, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Informations détaillées */}
            <div className="px-6 pb-4 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <BuildingIcon size={16} className="mr-2 text-gray-400" />
                <span className="truncate">{expert.hospital}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPinIcon size={16} className="mr-2 text-gray-400" />
                <span>{expert.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ClockIcon size={16} className="mr-2 text-gray-400" />
                <span className="font-medium text-green-600">{expert.responseTime}</span>
                <span className="ml-1">de réponse</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Expérience: <span className="font-medium text-gray-900">{expert.experience}</span></span>
                <span className="text-gray-600">Langues: <span className="font-medium text-gray-900">{expert.languages.length}</span></span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6">
              <div className="flex space-x-3">
                <Link 
                  to={`/profile/${expert.id}`} 
                  className="flex-1 flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  <span>Voir profil</span>
                </Link>
                <Link 
                  to={`/contact/${expert.id}`} 
                  className="flex-1 flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <MessageCircleIcon size={16} className="mr-2" />
                  <span>Demander un avis</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredExperts.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun expert trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche ou contactez-nous pour une assistance personnalisée.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};