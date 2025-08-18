import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuitIcon, LockIcon, MailIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('doctor');
  const [specialty, setSpecialty] = useState('');
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } else {
      // In a real app, this would register a new user
      console.log('Register with:', {
        email,
        password,
        role,
        specialty
      });
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 text-white p-2 rounded-md">
              <BrainCircuitIcon size={32} />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Connexion à MedCollab' : 'Créer un compte MedCollab'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Plateforme de collaboration médicale assistée par IA' : 'Rejoignez la communauté des professionnels de santé'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon size={18} className="text-gray-400" />
                </div>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Adresse e-mail" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={18} className="text-gray-400" />
                </div>
                <input id="password" name="password" type="password" autoComplete="current-password" required className={`appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLogin ? 'rounded-b-md' : ''} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
            {!isLogin && <>
                <div>
                  <label htmlFor="role" className="sr-only">
                    Rôle
                  </label>
                  <select id="role" name="role" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="doctor">Médecin</option>
                    <option value="student">Étudiant en médecine</option>
                    <option value="expert">Expert médical</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="specialty" className="sr-only">
                    Spécialité
                  </label>
                  <select id="specialty" name="specialty" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" value={specialty} onChange={e => setSpecialty(e.target.value)}>
                    <option value="">Sélectionnez votre spécialité</option>
                    <option value="Cardiologie">Cardiologie</option>
                    <option value="Dermatologie">Dermatologie</option>
                    <option value="Endocrinologie">Endocrinologie</option>
                    <option value="Gastroentérologie">Gastroentérologie</option>
                    <option value="Neurologie">Neurologie</option>
                    <option value="Oncologie">Oncologie</option>
                    <option value="Pédiatrie">Pédiatrie</option>
                    <option value="Pneumologie">Pneumologie</option>
                    <option value="Psychiatrie">Psychiatrie</option>
                    <option value="Radiologie">Radiologie</option>
                    <option value="Rhumatologie">Rhumatologie</option>
                  </select>
                </div>
              </>}
          </div>
          {isLogin && <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Mot de passe oublié?
                </a>
              </div>
            </div>}
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? 'Pas encore de compte?' : 'Déjà un compte?'}{' '}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:text-blue-500">
              {isLogin ? "S'inscrire" : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </div>;
};