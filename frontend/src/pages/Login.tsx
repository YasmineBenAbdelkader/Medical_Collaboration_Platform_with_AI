import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon } from 'lucide-react';
import { BackgroundAnimation } from '../components/ui/BackgroundAnimation';
import { Logo } from '../components/ui/Logo';
import { FormInput } from '../components/ui/FormInput';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log({
      email,
      password,
      rememberMe
    });
  };
  return <BackgroundAnimation>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Logo />
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Connexion
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <FormInput id="email" label="Email" type="email" placeholder="dr.nom@hopital.fr" icon={<MailIcon size={18} />} required value={email} onChange={e => setEmail(e.target.value)} />
              <FormInput id="password" label="Mot de passe" type="password" placeholder="••••••••" icon={<LockIcon size={18} />} required value={password} onChange={e => setPassword(e.target.value)} />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#00A7A7] focus:ring-[#00A7A7]" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
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
                <button type="submit" className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#00A7A7] hover:bg-[#008B8B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A7A7] transition-all duration-300">
                  Se connecter
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas de compte ?{' '}
                <Link to="/register" className="text-[#00A7A7] hover:text-[#008B8B] font-medium transition-colors duration-300">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundAnimation>;
};
export default Login;