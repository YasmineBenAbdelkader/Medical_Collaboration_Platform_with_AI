import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPinIcon, BuildingIcon, GraduationCapIcon, MailIcon, PhoneIcon, FileTextIcon, UsersIcon, AwardIcon, BriefcaseIcon } from 'lucide-react';
export const Profile = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  // Mock data - would come from API in real app
  const profileData = {
    id: '1',
    name: 'Dr. Sophie Martin',
    role: 'doctor',
    title: 'Cardiologue interventionnel',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    location: 'Lyon, France',
    hospital: 'Hôpital Cardiologique Louis Pradel',
    education: 'Université Claude Bernard Lyon 1',
    email: 'sophie.martin@example.com',
    phone: '+33 6 12 34 56 78',
    bio: "Cardiologue interventionnel spécialisée dans le traitement des cardiopathies structurelles et congénitales. 15 ans d'expérience clinique et de recherche dans le domaine des valvulopathies et des dispositifs percutanés.",
    expertise: ['Cardiologie interventionnelle', 'Valvulopathies', 'Imagerie cardiaque', 'Cardiopathies congénitales'],
    isExpert: true,
    expertiseAreas: ['Cardiologie structurelle', 'Valvulopathies'],
    publications: [{
      title: 'Advances in Percutaneous Mitral Valve Repair: A Systematic Review',
      journal: 'European Heart Journal',
      year: 2021
    }, {
      title: 'Long-term Outcomes of TAVI in High-risk Patients: A Multi-center Study',
      journal: 'Journal of the American College of Cardiology',
      year: 2019
    }],
    stats: {
      casesPosted: 47,
      commentsGiven: 156,
      expertOpinions: 32,
      thanksReceived: 89
    }
  };
  return <div className="max-w-5xl mx-auto">
      {/* Cover and avatar */}
      <div className="relative mb-24">
        <div className="h-48 w-full rounded-lg overflow-hidden">
          <img src={profileData.coverImage} alt="Cover" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-0 left-6 transform translate-y-1/2 flex items-end">
          <div className="relative">
            <img src={profileData.avatar} alt={profileData.name} className="w-32 h-32 rounded-full border-4 border-white object-cover" />
            {profileData.isExpert && <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                <AwardIcon size={16} className="text-white" />
              </div>}
          </div>
          <div className="ml-4 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {profileData.name}
            </h1>
            <p className="text-gray-700">{profileData.title}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Informations
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{profileData.location}</span>
              </div>
              <div className="flex items-center">
                <BuildingIcon size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{profileData.hospital}</span>
              </div>
              <div className="flex items-center">
                <GraduationCapIcon size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{profileData.education}</span>
              </div>
              <div className="flex items-center">
                <MailIcon size={18} className="text-gray-500 mr-2" />
                <a href={`mailto:${profileData.email}`} className="text-blue-600 hover:underline">
                  {profileData.email}
                </a>
              </div>
              <div className="flex items-center">
                <PhoneIcon size={18} className="text-gray-500 mr-2" />
                <a href={`tel:${profileData.phone}`} className="text-blue-600 hover:underline">
                  {profileData.phone}
                </a>
              </div>
            </div>
            <hr className="my-4" />
            <h3 className="font-medium text-gray-900 mb-2">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.expertise.map((item, index) => <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item}
                </span>)}
            </div>
            {profileData.isExpert && <>
                <hr className="my-4" />
                <div className="flex items-center mb-2">
                  <AwardIcon size={18} className="text-green-600 mr-2" />
                  <h3 className="font-medium text-gray-900">
                    Expert médical certifié
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Domaines d'expertise:
                </p>
                <div className="flex flex-wrap gap-2">
                  {profileData.expertiseAreas.map((item, index) => <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item}
                    </span>)}
                </div>
              </>}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Publications
            </h2>
            <div className="space-y-4">
              {profileData.publications.map((pub, index) => <div key={index} className="border-l-2 border-blue-500 pl-3">
                  <p className="font-medium text-gray-900">{pub.title}</p>
                  <p className="text-sm text-gray-600">
                    {pub.journal}, {pub.year}
                  </p>
                </div>)}
            </div>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
              Voir toutes les publications →
            </button>
          </div>
        </div>
        {/* Right column - Bio, Stats, Cases */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">À propos</h2>
            <p className="text-gray-700">{profileData.bio}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <FileTextIcon size={24} className="mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold text-gray-900">
                {profileData.stats.casesPosted}
              </div>
              <div className="text-xs text-gray-500">Cas publiés</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <UsersIcon size={24} className="mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold text-gray-900">
                {profileData.stats.commentsGiven}
              </div>
              <div className="text-xs text-gray-500">Commentaires</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <BriefcaseIcon size={24} className="mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold text-gray-900">
                {profileData.stats.expertOpinions}
              </div>
              <div className="text-xs text-gray-500">Avis d'expert</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <AwardIcon size={24} className="mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold text-gray-900">
                {profileData.stats.thanksReceived}
              </div>
              <div className="text-xs text-gray-500">Remerciements</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Cas récents</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Voir tous →
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">
                  Sténose aortique sévère chez patient à haut risque chirurgical
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  Publié il y a 1 semaine · 14 commentaires
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Cardiologie
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    TAVI
                  </span>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">
                  Insuffisance mitrale secondaire à une cardiomyopathie dilatée
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  Publié il y a 3 semaines · 8 commentaires
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Cardiologie
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Valvulopathie
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};