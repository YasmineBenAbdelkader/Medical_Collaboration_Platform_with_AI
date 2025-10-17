import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  StethoscopeIcon,
  AwardIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  MailIcon,
  LockIcon,
  XIcon,
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  BookOpenIcon,
  BriefcaseIcon,
  FileTextIcon,
} from "lucide-react";
import { BackgroundAnimation } from "../components/ui/BackgroundAnimation";
import { FormInput } from "../components/ui/FormInput";
import { Stepper } from "../components/ui/Stepper";

// Types
type UserType = "medecin" | "expert" | null;

// Options pour les listes déroulantes
const educationOptions = [
  { value: "", label: "Sélectionner un établissement" },
  { value: "paris-descartes", label: "Université Paris Descartes" },
  { value: "paris-diderot", label: "Université Paris Diderot" },
  { value: "pierre-marie-curie", label: "Université Pierre et Marie Curie" },
  { value: "rennes", label: "Université de Rennes 1" },
  { value: "lyon", label: "Université Claude Bernard Lyon 1" },
  { value: "bordeaux", label: "Université de Bordeaux" },
  { value: "marseille", label: "Université Aix-Marseille" },
  { value: "strasbourg", label: "Université de Strasbourg" },
  { value: "montpellier", label: "Université de Montpellier" },
  { value: "toulouse", label: "Université Paul Sabatier Toulouse III" },
  { value: "nantes", label: "Université de Nantes" },
  { value: "lille", label: "Université de Lille" },
  { value: "angers", label: "Université d'Angers" },
  { value: "autres", label: "Autre établissement" },
];

const specialityOptions = [
  { value: "", label: "Sélectionner une spécialité" },
  { value: "generaliste", label: "Médecine Générale" },
  { value: "cardiologie", label: "Cardiologie" },
  { value: "dermatologie", label: "Dermatologie" },
  { value: "gynecologie", label: "Gynécologie" },
  { value: "pediatrie", label: "Pédiatrie" },
  { value: "psychiatrie", label: "Psychiatrie" },
  { value: "radiologie", label: "Radiologie" },
  { value: "chirurgie", label: "Chirurgie" },
  { value: "anesthesie", label: "Anesthésiologie" },
  { value: "neurologie", label: "Neurologie" },
  { value: "ophtalmologie", label: "Ophtalmologie" },
  { value: "orthopedie", label: "Orthopédie" },
  { value: "otorhinolaryngologie", label: "Oto-rhino-laryngologie" },
  { value: "autres", label: "Autre spécialité" },
];

const facilityOptions = [
  { value: "hopital-paris", label: "Hôpital de Paris" },
  { value: "hopital-lyon", label: "Hôpital de Lyon" },
  { value: "hopital-marseille", label: "Hôpital de Marseille" },
  { value: "chu-nantes", label: "CHU de Nantes" },
  { value: "chu-rennes", label: "CHU de Rennes" },
  { value: "chu-bordeaux", label: "CHU de Bordeaux" },
  { value: "chu-toulouse", label: "CHU de Toulouse" },
  { value: "chu-lille", label: "CHU de Lille" },
  { value: "hopital-necker", label: "Hôpital Necker-Enfants Malades" },
  { value: "hopital-pitie", label: "Hôpital de la Pitié-Salpêtrière" },
  { value: "hopital-saint-louis", label: "Hôpital Saint-Louis" },
  { value: "hopital-europeen", label: "Hôpital Européen Georges-Pompidou" },
  { value: "institut-curie", label: "Institut Curie" },
  { value: "institut-gustave-roussy", label: "Institut Gustave Roussy" },
  { value: "clinique-privee", label: "Clinique privée" },
];

const expertiseTypeOptions = [
  { value: "", label: "Sélectionner un type d'expertise" },
  { value: "clinique", label: "Expertise clinique" },
  { value: "recherche", label: "Expertise en recherche" },
  { value: "enseignement", label: "Expertise en enseignement" },
  { value: "evaluation", label: "Expertise en évaluation" },
  { value: "conseil", label: "Expertise en conseil" },
  { value: "formation", label: "Expertise en formation" },
  { value: "audit", label: "Expertise en audit" },
  { value: "autre", label: "Autre type d'expertise" },
];

// Composant Select amélioré
const CustomSelect = ({ id, label, value, onChange, options, multiple = false, required = false, icon = null }: {
  id: string;
  label: string;
  value: any;
  onChange: (e: any) => void;
  options: any[];
  multiple?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      onChange({ target: { id, value: selectedOptions } });
    } else {
      onChange({ target: { id, value: e.target.value } });
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <select
          id={id}
          value={value}
          onChange={handleChange}
          multiple={multiple}
          required={required}
          className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 appearance-none ${icon ? 'pl-10' : ''}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Composant Upload stylisé amélioré
const UploadField = ({ id, label, file, onChange, required = false }: {
  id: string;
  label: string;
  file: File | null;
  onChange: (e: any) => void;
  required?: boolean;
}) => (
  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 transition-all duration-300 relative mb-4 bg-gray-50 hover:bg-gray-100">
    <label htmlFor={id} className="flex flex-col items-center w-full h-full cursor-pointer">
      <div className="bg-white p-3 rounded-full shadow-sm mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-teal-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
          />
        </svg>
      </div>
      <span className="text-gray-600 font-medium text-center mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</span>
      <span className="text-gray-500 text-sm text-center">{file ? file.name : "Glissez-déposez ou cliquez pour sélectionner"}</span>
      <input type="file" id={id} className="hidden" onChange={onChange} required={required} />
    </label>
  </div>
);


const Register = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    rppsNumber: "",
    professionalId: "",
    speciality: "",
    facilities: [],
    university: "",
    diplomaFile: null,
    professionalCard: null,
    cvFile: null,
    profileTitle: "",
    biography: "",
    experiences: [],
    benevolat: [],
    missions: "",
    expertiseDomain: "",
    profileImage: null,
    bannerImage: null,
    address: "",
    phone: "",
    letterFile: null,
    profileAttestation: null,
    // Nouveaux champs pour les experts
    expertiseType: "",
    certifications: [],
    expertiseExperience: "",
    officialNomination: "",
    publications: [],
    motivationLetter: null,
    missionAvailability: "",
    expertBiography: "",
    // Champs pour les consentements
    acceptTerms: false,
    acceptPrivacy: false,
  });

  // Gestion des inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData((prev: any) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev: any) => ({ ...prev, [id]: String(value) }));
    }
  };

  // Ajouter une expérience
  const addExperience = () => {
    setFormData((prev: any) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          title: "",
          institution: "",
          date: "",
          description: "",
          skills: "",
          certificate: null,
        },
      ],
    }));
  };

  // Supprimer une expérience
  const removeExperience = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      experiences: prev.experiences.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: any) => {
    const updated = [...formData.experiences];
    updated[index][field] = value;
    setFormData((prev: any) => ({ ...prev, experiences: updated }));
  };

  // Bénévolat handlers
  const addBenevolat = () => {
    setFormData((prev: any) => ({
      ...prev,
      benevolat: [
        ...prev.benevolat,
        {
          title: "",
          institution: "",
          date: "",
          description: "",
          skills: "",
          certificate: null,
        },
      ],
    }));
  };

  const removeBenevolat = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      benevolat: prev.benevolat.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleBenevolatChange = (index: number, field: string, value: any) => {
    const updated = [...formData.benevolat];
    updated[index][field] = value;
    setFormData((prev: any) => ({ ...prev, benevolat: updated }));
  };

  // Handlers pour les publications
  const addPublication = () => {
    setFormData((prev: any) => ({
      ...prev,
      publications: [
        ...prev.publications,
        {
          title: "",
          about: "",
          date: "",
          link: "",
        },
      ],
    }));
  };

  const removePublication = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      publications: prev.publications.filter((_: any, i: number) => i !== index),
    }));
  };

  const handlePublicationChange = (index: number, field: string, value: any) => {
    const updated = [...formData.publications];
    updated[index][field] = value;
    setFormData((prev: any) => ({ ...prev, publications: updated }));
  };

  // Handlers pour les certifications
  const addCertification = () => {
    setFormData((prev: any) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          institution: "",
          date: "",
          file: null,
        },
      ],
    }));
  };

  const removeCertification = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      certifications: prev.certifications.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleCertificationChange = (index: number, field: string, value: any) => {
    const updated = [...formData.certifications];
    updated[index][field] = value;
    setFormData((prev: any) => ({ ...prev, certifications: updated }));
  };

  const getSteps = () => {
    switch (userType) {
      case "medecin":
        return ["Informations personnelles", "Profession", "Connexion", "Profil", "Consentements"];
      case "expert":
        return ["Informations", "Parcours académique", "Expertise", "Profession", "Profil", "Consentements"];
      default:
        return [];
    }
  };

  // Password strength helpers
  const passwordChecks = {
    length: formData.password?.length >= 8,
    upper: /[A-Z]/.test(formData.password || ""),
    lower: /[a-z]/.test(formData.password || ""),
    number: /[0-9]/.test(formData.password || ""),
    special: /[^A-Za-z0-9]/.test(formData.password || ""),
  };
  const passwordStrong = Object.values(passwordChecks).filter(Boolean).length >= 4;
  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  const isStepValid = () => {
    // Médecin flow
    if (userType === "medecin") {
      if (currentStep === 0) {
        return (
          formData.firstName &&
          formData.lastName &&
          formData.birthDate &&
          formData.gender &&
          formData.address &&
          formData.phone
        );
      }
      if (currentStep === 1) {
        return (
          (formData.professionalId || formData.rppsNumber) &&
          formData.speciality &&
          formData.experience &&
          formData.facilities && formData.facilities.length > 0 &&
          formData.university &&
          formData.diplomaFile &&
          formData.professionalCard &&
          formData.cvFile
        );
      }
      if (currentStep === 2) {
        return (
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          passwordStrong &&
          passwordsMatch
        );
      }
      if (currentStep === 3) {
        return formData.profileTitle && formData.biography && formData.profileImage && formData.bannerImage;
      }
      if (currentStep === 4) {
        return formData.acceptTerms && formData.acceptPrivacy;
      }
    }

    // Expert flow
    if (userType === "expert") {
      if (currentStep === 0) {
        return (
          formData.firstName &&
          formData.lastName &&
          formData.birthDate &&
          formData.gender &&
          formData.address &&
          formData.phone
        );
      }
      if (currentStep === 1) {
        return (
          formData.university &&
          formData.speciality &&
          formData.diplomaFile
        );
      }
      if (currentStep === 2) {
        return (
          formData.expertiseDomain &&
          formData.expertiseType &&
          formData.expertiseExperience &&
          formData.officialNomination &&
          formData.motivationLetter
        );
      }
      if (currentStep === 3) {
        return (
          formData.rppsNumber &&
          formData.facilities && formData.facilities.length > 0 &&
          formData.experience &&
          formData.professionalCard &&
          formData.cvFile
        );
      }
      if (currentStep === 4) {
        return formData.profileTitle && formData.biography && formData.profileImage && formData.bannerImage && formData.missionAvailability;
      }
      if (currentStep === 5) {
        return formData.acceptTerms && formData.acceptPrivacy;
      }
    }
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        if (userType === "medecin" || userType === "expert") {
          return (
            <>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput 
                  id="firstName" 
                  label="Prénom" 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                  required 
                  size="lg" 
                  icon={<UserIcon className="w-5 h-5 text-gray-500" />}
                />
                <FormInput 
                  id="lastName" 
                  label="Nom" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  required 
                  size="lg" 
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="birthDate"
                  label="Date de naissance"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  size="lg"
                  icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                />
                <CustomSelect
                  id="gender"
                  label="Sexe"
                  value={formData.gender}
                  onChange={handleInputChange}
                  options={[
                    { value: "", label: "Sélectionner" },
                    { value: "homme", label: "Homme" },
                    { value: "femme", label: "Femme" },
                  ]}
                  required={true}
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput 
                  id="address" 
                  label="Adresse" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  size="lg" 
                  required
                  icon={<MapPinIcon className="w-5 h-5 text-gray-500" />}
                />
                <FormInput 
                  id="phone" 
                  label="Téléphone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  size="lg" 
                  required
                  icon={<PhoneIcon className="w-5 h-5 text-gray-500" />}
                />
              </div>
            </>
          );
        }
        return null;

      case 1:
        if (userType === "medecin") {
          return (
            <>
              <FormInput 
                id="professionalId" 
                label="Numéro d'identification professionnel / RPPS / Ordre" 
                value={formData.professionalId}
                onChange={handleInputChange}
                required={true}
                size="lg"
              />
              <CustomSelect
                id="speciality"
                label="Spécialité"
                value={formData.speciality}
                onChange={handleInputChange}
                options={specialityOptions}
                required={true}
              />
              <FormInput 
                id="experience" 
                label="Années d'expérience" 
                value={formData.experience} 
                onChange={handleInputChange} 
                required={true}
                type="text" 
                size="lg" 
                icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
              />
              <CustomSelect
                id="facilities"
                label="Hôpital / Clinique actuelle"
                value={formData.facilities}
                onChange={handleInputChange}
                options={facilityOptions}
                required={true}
                icon={<BriefcaseIcon className="w-5 h-5 text-gray-500" />}
              />
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Carte professionnelle
                </h3>
                <UploadField 
                  id="professionalCard" 
                  label="Téléverser votre carte professionnelle" 
                  file={formData.professionalCard} 
                  onChange={handleInputChange} 
                  required={true} 
                />
              </div>
              <CustomSelect
                id="university"
                label="Université"
                value={formData.university}
                onChange={handleInputChange}
                options={educationOptions}
                required={true}
                icon={<BookOpenIcon className="w-5 h-5 text-gray-500" />}
              />
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Diplôme
                </h3>
                <UploadField 
                  id="diplomaFile" 
                  label="Téléverser votre diplôme" 
                  file={formData.diplomaFile} 
                  onChange={handleInputChange} 
                  required={true}
                />
              </div>
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Curriculum Vitae
                </h3>
                <UploadField 
                  id="cvFile" 
                  label="Téléverser votre CV" 
                  file={formData.cvFile} 
                  onChange={handleInputChange} 
                  required={true}
                />
              </div>
            </>
          );
        } else {
          return (
            <>
              <CustomSelect
                id="university"
                label="Établissement d'éducation"
                value={formData.university}
                onChange={handleInputChange}
                options={educationOptions}
                required={true}
                icon={<BookOpenIcon className="w-5 h-5 text-gray-500" />}
              />
              <CustomSelect
                id="speciality"
                label="Spécialité"
                value={formData.speciality}
                onChange={handleInputChange}
                options={specialityOptions}
                required={true}
              />
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Diplôme
                </h3>
                <UploadField 
                  id="diplomaFile" 
                  label="Téléverser votre diplôme ou attestation" 
                  file={formData.diplomaFile} 
                  onChange={handleInputChange} 
                  required={true}
                />
              </div>
            </>
          );
        }

      case 2:
        if (userType === "medecin") {
          return (
            <>
              <FormInput
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                size="lg"
                icon={<MailIcon className="w-5 h-5 text-gray-500" />}
              />
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormInput
                    id="password"
                    label="Mot de passe"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    size="lg"
                    icon={<LockIcon className="w-5 h-5 text-gray-500" />}
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    <div className={passwordChecks.length ? "text-green-600" : "text-gray-500"}>• 8+ caractères</div>
                    <div className={passwordChecks.upper ? "text-green-600" : "text-gray-500"}>• Une majuscule</div>
                    <div className={passwordChecks.lower ? "text-green-600" : "text-gray-500"}>• Une minuscule</div>
                    <div className={passwordChecks.number ? "text-green-600" : "text-gray-500"}>• Un chiffre</div>
                    <div className={passwordChecks.special ? "text-green-600" : "text-gray-500"}>• Un caractère spécial</div>
                  </div>
                </div>
                <div>
                  <FormInput
                    id="confirmPassword"
                    label="Confirmer le mot de passe"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={true}
                    size="lg"
                  />
                  {!passwordsMatch && formData.confirmPassword && (
                    <div className="text-xs text-red-600 mt-1">Les mots de passe ne correspondent pas.</div>
                  )}
                </div>
              </div>
            </>
          );
        }
        if (userType === "expert") {
          return (
            <>
              {/* Section Expertise */}
              <div className="md:col-span-2 mb-8 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-amber-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <AwardIcon className="w-6 h-6 mr-2" />
                  Expertise
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormInput 
                    id="expertiseDomain" 
                    label="Domaine d'expertise" 
                    value={formData.expertiseDomain} 
                    onChange={handleInputChange} 
                    size="lg" 
                    placeholder="Ex: Cardiologie interventionnelle"
                    required={true}
                  />
                  <CustomSelect
                    id="expertiseType"
                    label="Type d'expertise"
                    value={formData.expertiseType}
                    onChange={handleInputChange}
                    options={expertiseTypeOptions}
                    required={true}
                  />
                </div>

                <FormInput 
                  id="expertiseExperience" 
                  label="Expérience d'expertise (années)" 
                  value={formData.expertiseExperience} 
                  onChange={handleInputChange} 
                  type="text"
                  size="lg" 
                  placeholder="Ex: 10"
                  required={true}
                  icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                />

                <FormInput 
                  id="officialNomination" 
                  label="Nomination officielle" 
                  value={formData.officialNomination} 
                  onChange={handleInputChange} 
                  size="lg" 
                  placeholder="Ex: Expert auprès de la HAS depuis 2020"
                  required={true}
                />

                {/* Certifications */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <FileTextIcon className="w-5 h-5 mr-2 text-amber-600" />
                    Certifications / Diplômes
                  </h4>
                  
                  {formData.certifications.map((cert: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 p-4 rounded-xl mb-4 bg-gray-50 relative">
                      <button 
                        type="button" 
                        onClick={() => removeCertification(idx)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <FormInput 
                          id={`cert-name-${idx}`}
                          label="Nom de la certification" 
                          value={cert.name} 
                          onChange={(e: any) => handleCertificationChange(idx, "name", e.target.value)} 
                          placeholder="Ex: Diplôme d'Université en Cardiologie"
                        />
                        <FormInput 
                          id={`cert-institution-${idx}`}
                          label="Institution" 
                          value={cert.institution} 
                          onChange={(e: any) => handleCertificationChange(idx, "institution", e.target.value)} 
                          placeholder="Ex: Université Paris Descartes"
                        />
                      </div>
                      
                      <FormInput 
                        id={`cert-date-${idx}`}
                        label="Date d'obtention" 
                        value={cert.date} 
                        onChange={(e: any) => handleCertificationChange(idx, "date", e.target.value)} 
                        placeholder="Ex: 2018"
                        className="mb-4"
                        icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                      />
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Document justificatif</h5>
                        <UploadField 
                          id={`cert-file-${idx}`} 
                          label="Téléverser le certificat" 
                          file={cert.file} 
                          onChange={(e: any) => handleCertificationChange(idx, "file", e.target.files?.[0])} 
                        />
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    onClick={addCertification} 
                    className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl shadow-sm hover:bg-amber-200 transition-all duration-200 flex items-center font-medium"
                  >
                    <span className="mr-2">+</span> Ajouter une certification
                  </button>
                </div>

                {/* Publications */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <FileTextIcon className="w-5 h-5 mr-2 text-amber-600" />
                    Publications / Références
                  </h4>
                  
                  {formData.publications.map((pub: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 p-4 rounded-xl mb-4 bg-gray-50 relative">
                      <button 
                        type="button" 
                        onClick={() => removePublication(idx)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                      
                      <FormInput 
                        id={`pub-title-${idx}`}
                        label="Titre de publication" 
                        value={pub.title} 
                        onChange={(e: any) => handlePublicationChange(idx, "title", e.target.value)} 
                        placeholder="Ex: Nouveaux traitements en cardiologie interventionnelle"
                        className="mb-4"
                      />
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          À propos de la publication
                        </label>
                        <textarea 
                          placeholder="Décrivez le contenu et l'importance de cette publication..." 
                          value={pub.about} 
                          onChange={(e: any) => handlePublicationChange(idx, "about", e.target.value)} 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <FormInput 
                          id={`pub-date-${idx}`}
                          label="Date de publication" 
                          value={pub.date} 
                          onChange={(e: any) => handlePublicationChange(idx, "date", e.target.value)} 
                          placeholder="Ex: 2023"
                          icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                        />
                        <FormInput 
                          id={`pub-link-${idx}`}
                          label="Lien de publication" 
                          value={pub.link} 
                          onChange={(e: any) => handlePublicationChange(idx, "link", e.target.value)} 
                          placeholder="Ex: https://pubmed.ncbi.nlm.nih.gov/..."
                        />
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    onClick={addPublication} 
                    className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl shadow-sm hover:bg-amber-200 transition-all duration-200 flex items-center font-medium"
                  >
                    <span className="mr-2">+</span> Ajouter une publication
                  </button>
                </div>

                {/* Lettre de motivation */}
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <FileTextIcon className="w-5 h-5 mr-2 text-amber-600" />
                    Lettre de motivation
                  </h4>
                  <UploadField 
                    id="motivationLetter" 
                    label="Téléverser votre lettre de motivation" 
                    file={formData.motivationLetter} 
                    onChange={handleInputChange} 
                    required={true} 
                  />
                </div>
              </div>
            </>
          );
        }
        return null;

      case 3:
        if (userType === "medecin") {
          return (
            <>
              {/* Section 1: Présentation */}
              <div className="md:col-span-2 mb-8 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-teal-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <UserIcon className="w-6 h-6 mr-2" />
                  Présentation
                </h3>
                
                <FormInput 
                  id="profileTitle" 
                  label="Titre du profil" 
                  value={formData.profileTitle} 
                  onChange={handleInputChange} 
                  size="lg" 
                  placeholder="Ex: Cardiologue expérimenté avec 15 ans d'expérience"
                  className="mb-4"
                />
                
                <div className="mb-4">
                  <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-2">
                    À propos de vous
                  </label>
                  <textarea 
                    id="biography" 
                    placeholder="Décrivez votre parcours, vos compétences et votre approche de soins..." 
                    value={formData.biography} 
                    onChange={handleInputChange} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 min-h-32"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormInput 
                    id="address" 
                    label="Adresse" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    size="lg" 
                    icon={<MapPinIcon className="w-5 h-5 text-gray-500" />}
                  />
                  <FormInput 
                    id="phone" 
                    label="Téléphone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    size="lg" 
                    icon={<PhoneIcon className="w-5 h-5 text-gray-500" />}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Photo de profil</h4>
                    <UploadField 
                      id="profileImage" 
                      label="Téléverser une photo" 
                      file={formData.profileImage} 
                      onChange={handleInputChange} 
                      required={true}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Bannière de profil</h4>
                    <UploadField 
                      id="bannerImage" 
                      label="Téléverser une bannière" 
                      file={formData.bannerImage} 
                      onChange={handleInputChange}
                      required={true} 
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Expériences */}
              <div className="md:col-span-2 mb-6 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-teal-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <BriefcaseIcon className="w-6 h-6 mr-2" />
                  Expériences professionnelles
                </h3>
                
                {formData.experiences.map((exp: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 p-5 rounded-xl mb-4 bg-gray-50 relative">
                    <button 
                      type="button" 
                      onClick={() => removeExperience(idx)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormInput 
                        id={`prof-exp-title-${idx}`}
                        label="Poste occupé" 
                        value={exp.title} 
                        onChange={(e: any) => handleExperienceChange(idx, "title", e.target.value)} 
                        placeholder="Ex: Cardiologue interventionnel"
                      />
                      <FormInput 
                        id={`prof-exp-institution-${idx}`}
                        label="Établissement professionnel" 
                        value={exp.institution} 
                        onChange={(e: any) => handleExperienceChange(idx, "institution", e.target.value)} 
                        placeholder="Ex: Hôpital Européen Georges-Pompidou"
                      />
                    </div>
                    
                    <FormInput 
                      id={`prof-exp-date-${idx}`}
                      label="Période (de - à)" 
                      value={exp.date} 
                      onChange={(e: any) => handleExperienceChange(idx, "date", e.target.value)} 
                      placeholder="Ex: Janvier 2015 - Présent"
                      className="mb-4"
                      icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                    />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description de l'expérience
                      </label>
                      <textarea 
                        placeholder="Décrivez vos responsabilités et réalisations..." 
                        value={exp.description} 
                        onChange={(e: any) => handleExperienceChange(idx, "description", e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                      />
                    </div>
                    
                    <FormInput 
                      id={`prof-exp-skills-${idx}`}
                      label="Compétences acquises" 
                      value={exp.skills} 
                      onChange={(e: any) => handleExperienceChange(idx, "skills", e.target.value)} 
                      placeholder="Ex: Angioplastie coronarienne, Pose de stent, Échocardiographie"
                      className="mb-4"
                    />
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Attestation ou certificat</h4>
                      <UploadField 
                        id={`certificate-${idx}`} 
                        label="Téléverser un document justificatif" 
                        file={exp.certificate} 
                        required={true}
                        onChange={(e: any) => handleExperienceChange(idx, "certificate", e.target.files?.[0])} 
                      />
                    </div>
                  </div>
                ))}
                
                <button 
                  type="button" 
                  onClick={addExperience} 
                  className="px-5 py-2.5 bg-teal-100 text-teal-700 rounded-xl shadow-sm hover:bg-teal-200 transition-all duration-200 flex items-center font-medium"
                >
                  <span className="mr-2">+</span> Ajouter une expérience
                </button>
              </div>

              {/* Section 3: Bénévolat */}
              <div className="md:col-span-2 mb-6 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-teal-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <BriefcaseIcon className="w-6 h-6 mr-2" />
                  Bénévolat
                </h3>
                {formData.benevolat.map((exp: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 p-5 rounded-xl mb-4 bg-gray-50 relative">
                    <button 
                      type="button" 
                      onClick={() => removeBenevolat(idx)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormInput 
                        id={`benevolat-title-${idx}`}
                        label="Poste" 
                        value={exp.title} 
                        onChange={(e: any) => handleBenevolatChange(idx, "title", e.target.value)} 
                        placeholder="Ex: Bénévole urgences"
                      />
                      <FormInput 
                        id={`benevolat-institution-${idx}`}
                        label="Établissement" 
                        value={exp.institution} 
                        onChange={(e: any) => handleBenevolatChange(idx, "institution", e.target.value)} 
                        placeholder="Ex: Croix-Rouge"
                      />
                    </div>

                    <FormInput 
                      id={`benevolat-date-${idx}`}
                      label="Période (de - à)" 
                      value={exp.date} 
                      onChange={(e: any) => handleBenevolatChange(idx, "date", e.target.value)} 
                      placeholder="Ex: 2022 - 2023"
                      className="mb-4"
                      icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                    />

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea 
                        placeholder="Décrivez vos missions..." 
                        value={exp.description} 
                        onChange={(e: any) => handleBenevolatChange(idx, "description", e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                      />
                    </div>

                    <FormInput 
                      id={`benevolat-skills-${idx}`}
                      label="Compétences acquises" 
                      value={exp.skills} 
                      onChange={(e: any) => handleBenevolatChange(idx, "skills", e.target.value)} 
                      placeholder="Ex: Triage, premiers secours"
                      className="mb-4"
                    />

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Attestation ou certificat</h4>
                      <UploadField 
                        id={`benevolat-certificate-${idx}`} 
                        label="Téléverser un document justificatif" 
                        file={exp.certificate} 
                        onChange={(e: any) => handleBenevolatChange(idx, "certificate", e.target.files?.[0])} 
                      />
                    </div>
                  </div>
                ))}

                <button 
                  type="button" 
                  onClick={addBenevolat} 
                  className="px-5 py-2.5 bg-teal-100 text-teal-700 rounded-xl shadow-sm hover:bg-teal-200 transition-all duration-200 flex items-center font-medium"
                >
                  <span className="mr-2">+</span> Ajouter une activité bénévole
                </button>
              </div>

              {/* Section 4: Attestation générale du profil */}
              <div className="md:col-span-2 mb-6 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Attestation générale
                </h3>
                <UploadField 
                  id="profileAttestation" 
                  label="Téléverser une attestation (optionnel)" 
                  file={formData.profileAttestation} 
                  onChange={handleInputChange}
                />
              </div>
            </>
          );
        }
        if (userType === "expert") {
          return (
            <>
              <FormInput 
                id="rppsNumber" 
                label="Numéro RPPS" 
                value={formData.rppsNumber} 
                onChange={handleInputChange} 
                required={true} 
                size="lg" 
              />
              <CustomSelect
                id="facilities"
                label="Établissement(s) de travail"
                value={formData.facilities}
                onChange={handleInputChange}
                options={facilityOptions}
                required={true}
                icon={<BriefcaseIcon className="w-5 h-5 text-gray-500" />}
              />
              <FormInput 
                id="experience" 
                label="Années d'expérience" 
                value={formData.experience} 
                onChange={handleInputChange} 
                required={true}
                type="text" 
                size="lg" 
                icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
              />
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Carte professionnelle
                </h3>
                <UploadField 
                  id="professionalCard" 
                  label="Téléverser votre carte professionnelle" 
                  file={formData.professionalCard} 
                  onChange={handleInputChange} 
                  required={true} 
                />
              </div>
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Curriculum Vitae
                </h3>
                <UploadField 
                  id="cvFile" 
                  label="Téléverser votre CV" 
                  file={formData.cvFile} 
                  onChange={handleInputChange} 
                  required={true} 
                />
              </div>
            </>
          );
        }
        return null;

      case 4:
        if (userType === "medecin") {
          return (
            <>
              {/* Section Consentements pour médecin */}
              <div className="md:col-span-2 mb-8 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-teal-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <FileTextIcon className="w-6 h-6 mr-2" />
                  Consentements / Validations
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData((prev: any) => ({ ...prev, acceptTerms: e.target.checked }))}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                      <span className="font-medium">J'accepte les conditions d'utilisation</span> de la plateforme de collaboration médicale. Je comprends et accepte les termes et conditions d'utilisation du service.
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="acceptPrivacy"
                      checked={formData.acceptPrivacy}
                      onChange={(e) => setFormData((prev: any) => ({ ...prev, acceptPrivacy: e.target.checked }))}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="acceptPrivacy" className="ml-3 text-sm text-gray-700">
                      <span className="font-medium">J'accepte la politique de confidentialité</span> et consens au traitement de mes données personnelles conformément au RGPD.
                    </label>
                  </div>
                </div>
              </div>
            </>
          );
        }
        if (userType === "expert") {
          return (
            <>
              {/* Section 1: Présentation */}
              <div className="md:col-span-2 mb-8 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-teal-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <UserIcon className="w-6 h-6 mr-2" />
                  Présentation
                </h3>
                
                <FormInput 
                  id="profileTitle" 
                  label="Titre du profil" 
                  value={formData.profileTitle} 
                  onChange={handleInputChange} 
                  size="lg" 
                  placeholder="Ex: Cardiologue expérimenté avec 15 ans d'expérience"
                  className="mb-4"
                />
                
                <div className="mb-4">
                  <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-2">
                    À propos de vous
                  </label>
                  <textarea 
                    id="biography" 
                    placeholder="Décrivez votre parcours, vos compétences et votre approche de soins..." 
                    value={formData.biography} 
                    onChange={handleInputChange} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 min-h-32"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormInput 
                    id="address" 
                    label="Adresse" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    size="lg" 
                    icon={<MapPinIcon className="w-5 h-5 text-gray-500" />}
                  />
                  <FormInput 
                    id="phone" 
                    label="Téléphone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    size="lg" 
                    icon={<PhoneIcon className="w-5 h-5 text-gray-500" />}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Photo de profil</h4>
                    <UploadField 
                      id="profileImage" 
                      label="Téléverser une photo" 
                      file={formData.profileImage} 
                      onChange={handleInputChange} 
                      required={true}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Bannière de profil</h4>
                    <UploadField 
                      id="bannerImage" 
                      label="Téléverser une bannière" 
                      file={formData.bannerImage} 
                      onChange={handleInputChange}
                      required={true} 
                    />
                  </div>
                </div>

                {/* Champ spécial pour les experts */}
                {userType === ("expert" as UserType) && (
                  <div className="mt-4">
                    <FormInput 
                      id="missionAvailability" 
                      label="Disponibilité missions" 
                      value={formData.missionAvailability} 
                      onChange={handleInputChange} 
                      size="lg" 
                      placeholder="Ex: Disponible 2 jours par semaine, weekends possibles"
                      required={true}
                      icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                    />
                  </div>
                )}
              </div>

              {/* Section 2: Expériences */}
              <div className="md:col-span-2 mb-6 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-teal-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <BriefcaseIcon className="w-6 h-6 mr-2" />
                  Expériences professionnelles
                </h3>
                
                {formData.experiences.map((exp: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 p-5 rounded-xl mb-4 bg-gray-50 relative">
                    <button 
                      type="button" 
                      onClick={() => removeExperience(idx)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormInput 
                        id={`prof-exp-title-${idx}`}
                        label="Poste occupé" 
                        value={exp.title} 
                        onChange={(e: any) => handleExperienceChange(idx, "title", e.target.value)} 
                        placeholder="Ex: Cardiologue interventionnel"
                      />
                      <FormInput 
                        id={`prof-exp-institution-${idx}`}
                        label="Établissement professionnel" 
                        value={exp.institution} 
                        onChange={(e: any) => handleExperienceChange(idx, "institution", e.target.value)} 
                        placeholder="Ex: Hôpital Européen Georges-Pompidou"
                      />
                    </div>
                    
                    <FormInput 
                      id={`prof-exp-date-${idx}`}
                      label="Période (de - à)" 
                      value={exp.date} 
                      onChange={(e: any) => handleExperienceChange(idx, "date", e.target.value)} 
                      placeholder="Ex: Janvier 2015 - Présent"
                      className="mb-4"
                      icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                    />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description de l'expérience
                      </label>
                      <textarea 
                        placeholder="Décrivez vos responsabilités et réalisations..." 
                        value={exp.description} 
                        onChange={(e: any) => handleExperienceChange(idx, "description", e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                      />
                    </div>
                    
                    <FormInput 
                      id={`prof-exp-skills-${idx}`}
                      label="Compétences acquises" 
                      value={exp.skills} 
                      onChange={(e: any) => handleExperienceChange(idx, "skills", e.target.value)} 
                      placeholder="Ex: Angioplastie coronarienne, Pose de stent, Échocardiographie"
                      className="mb-4"
                    />
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Attestation ou certificat</h4>
                      <UploadField 
                        id={`certificate-${idx}`} 
                        label="Téléverser un document justificatif" 
                        file={exp.certificate} 
                        required={true}
                        onChange={(e: any) => handleExperienceChange(idx, "certificate", e.target.files?.[0])} 
                      />
                    </div>
                  </div>
                ))}
                
                <button 
                  type="button" 
                  onClick={addExperience} 
                  className="px-5 py-2.5 bg-teal-100 text-teal-700 rounded-xl shadow-sm hover:bg-teal-200 transition-all duration-200 flex items-center font-medium"
                >
                  <span className="mr-2">+</span> Ajouter une expérience
                </button>
              </div>

              {/* Section 3: Bénévolat */}
              <div className="md:col-span-2 mb-6 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-teal-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <BriefcaseIcon className="w-6 h-6 mr-2" />
                  Bénévolat
                </h3>
                {formData.benevolat.map((exp: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 p-5 rounded-xl mb-4 bg-gray-50 relative">
                    <button 
                      type="button" 
                      onClick={() => removeBenevolat(idx)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormInput 
                        id={`benevolat-title-${idx}`}
                        label="Poste" 
                        value={exp.title} 
                        onChange={(e: any) => handleBenevolatChange(idx, "title", e.target.value)} 
                        placeholder="Ex: Bénévole urgences"
                      />
                      <FormInput 
                        id={`benevolat-institution-${idx}`}
                        label="Établissement" 
                        value={exp.institution} 
                        onChange={(e: any) => handleBenevolatChange(idx, "institution", e.target.value)} 
                        placeholder="Ex: Croix-Rouge"
                      />
                    </div>

                    <FormInput 
                      id={`benevolat-date-${idx}`}
                      label="Période (de - à)" 
                      value={exp.date} 
                      onChange={(e: any) => handleBenevolatChange(idx, "date", e.target.value)} 
                      placeholder="Ex: 2022 - 2023"
                      className="mb-4"
                      icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                    />

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea 
                        placeholder="Décrivez vos missions..." 
                        value={exp.description} 
                        onChange={(e: any) => handleBenevolatChange(idx, "description", e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                      />
                    </div>

                    <FormInput 
                      id={`benevolat-skills-${idx}`}
                      label="Compétences acquises" 
                      value={exp.skills} 
                      onChange={(e: any) => handleBenevolatChange(idx, "skills", e.target.value)} 
                      placeholder="Ex: Triage, premiers secours"
                      className="mb-4"
                    />

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Attestation ou certificat</h4>
                      <UploadField 
                        id={`benevolat-certificate-${idx}`} 
                        label="Téléverser un document justificatif" 
                        file={exp.certificate} 
                        onChange={(e: any) => handleBenevolatChange(idx, "certificate", e.target.files?.[0])} 
                      />
                    </div>
                  </div>
                ))}

                <button 
                  type="button" 
                  onClick={addBenevolat} 
                  className="px-5 py-2.5 bg-teal-100 text-teal-700 rounded-xl shadow-sm hover:bg-teal-200 transition-all duration-200 flex items-center font-medium"
                >
                  <span className="mr-2">+</span> Ajouter une activité bénévole
                </button>
              </div>

              {/* Section 4: Attestation générale du profil */}
              <div className="md:col-span-2 mb-6 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Attestation générale
                </h3>
                <UploadField 
                  id="profileAttestation" 
                  label="Téléverser une attestation (optionnel)" 
                  file={formData.profileAttestation} 
                  onChange={handleInputChange}
                />
              </div>

              {/* Section supplémentaire pour les experts */}
              {userType === ("expert" as UserType) && (
                <div className="md:col-span-2 mb-6 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                  <h3 className="font-semibold text-xl text-amber-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                    <AwardIcon className="w-6 h-6 mr-2" />
                    Biographie détaillée
                  </h3>
                  
                  <div className="mb-4">
                    <label htmlFor="expertBiography" className="block text-sm font-medium text-gray-700 mb-2">
                      Présentation détaillée de votre expertise
                    </label>
                    <textarea 
                      id="expertBiography" 
                      placeholder="Décrivez en détail votre parcours, vos domaines d'expertise, vos publications, vos réalisations..." 
                      value={formData.expertBiography} 
                      onChange={handleInputChange} 
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 min-h-40"
                      required
                    />
                  </div>
                  
                  <FormInput 
                    id="expertiseDomain" 
                    label="Domaine d'expertise principal" 
                    value={formData.expertiseDomain} 
                    onChange={handleInputChange} 
                    size="lg" 
                    placeholder="Ex: Cardiologie interventionnelle"
                  />
                </div>
              )}
            </>
          );
        }
        return null;

      case 5:
        if (userType === "expert") {
          return (
            <>
              {/* Section Consentements pour expert */}
              <div className="md:col-span-2 mb-8 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-amber-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <FileTextIcon className="w-6 h-6 mr-2" />
                  Consentements / Validations
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData((prev: any) => ({ ...prev, acceptTerms: e.target.checked }))}
                      className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                      <span className="font-medium">J'accepte les conditions d'utilisation</span> de la plateforme de collaboration médicale. Je comprends et accepte les termes et conditions d'utilisation du service.
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="acceptPrivacy"
                      checked={formData.acceptPrivacy}
                      onChange={(e) => setFormData((prev: any) => ({ ...prev, acceptPrivacy: e.target.checked }))}
                      className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="acceptPrivacy" className="ml-3 text-sm text-gray-700">
                      <span className="font-medium">J'accepte la politique de confidentialité</span> et consens au traitement de mes données personnelles conformément au RGPD.
                    </label>
                  </div>
                </div>
              </div>
            </>
          );
        }
        return null;

      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === "expert") {
      alert("Votre demande de création de compte Expert est envoyée avec succès. Nous vous répondrons dans au plus 24h.");
    } else {
      alert("Inscription envoyée ✅");
    }
    console.log(formData);
  };

  const renderUserTypeSelection = () => (
    <div className="w-full max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-light text-teal-700 mb-2 tracking-wide">
        Créer un compte
      </h1>
      <div className="w-24 h-1 mx-auto bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mb-6"></div>
      <p className="text-lg text-gray-500 mb-12">
        Sélectionnez votre profil pour commencer l'inscription
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { id: "medecin", title: "Médecin", description: "Pour les praticiens toutes spécialités", icon: <StethoscopeIcon className="w-8 h-8 text-white" />, color: "from-teal-500 to-teal-700" },
          { id: "expert", title: "Expert", description: "Médecins reconnus comme experts médicaux certifiés", icon: <AwardIcon className="w-8 h-8 text-white" />, color: "from-amber-500 to-amber-700" },
        ].map(card => (
          <div
            key={card.id}
            onClick={() => setUserType(card.id as UserType)}
            className={`cursor-pointer rounded-2xl p-6 flex flex-col items-center text-center transform transition-all duration-300 bg-white/50 backdrop-blur-md border border-gray-200 shadow-lg hover:scale-105 hover:shadow-2xl`}
          >
            <div className={`mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${card.color} shadow-lg`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{card.description}</p>
            <div className="mt-auto text-teal-700 font-medium flex items-center text-sm transition-colors duration-200 hover:text-teal-900">
              Commencer <ChevronRightIcon className="w-3 h-3 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  

  return (
    <BackgroundAnimation>
      <div className="flex flex-col items-center justify-center min-h-screen py-6 px-3 sm:px-6">
        {userType === null ? renderUserTypeSelection() : (
          <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 h-[85vh] flex flex-col overflow-hidden">
            <div className="px-5 sm:px-6 pt-4 pb-3 border-b border-gray-200 sticky top-0 bg-gradient-to-r from-teal-50 to-white z-10 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-light text-teal-700">
                {userType === "medecin" ? "Inscription Médecin" : "Inscription Expert"}
                </h2>
                <button 
                  onClick={() => { setUserType(null); setCurrentStep(0); }} 
                  className="text-gray-500 hover:text-red-500 transition p-1 rounded-full hover:bg-gray-100"
                >
                  <XIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>
              <div className="mt-2">
                <Stepper steps={getSteps()} currentStep={currentStep} />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 sm:px-6 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                {renderStepContent()}
              </div>
              <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                {currentStep > 0 ? (
                  <button 
                    type="button" 
                    onClick={() => setCurrentStep(s => s - 1)} 
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center shadow-sm transition-all duration-200 font-medium"
                  >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />Précédent
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < getSteps().length - 1 ? (
                  <button 
                    type="button" 
                    disabled={!isStepValid()} 
                    onClick={() => setCurrentStep(s => s + 1)} 
                    className={`ml-auto px-5 py-2.5 rounded-lg flex items-center font-medium transition-all duration-200 ${isStepValid() 
                      ? "bg-teal-600 text-white hover:bg-teal-700 shadow-md" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                  >
                    Suivant <ChevronRightIcon className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={!isStepValid()} 
                    className={`ml-auto px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${isStepValid() 
                      ? (userType === "expert" ? "bg-amber-600 hover:bg-amber-700" : "bg-teal-600 hover:bg-teal-700") + " text-white shadow-md" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                  >
                    {userType === "expert" ? "Demande d'inscription" : "S'inscrire"}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Déjà inscrit ?{" "}
            <Link to="/login" className="text-teal-600 hover:text-teal-800 font-semibold transition-colors">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </BackgroundAnimation>
  );
};

export default Register;
