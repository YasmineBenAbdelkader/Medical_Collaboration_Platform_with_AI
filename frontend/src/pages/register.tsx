import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StethoscopeIcon, UserPlusIcon, GraduationCapIcon, AwardIcon, ArrowLeftIcon, ChevronRightIcon, HospitalIcon, MailIcon, LockIcon } from 'lucide-react';
import { BackgroundAnimation } from '../components/ui/BackgroundAnimation';
import { Logo } from '../components/ui/Logo';
import { FormInput } from '../components/ui/FormInput';
import { FormSelect } from '../components/ui/FormSelect';
import { FileUpload } from '../components/ui/FileUpload';
import { Stepper } from '../components/ui/Stepper';
type UserType = 'generaliste' | 'specialiste' | 'etudiant' | 'expert' | null;
const Register = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentStep, setCurrentStep] = useState(0);
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rppsNumber: '',
    studentId: '',
    speciality: '',
    facility: '',
    experience: '',
    university: '',
    hospital: '',
    biography: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      id,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };
  const handleBack = () => {
    if (currentStep === 0) {
      setUserType(null);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic
    console.log({
      userType,
      formData
    });
  };
  // Define steps based on user type
  const getSteps = () => {
    switch (userType) {
      case 'generaliste':
      case 'specialiste':
        return ['Informations', 'Profession', 'Documents'];
      case 'etudiant':
        return ['Informations', 'Académique', 'Documents'];
      case 'expert':
        return ['Informations', 'Profession', 'Expertise', 'Documents'];
      default:
        return [];
    }
  };
  // User type selection screen
  const renderUserTypeSelection = () => <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Type de compte
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Médecin Généraliste */}
        <div onClick={() => setUserType('generaliste')} className="border-2 border-gray-200 hover:border-[#00A7A7] bg-white/80 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="bg-[#00A7A7]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <StethoscopeIcon className="h-7 w-7 text-[#00A7A7]" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Généraliste
          </h3>
          <p className="text-gray-600 text-sm">Accès standard</p>
        </div>
        {/* Médecin Spécialiste */}
        <div onClick={() => setUserType('specialiste')} className="border-2 border-gray-200 hover:border-[#00A7A7] bg-white/80 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="bg-[#00A7A7]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <UserPlusIcon className="h-7 w-7 text-[#00A7A7]" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Spécialiste
          </h3>
          <p className="text-gray-600 text-sm">Consultations spécialisées</p>
        </div>
        {/* Étudiant en Médecine */}
        <div onClick={() => setUserType('etudiant')} className="border-2 border-blue-200 bg-blue-50/30 hover:border-blue-400 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="bg-blue-500/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <GraduationCapIcon className="h-7 w-7 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Étudiant</h3>
          <p className="text-gray-600 text-sm">Formation et stages</p>
        </div>
        {/* Expert Médical Certifié */}
        <div onClick={() => setUserType('expert')} className="border-2 border-[#00A7A7] bg-teal-50/30 ring-2 ring-[#00A7A7]/20 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="bg-[#00A7A7]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <AwardIcon className="h-7 w-7 text-[#00A7A7]" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Expert</h3>
          <p className="text-gray-600 text-sm">Autorité médicale</p>
        </div>
      </div>
    </div>;
  // Step 1: Personal information (common for all user types)
  const renderPersonalInfoStep = () => <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput id="firstName" label="Prénom" required value={formData.firstName} onChange={handleInputChange} />
        <FormInput id="lastName" label="Nom" required value={formData.lastName} onChange={handleInputChange} />
      </div>
      <FormInput id="email" label="Email professionnel" type="email" placeholder="dr.nom@hopital.fr" icon={<MailIcon size={18} />} required value={formData.email} onChange={handleInputChange} />
      <FormInput id="password" label="Mot de passe" type="password" icon={<LockIcon size={18} />} required value={formData.password} onChange={handleInputChange} />
      <FormInput id="confirmPassword" label="Confirmer le mot de passe" type="password" icon={<LockIcon size={18} />} required value={formData.confirmPassword} onChange={handleInputChange} />
      {/* Password strength indicator */}
      {formData.password && <div className="mt-1">
          <div className="flex gap-1 mb-1">
            <div className={`h-1 flex-1 rounded-full ${formData.password.length > 0 ? 'bg-red-500' : 'bg-gray-700'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${formData.password.length >= 6 ? 'bg-yellow-500' : 'bg-gray-700'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${formData.password.length >= 10 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
          </div>
          <p className="text-xs text-gray-400">
            {formData.password.length < 6 && 'Mot de passe faible'}
            {formData.password.length >= 6 && formData.password.length < 10 && 'Mot de passe moyen'}
            {formData.password.length >= 10 && 'Mot de passe fort'}
          </p>
        </div>}
    </div>;
  // Step 2: Professional information for doctors
  const renderProfessionalInfoStep = () => <div className="space-y-4">
      <FormInput id={userType === 'etudiant' ? 'studentId' : 'rppsNumber'} label={userType === 'etudiant' ? "Numéro d'inscription étudiant" : 'Numéro RPPS'} placeholder={userType === 'etudiant' ? '' : '12345678901'} required value={userType === 'etudiant' ? formData.studentId : formData.rppsNumber} onChange={handleInputChange} />
      {userType === 'generaliste' && <FormInput id="speciality" label="Mention spéciale" value="Médecine générale" onChange={handleInputChange} readOnly />}
      {userType === 'specialiste' || userType === 'expert' ? <FormSelect id="speciality" label="Spécialité médicale" required value={formData.speciality} onChange={handleSelectChange} options={[{
      value: 'cardiologie',
      label: 'Cardiologie'
    }, {
      value: 'dermatologie',
      label: 'Dermatologie'
    }, {
      value: 'neurologie',
      label: 'Neurologie'
    }, {
      value: 'pediatrie',
      label: 'Pédiatrie'
    }, {
      value: 'psychiatrie',
      label: 'Psychiatrie'
    }, {
      value: 'radiologie',
      label: 'Radiologie'
    }, {
      value: 'chirurgie',
      label: 'Chirurgie générale'
    }, {
      value: 'gynecologie',
      label: 'Gynécologie-obstétrique'
    }, {
      value: 'anesthesie',
      label: 'Anesthésie-réanimation'
    }, {
      value: 'autre',
      label: 'Autre'
    }]} /> : null}
      {userType === 'etudiant' ? <>
          <FormInput id="university" label="Faculté de médecine" required value={formData.university} onChange={handleInputChange} />
          <FormInput id="hospital" label="Hôpital de stage/internat" value={formData.hospital} onChange={handleInputChange} />
        </> : <>
          <FormInput id="facility" label="Établissement de rattachement" icon={<HospitalIcon size={18} />} value={formData.facility} onChange={handleInputChange} />
          <FormSelect id="experience" label="Années d'expérience" value={formData.experience} onChange={handleSelectChange} options={[{
        value: '0-2',
        label: '0-2 ans'
      }, {
        value: '3-5',
        label: '3-5 ans'
      }, {
        value: '6-10',
        label: '6-10 ans'
      }, {
        value: '11-20',
        label: '11-20 ans'
      }, {
        value: '20+',
        label: 'Plus de 20 ans'
      }]} />
        </>}
    </div>;
  // Step 3 for expert: Expertise profile
  const renderExpertiseProfileStep = () => <div className="space-y-4">
      <div className="mb-4">
        <label htmlFor="biography" className="block text-sm font-medium text-gray-200 mb-1">
          Biographie professionnelle
        </label>
        <textarea id="biography" rows={4} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00A7A7] focus:border-transparent outline-none text-white placeholder-gray-400 transition-all duration-300" placeholder="Partagez votre parcours, expertise et spécialités..." value={formData.biography} onChange={e => setFormData(prev => ({
        ...prev,
        biography: e.target.value
      }))}></textarea>
        <p className="mt-1 text-xs text-gray-400">
          Cette biographie sera visible par les autres professionnels sur la
          plateforme
        </p>
      </div>
    </div>;
  // Step 3/4: Documents upload
  const renderDocumentsStep = () => <div className="space-y-4">
      <FileUpload label="Diplôme médical" required />
      <FileUpload label={userType === 'etudiant' ? 'Carte étudiant' : 'Carte professionnelle'} required />
      {userType === 'etudiant' && <FileUpload label="Certificat de scolarité" required />}
      {userType === 'expert' && <FileUpload label="CV détaillé" required />}
      <div className="space-y-3 mt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="terms" name="terms" type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#00A7A7] focus:ring-[#00A7A7] focus:ring-offset-gray-800" />
          </div>
          <div className="ml-3">
            <label htmlFor="terms" className="text-sm text-gray-300">
              J'accepte les{' '}
              <a href="#" className="text-[#00A7A7] hover:text-[#008B8B]">
                conditions d'utilisation
              </a>{' '}
              et la{' '}
              <a href="#" className="text-[#00A7A7] hover:text-[#008B8B]">
                politique de confidentialité
              </a>
            </label>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="rgpd" name="rgpd" type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#00A7A7] focus:ring-[#00A7A7] focus:ring-offset-gray-800" />
          </div>
          <div className="ml-3">
            <label htmlFor="rgpd" className="text-sm text-gray-300">
              J'accepte le traitement de mes données selon les normes RGPD
            </label>
          </div>
        </div>
      </div>
    </div>;
  // Render the current step content based on user type and step
  const renderStepContent = () => {
    if (currentStep === 0) {
      return renderPersonalInfoStep();
    } else if (currentStep === 1) {
      return renderProfessionalInfoStep();
    } else if (currentStep === 2 && userType === 'expert') {
      return renderExpertiseProfileStep();
    } else {
      return renderDocumentsStep();
    }
  };
  // Render the registration form with steps
  const renderRegistrationForm = () => {
    const steps = getSteps();
    const isLastStep = currentStep === steps.length - 1;
    return <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          <div className="flex justify-between mt-8">
            <button type="button" onClick={handleBack} className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-300">
              <ArrowLeftIcon size={16} className="mr-1.5" />
              Retour
            </button>
            {!isLastStep ? <button type="button" onClick={handleNext} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#00A7A7] rounded-lg hover:bg-[#008B8B] transition-colors duration-300">
                Suivant
                <ChevronRightIcon size={16} className="ml-1.5" />
              </button> : <button type="submit" className="flex items-center px-6 py-2 text-sm font-medium text-white bg-[#00A7A7] rounded-lg hover:bg-[#008B8B] transition-colors duration-300">
                Créer mon compte
              </button>}
          </div>
        </form>
      </div>;
  };
  return <BackgroundAnimation>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <Logo />
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              {userType ? 'Inscription' : 'MediCollab'}
            </h2>
            {userType === null ? renderUserTypeSelection() : renderRegistrationForm()}
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <span className="mr-1">🔒</span> Vérification sous 24h
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Déjà inscrit ?{' '}
              <Link to="/" className="text-[#00A7A7] hover:text-[#008B8B] font-medium transition-colors duration-300">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </BackgroundAnimation>;
};
export default Register;