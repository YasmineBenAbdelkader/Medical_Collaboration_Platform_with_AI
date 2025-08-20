import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StethoscopeIcon, UserPlusIcon, GraduationCapIcon, AwardIcon, ArrowLeftIcon, ChevronRightIcon, HospitalIcon, MailIcon, LockIcon } from 'lucide-react';
import { BackgroundAnimation } from '../components/ui/BackgroundAnimation';
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
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Helper: check if all required fields for the current step are filled
  const isStepValid = () => {
    if (currentStep === 0) {
      // Personal info step
      return (
        formData.firstName.trim() &&
        formData.lastName.trim() &&
        formData.email.trim() &&
        formData.password.trim() &&
        formData.confirmPassword.trim()
      );
    } else if (currentStep === 1) {
      if (userType === 'etudiant') {
        return (
          formData.studentId.trim() &&
          formData.university.trim() &&
          formData.hospital.trim()
        );
      } else {
        return (
          formData.rppsNumber.trim() &&
          (userType === 'generaliste' || formData.speciality.trim()) &&
          formData.facility.trim() &&
          formData.experience.trim()
        );
      }
    } else if (currentStep === 2 && userType === 'expert') {
      return formData.biography.trim();
    }
    // Documents step: always allow (handled by file upload required)
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep(prev => prev + 1);
    }
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
    console.log({ userType, formData });
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
  const renderUserTypeSelection = () => (
    <div className="w-full max-w-4xl mx-auto">
      <p className="text-base text-gray-700 mb-8 text-center font-medium">
        Sélectionnez votre profil professionnel pour accéder aux fonctionnalités adaptées à votre pratique médicale
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Médecin Généraliste */}
        <div 
          onClick={() => setUserType('generaliste')} 
          className="border-2 border-gray-200 hover:border-[#00A7A7] bg-white/80 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          <div className="bg-[#00A7A7]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <StethoscopeIcon className="h-7 w-7 text-[#00A7A7]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Médecin Généraliste
          </h3>
          <p className="text-gray-600 text-sm">Pratique de médecine générale et cas multidisciplinaires</p>
        </div>

        {/* Médecin Spécialiste */}
        <div 
          onClick={() => setUserType('specialiste')} 
          className="border-2 border-gray-200 hover:border-[#00A7A7] bg-white/80 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          <div className="bg-[#00A7A7]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <UserPlusIcon className="h-7 w-7 text-[#00A7A7]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Médecin Spécialiste
          </h3>
          <p className="text-gray-600 text-sm">Expertise dans une spécialité médicale définie</p>
        </div>

        {/* Étudiant en Médecine */}
        <div 
          onClick={() => setUserType('etudiant')} 
          className="border-2 border-blue-200 bg-blue-50/30 hover:border-blue-400 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          <div className="bg-blue-500/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <GraduationCapIcon className="h-7 w-7 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Étudiant en Médecine</h3>
          <p className="text-gray-600 text-sm">Apprentissage collaboratif et accès aux ressources pédagogiques</p>
        </div>

        {/* Expert Médical Certifié */}
        <div 
          onClick={() => setUserType('expert')} 
          className="border-2 border-[#00A7A7] bg-teal-50/30 ring-2 ring-[#00A7A7]/20 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          <div className="bg-[#00A7A7]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <AwardIcon className="h-7 w-7 text-[#00A7A7]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Médical Certifié</h3>
          <p className="text-gray-600 text-sm">Autorité médicale reconnue pour consultations d'expertise</p>
        </div>
      </div>
    </div>
  );

  // Password strength evaluation function
  const evaluatePasswordStrength = (password: string) => {
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score++;
    else feedback.push("au moins 8 caractères");
    
    // Uppercase check
    if (/[A-Z]/.test(password)) score++;
    else feedback.push("une majuscule");
    
    // Lowercase check
    if (/[a-z]/.test(password)) score++;
    else feedback.push("une minuscule");
    
    // Number check
    if (/\d/.test(password)) score++;
    else feedback.push("un chiffre");
    
    // Special character check
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    else feedback.push("un caractère spécial");
    
    // Long password bonus
    if (password.length >= 12) score++;
    
    let strength = 'Très faible';
    let color = 'bg-red-500';
    let textColor = 'text-red-600';
    
    if (score >= 4) {
      strength = 'Excellent';
      color = 'bg-green-500';
      textColor = 'text-green-600';
    } else if (score >= 3) {
      strength = 'Fort';
      color = 'bg-blue-500';
      textColor = 'text-blue-600';
    } else if (score >= 2) {
      strength = 'Correct';
      color = 'bg-yellow-500';
      textColor = 'text-yellow-600';
    } else if (score >= 1) {
      strength = 'Faible';
      color = 'bg-orange-500';
      textColor = 'text-orange-600';
    }
    
    return { score, strength, color, textColor, feedback };
  };

  // Check if passwords match
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const showPasswordMismatch = formData.confirmPassword && !passwordsMatch;

  // Step 1: Personal information (common for all user types)
  const renderPersonalInfoStep = () => {
    const passwordStrength = formData.password ? evaluatePasswordStrength(formData.password) : null;
    
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="firstName"
            label="Prénom"
            required
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <FormInput
            id="lastName"
            label="Nom de famille"
            required
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        
        <FormInput
          id="email"
          label="Adresse e-mail professionnelle"
          type="email"
          icon={<MailIcon size={18} />}
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        
        <div className="space-y-3">
          <FormInput
            id="password"
            label="Créer un mot de passe sécurisé"
            type="password"
            icon={<LockIcon size={18} />}
            required
            value={formData.password}
            onChange={handleInputChange}
            showPasswordToggle={false}
          />
          
          {/* Enhanced Password strength indicator */}
          {passwordStrength && (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Force du mot de passe</span>
                <span className={`text-sm font-semibold ${passwordStrength.textColor}`}>
                  {passwordStrength.strength}
                </span>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      level <= passwordStrength.score ? passwordStrength.color : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
              
              {passwordStrength.feedback.length > 0 && (
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Améliorations suggérées : </span>
                  {passwordStrength.feedback.join(', ')}
                </div>
              )}
              
              {passwordStrength.score >= 4 && (
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <span className="mr-1">✓</span>
                  Mot de passe sécurisé pour un environnement médical
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <FormInput
            id="confirmPassword"
            label="Confirmer le mot de passe"
            type="password"
            icon={<LockIcon size={18} />}
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault()}
            onCopy={(e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault()}
            showPasswordToggle={false}
          />
          <p className="text-xs text-gray-500 mt-1">
            Pour des raisons de sécurité, le copier/coller est désactivé sur ce champ. Veuillez saisir à nouveau votre mot de passe.
          </p>
          
          {/* Password match indicator */}
          {formData.confirmPassword && (
            <div className={`text-xs flex items-center mt-1 ${
              passwordsMatch ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="mr-1">{passwordsMatch ? '✓' : '✗'}</span>
              {passwordsMatch ? 'Les mots de passe correspondent' : 'Les mots de passe ne correspondent pas'}
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <strong>Sécurité renforcée :</strong> Vos données médicales nécessitent un mot de passe robuste avec au minimum 8 caractères, incluant majuscules, minuscules, chiffres et symboles.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Step 2: Professional information for doctors
  const renderProfessionalInfoStep = () => (
    <div className="space-y-5">
      <FormInput
        id={userType === 'etudiant' ? 'studentId' : 'rppsNumber'}
        label={userType === 'etudiant' ? "Numéro d'inscription universitaire" : 'Numéro RPPS (Répertoire Partagé des Professionnels de Santé)'}
        required
        value={userType === 'etudiant' ? formData.studentId : formData.rppsNumber}
        onChange={handleInputChange}
      />

      {userType === 'generaliste' && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <FormInput
            id="speciality"
            label="Discipline médicale"
            value="Médecine générale"
            onChange={handleInputChange}
            readOnly
          />
          <p className="text-xs text-teal-700 mt-2">
            ✓ Spécialité reconnue en médecine de premier recours
          </p>
        </div>
      )}

      {(userType === 'specialiste' || userType === 'expert') ? (
        <FormSelect
          id="speciality"
          label="Spécialité médicale certifiée"
          required
          value={formData.speciality}
          onChange={handleSelectChange}
          options={[
            { value: '', label: 'Sélectionnez votre spécialité' },
            { value: 'anesthesie-reanimation', label: 'Anesthésie-Réanimation' },
            { value: 'cardiologie', label: 'Cardiologie et Maladies Vasculaires' },
            { value: 'chirurgie-generale', label: 'Chirurgie Générale' },
            { value: 'chirurgie-orthopedique', label: 'Chirurgie Orthopédique et Traumatologique' },
            { value: 'dermatologie', label: 'Dermatologie et Vénéréologie' },
            { value: 'endocrinologie', label: 'Endocrinologie-Diabétologie-Nutrition' },
            { value: 'gastroenterologie', label: 'Gastroentérologie et Hépatologie' },
            { value: 'gynecologie-obstetrique', label: 'Gynécologie-Obstétrique' },
            { value: 'medecine-interne', label: 'Médecine Interne' },
            { value: 'nephrologie', label: 'Néphrologie' },
            { value: 'neurologie', label: 'Neurologie' },
            { value: 'oncologie', label: 'Oncologie Médicale' },
            { value: 'ophtalmologie', label: 'Ophtalmologie' },
            { value: 'orl', label: 'Oto-Rhino-Laryngologie' },
            { value: 'pediatrie', label: 'Pédiatrie' },
            { value: 'pneumologie', label: 'Pneumologie' },
            { value: 'psychiatrie', label: 'Psychiatrie' },
            { value: 'radiologie', label: 'Radiologie et Imagerie Médicale' },
            { value: 'rhumatologie', label: 'Rhumatologie' },
            { value: 'urologie', label: 'Urologie' },
            { value: 'autre', label: 'Autre spécialité' }
          ]}
        />
      ) : null}

      {userType === 'etudiant' ? (
        <div className="space-y-4">
          <FormInput
            id="university"
            label="Faculté de médecine d'inscription"
            required
            value={formData.university}
            onChange={handleInputChange}
          />
          <FormInput
            id="hospital"
            label="Établissement de formation (CHU/Hôpital)"
            required
            value={formData.hospital}
            onChange={handleInputChange}
          />
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
            <p className="text-sm text-blue-800">
              <strong>Note :</strong> Les étudiants bénéficient d'un accès adapté à leur niveau de formation avec supervision pédagogique.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <FormInput
            id="facility"
            label="Établissement principal d'exercice"
            required
            icon={<HospitalIcon size={18} />}
            value={formData.facility}
            onChange={handleInputChange}
          />
          <FormSelect
            id="experience"
            label="Expérience professionnelle"
            required
            value={formData.experience}
            onChange={handleSelectChange}
            options={[
              { value: '', label: 'Sélectionnez votre niveau d\'expérience' },
              { value: '0-2', label: 'Jeune praticien (0-2 ans)' },
              { value: '3-5', label: 'Praticien confirmé (3-5 ans)' },
              { value: '6-10', label: 'Praticien expérimenté (6-10 ans)' },
              { value: '11-20', label: 'Praticien senior (11-20 ans)' },
              { value: '20+', label: 'Expert reconnu (plus de 20 ans)' }
            ]}
          />
        </div>
      )}
    </div>
  );

  // Step 3 for expert: Expertise profile
  const renderExpertiseProfileStep = () => (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-2">
          <AwardIcon className="h-5 w-5 text-teal-600 mr-2" />
          <h3 className="font-semibold text-teal-800">Profil d'Expert Médical</h3>
        </div>
        <p className="text-sm text-teal-700">
          Valorisez votre expertise pour partager vos connaissances avec la communauté médicale
        </p>
      </div>
      
      <div className="space-y-3">
        <label htmlFor="biography" className="block text-sm font-medium text-gray-700">
          Présentation professionnelle détaillée
        </label>
        <textarea
          id="biography"
          rows={6}
          maxLength={1000}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A7A7] focus:border-transparent outline-none transition-all duration-300 resize-none"
          required
          value={formData.biography}
          onChange={e => setFormData(prev => ({
            ...prev,
            biography: e.target.value
          }))}
        ></textarea>
        <div className="flex justify-between text-xs text-gray-500">
          <p>Cette biographie renforcera votre crédibilité en tant qu'expert</p>
          <p>{formData.biography.length}/1000 caractères</p>
        </div>
      </div>
      
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-800">
              <strong>Statut Expert :</strong> Votre profil bénéficiera d'une visibilité renforcée et vous pourrez participer à des consultations complexes, mentorat et formations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3/4: Documents upload
  const renderDocumentsStep = () => (
    <div className="space-y-4">
      <FileUpload label="Diplôme médical" required />
      <FileUpload 
        label={userType === 'etudiant' ? 'Carte étudiant' : 'Carte professionnelle'} 
        required 
      />
      {userType === 'etudiant' && (
        <FileUpload label="Certificat de scolarité" required />
      )}
      {userType === 'expert' && (
        <FileUpload label="CV détaillé" required />
      )}
      
      <div className="space-y-3 mt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#00A7A7] focus:ring-[#00A7A7]"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="terms" className="text-sm text-gray-700">
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
            <input
              id="rgpd"
              name="rgpd"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#00A7A7] focus:ring-[#00A7A7]"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="rgpd" className="text-sm text-gray-700">
              J'accepte le traitement de mes données selon les normes RGPD
            </label>
          </div>
        </div>
      </div>
    </div>
  );

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

    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              <ArrowLeftIcon size={16} className="mr-1.5" />
              Retour
            </button>
            
            {!isLastStep ? (
              <button
                type="button"
                onClick={handleNext}
                className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-300 ${isStepValid() ? 'bg-[#00A7A7] hover:bg-[#008B8B]' : 'bg-gray-300 cursor-not-allowed'}`}
                disabled={!isStepValid()}
              >
                Suivant
                <ChevronRightIcon size={16} className="ml-1.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-6 py-2 text-sm font-medium text-white bg-[#00A7A7] rounded-lg hover:bg-[#008B8B] transition-colors duration-300"
              >
                Créer mon compte
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };

  return (
    <BackgroundAnimation>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              {userType ? 'Inscription' : 'Choisissez le type de compte à créer'}
            </h2>
            
            {userType === null ? renderUserTypeSelection() : renderRegistrationForm()}
          </div>
          
          <div className="mt-6 text-center">
           
            <p className="text-sm text-gray-600 mt-4">
              Déjà inscrit ?{' '}
              <Link
                to="/login"
                className="text-[#00A7A7] hover:text-[#008B8B] font-medium transition-colors duration-300"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </BackgroundAnimation>
  );
};

export default Register;