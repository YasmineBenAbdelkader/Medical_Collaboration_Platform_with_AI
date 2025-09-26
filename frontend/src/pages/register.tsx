import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  StethoscopeIcon,
  GraduationCapIcon,
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
type UserType = "medecin" | "etudiant" | "expert" | null;

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

// Composant Select amélioré
const CustomSelect = ({ id, label, value, onChange, options, multiple = false, required = false, icon = null }) => {
  const handleChange = (e) => {
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
const UploadField = ({ id, label, file, onChange, required = false }) => (
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
    email: "",
    password: "",
    confirmPassword: "",
    rppsNumber: "",
    studentId: "",
    speciality: "",
    facilities: [],
    university: "",
    diplomaFile: null,
    professionalCard: null,
    cvFile: null,
    profileTitle: "",
    biography: "",
    experiences: [],
    missions: "",
    expertiseDomain: "",
    profileImage: null,
    bannerImage: null,
    address: "",
    phone: "",
    stageInstitution: "",
    letterFile: null,
  });

  // Gestion des inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData((prev: any) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev: any) => ({ ...prev, [id]: value }));
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

  const getSteps = () => {
    switch (userType) {
      case "medecin":
        return ["Informations", "Parcours académique", "Profession", "Profil"];
      case "etudiant":
        return ["Informations", "Académique & stage", "Profil"];
      case "expert":
        return ["Informations", "Parcours académique", "Profession", "Profil"];
      default:
        return [];
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      return formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword;
    }
    if (currentStep === 1) {
      if (userType === "etudiant") {
        return formData.university && formData.speciality && formData.stageInstitution && formData.letterFile;
      }
      return formData.university && formData.speciality;
    }
    if (currentStep === 2 && userType !== "etudiant") {
      return formData.rppsNumber && formData.facilities.length > 0;
    }
    if (currentStep === 2 && userType === "etudiant") {
      return formData.profileTitle && formData.biography;
    }
    if (currentStep === 3) {
      return formData.profileTitle && formData.biography;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
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
              <FormInput
                id="confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                size="lg"
              />
            </div>
          </>
        );

      case 1:
        if (userType === "etudiant") {
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
              <CustomSelect
                id="stageInstitution"
                label="Établissement de stage"
                value={formData.stageInstitution}
                onChange={handleInputChange}
                options={facilityOptions}
                required={true}
                icon={<BriefcaseIcon className="w-5 h-5 text-gray-500" />}
              />
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Lettre d'affectation ou de présence
                </h3>
                <UploadField 
                  id="letterFile" 
                  label="Téléverser votre lettre" 
                  file={formData.letterFile} 
                  onChange={handleInputChange} 
                  required 
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
                  required 
                />
              </div>
            </>
          );
        }

      case 2:
        if (userType === "medecin" || userType === "expert") {
          return (
            <>
              <FormInput 
                id="rppsNumber" 
                label="Numéro RPPS" 
                value={formData.rppsNumber} 
                onChange={handleInputChange} 
                required 
                size="lg" 
              />
              <CustomSelect
                id="facilities"
                label="Établissement(s) de travail"
                value={formData.facilities}
                onChange={handleInputChange}
                options={facilityOptions}
                multiple={true}
                required={true}
                icon={<BriefcaseIcon className="w-5 h-5 text-gray-500" />}
              />
              <FormInput 
                id="experience" 
                label="Années d'expérience" 
                value={formData.experience} 
                onChange={handleInputChange} 
                type="number" 
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
                  required 
                />
              </div>
              {userType === "expert" && (
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
                    required 
                  />
                </div>
              )}
            </>
          );
        }
        if (userType === "etudiant") {
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
                  placeholder="Ex: Étudiant en médecine passionné par la cardiologie"
                  className="mb-4"
                />
                
                <div className="mb-4">
                  <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-2">
                    À propos de vous
                  </label>
                  <textarea 
                    id="biography" 
                    placeholder="Décrivez votre parcours, vos centres d'intérêt et vos aspirations professionnelles..." 
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
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Bannière de profil</h4>
                    <UploadField 
                      id="bannerImage" 
                      label="Téléverser une bannière" 
                      file={formData.bannerImage} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Expériences */}
              <div className="md:col-span-2 mb-6 border border-gray-200 p-6 rounded-2xl bg-white shadow-sm">
                <h3 className="font-semibold text-xl text-teal-700 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <BriefcaseIcon className="w-6 h-6 mr-2" />
                  Expériences et formations
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
                        label="Poste ou formation" 
                        value={exp.title} 
                        onChange={(e: any) => handleExperienceChange(idx, "title", e.target.value)} 
                        placeholder="Ex: Stage en cardiologie"
                      />
                      <FormInput 
                        label="Établissement" 
                        value={exp.institution} 
                        onChange={(e: any) => handleExperienceChange(idx, "institution", e.target.value)} 
                        placeholder="Ex: Hôpital Européen Georges-Pompidou"
                      />
                    </div>
                    
                    <FormInput 
                      label="Période (de - à)" 
                      value={exp.date} 
                      onChange={(e: any) => handleExperienceChange(idx, "date", e.target.value)} 
                      placeholder="Ex: Juin 2023 - Août 2023"
                      className="mb-4"
                      icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                    />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea 
                        placeholder="Décrivez vos responsabilités et apprentissages..." 
                        value={exp.description} 
                        onChange={(e: any) => handleExperienceChange(idx, "description", e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                      />
                    </div>
                    
                    <FormInput 
                      label="Compétences acquises" 
                      value={exp.skills} 
                      onChange={(e: any) => handleExperienceChange(idx, "skills", e.target.value)} 
                      placeholder="Ex: Prise de tension, ECG, Observation de consultations"
                      className="mb-4"
                    />
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Attestation ou certificat</h4>
                      <UploadField 
                        id={`certificate-${idx}`} 
                        label="Téléverser un document justificatif" 
                        file={exp.certificate} 
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
            </>
          );
        }
        return null;

      case 3:
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
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Bannière de profil</h4>
                  <UploadField 
                    id="bannerImage" 
                    label="Téléverser une bannière" 
                    file={formData.bannerImage} 
                    onChange={handleInputChange} 
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
                      label="Poste occupé" 
                      value={exp.title} 
                      onChange={(e: any) => handleExperienceChange(idx, "title", e.target.value)} 
                      placeholder="Ex: Cardiologue interventionnel"
                    />
                    <FormInput 
                      label="Établissement professionnel" 
                      value={exp.institution} 
                      onChange={(e: any) => handleExperienceChange(idx, "institution", e.target.value)} 
                      placeholder="Ex: Hôpital Européen Georges-Pompidou"
                    />
                  </div>
                  
                  <FormInput 
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

            {/* Section supplémentaire pour les experts */}
            {userType === "expert" && (
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
    <div className="w-full max-w-5xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-light text-teal-700 mb-14">Créer un compte</h1>
      <p className="text-lg text-gray-600 mb-12">Sélectionnez votre profil pour commencer l'inscription</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            id: "medecin", 
            title: "Médecin", 
            description: "Inscription réservée aux praticiens toutes spécialités", 
            icon: <StethoscopeIcon className="h-10 w-10 text-teal-600" />, 
            bg: "bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 border-teal-200",
            border: "border-teal-200"
          },
          { 
            id: "etudiant", 
            title: "Étudiant", 
            description: "Pour les étudiants en médecine inscrits à l'université", 
            icon: <GraduationCapIcon className="h-10 w-10 text-blue-600" />, 
            bg: "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200",
            border: "border-blue-200"
          },
          { 
            id: "expert", 
            title: "Expert", 
            description: "Pour les médecins reconnus comme experts médicaux certifiés", 
            icon: <AwardIcon className="h-10 w-10 text-amber-600" />, 
            bg: "bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border-amber-200",
            border: "border-amber-200"
          },
        ].map((card) => (
          <div 
            key={card.id} 
            onClick={() => setUserType(card.id as UserType)} 
            className={`${card.bg} ${card.border} p-8 rounded-2xl shadow-lg border cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center`}
          >
            <div className="bg-white p-5 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-sm">{card.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{card.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">{card.description}</p>
            <div className="mt-6 text-teal-600 font-medium flex items-center">
              Commencer <ChevronRightIcon className="w-4 h-4 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <BackgroundAnimation>
      <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6">
        {userType === null ? renderUserTypeSelection() : (
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-light text-teal-700">
                {userType === "medecin" ? "Inscription Médecin" : userType === "etudiant" ? "Inscription Étudiant" : "Inscription Expert"}
              </h2>
              <button 
                onClick={() => { setUserType(null); setCurrentStep(0); }} 
                className="text-gray-500 hover:text-red-500 transition p-1 rounded-full hover:bg-gray-100"
              >
                <XIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <Stepper steps={getSteps()} currentStep={currentStep} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {renderStepContent()}
              </div>
              
              <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
                {currentStep > 0 ? (
                  <button 
                    type="button" 
                    onClick={() => setCurrentStep(s => s - 1)} 
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 flex items-center shadow-sm transition-all duration-200 font-medium"
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
                    className={`ml-auto px-6 py-3 rounded-xl flex items-center font-medium transition-all duration-200 ${isStepValid() 
                      ? "bg-teal-600 text-white hover:bg-teal-700 shadow-md" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                  >
                    Suivant <ChevronRightIcon className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={!isStepValid()} 
                    className={`ml-auto px-6 py-3 rounded-xl font-medium transition-all duration-200 ${isStepValid() 
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
        
        <div className="mt-8 text-center">
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