import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailIcon, LockIcon, ShieldIcon } from 'lucide-react';
import { BackgroundAnimation } from '../components/ui/BackgroundAnimation';
import { FormInput } from '../components/ui/FormInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showTwoFactor) {
      // First step: validate email and password
      // In real app, you would make API call here
      console.log('Step 1: Email/Password validation', { email, password });
      setShowTwoFactor(true);
    } else {
      // Second step: validate 2FA code
      console.log('Step 2: 2FA validation', { email, password, twoFactorCode, rememberMe });
      // Redirection vers le dashboard après authentification réussie
      navigate('/dashboard');
    }
  };

  const handleBackToLogin = () => {
    setShowTwoFactor(false);
    setTwoFactorCode('');
  };

  return (
    <BackgroundAnimation>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-gray-200">
            {!showTwoFactor ? (
              // Login Form
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  Connexion
                </h2>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="dr.nom@hopital.tn"
                    icon={<MailIcon size={18} />}
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  
                  <FormInput
                    id="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="••••••••"
                    icon={<LockIcon size={18} />}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#00A7A7] focus:ring-[#00A7A7]"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                        Se souvenir de moi
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="text-[#00A7A7] hover:text-[#008B8B] transition-colors duration-300">
                        Mot de passe oublié ?
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#00A7A7] hover:bg-[#008B8B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A7A7] transition-all duration-300"
                    >
                      Continuer
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Pas de compte ?{' '}
                    <Link
                      to="/register"
                      className="text-[#00A7A7] hover:text-[#008B8B] font-medium transition-colors duration-300"
                    >
                      S'inscrire
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              // 2FA Form
              <>
                <div className="text-center mb-6">
                  <div className="mx-auto w-12 h-12 bg-[#00A7A7] rounded-full flex items-center justify-center mb-4">
                    <ShieldIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Authentification à deux facteurs
                  </h2>
                  <p className="text-sm text-gray-600">
                    Entrez le code à 6 chiffres envoyé sur votre téléphone
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="2fa-code" className="block text-sm font-medium text-gray-700 mb-2">
                      Code de vérification
                    </label>
                    <input
                      id="2fa-code"
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A7A7] focus:border-transparent transition-all duration-300 text-center text-lg font-mono"
                      required
                      value={twoFactorCode}
                      onChange={e => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#00A7A7] hover:bg-[#008B8B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A7A7] transition-all duration-300"
                    >
                      Se connecter
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A7A7] transition-all duration-300"
                    >
                      Retour
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Vous n'avez pas reçu le code ?{' '}
                    <a href="#" className="text-[#00A7A7] hover:text-[#008B8B] font-medium transition-colors duration-300">
                      Renvoyer
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </BackgroundAnimation>
  );
};

export default Login;