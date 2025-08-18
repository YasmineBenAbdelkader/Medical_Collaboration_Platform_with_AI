import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuitIcon, LockIcon, MailIcon, ShieldCheckIcon, KeyRoundIcon, HeartPulseIcon, Users2Icon, SparklesIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpRequired, setOtpRequired] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, verifyOtp } = useAuth();

  const firstNameFromEmail = (value: string) => {
    const local = value.split('@')[0] || '';
    if (!local) return '';
    return local.charAt(0).toUpperCase() + local.slice(1);
  };

  const getInitialsFromEmail = (value: string) => {
    const local = (value.split('@')[0] || '').replace(/[^a-zA-Z\.\-]/g, '');
    if (!local) return 'MD';
    const parts = local.split(/[\.-]/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return local.slice(0, 2).toUpperCase();
  };

  const passwordStrength = (value: string) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    const labels = ['Faible', 'Moyen', 'Bon', 'Fort'];
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#059669'];
    const idx = Math.max(0, Math.min(score - 1, 3));
    return {
      score,
      label: score === 0 ? 'Très faible' : labels[idx],
      color: score === 0 ? '#ef4444' : colors[idx],
      width: `${(score / 4) * 100}%`,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (isLogin) {
      const res = await login(email, password);
      setSubmitting(false);
      if (!res.success) {
        setError(res.message || 'Identifiants invalides.');
        return;
      }
      if (res.require2fa) {
        setOtpRequired(true);
        return;
      }
      navigate('/dashboard');
    } else {
      setSubmitting(false);
      setError("L'inscription est gérée côté administration. Contactez l'admin.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const ok = await verifyOtp(otpCode);
    setSubmitting(false);
    if (!ok) {
      setError('Code de vérification incorrect.');
      return;
    }
    navigate('/dashboard');
  };

  const strength = passwordStrength(password);
  const hours = new Date().getHours();
  const dayPart = hours >= 5 && hours < 18 ? 'Bonjour' : 'Bonsoir';
  const greeting = email ? `${dayPart}, ${firstNameFromEmail(email)} 👋` : `${dayPart} 👋`;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-300/60 to-indigo-300/50 blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-purple-300/60 to-pink-300/50 blur-3xl"></div>
        <div className="absolute inset-0" style={{ opacity: 0.18, backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Panneau gauche: présentation */}
        <div className="hidden lg:block">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              <SparklesIcon size={14} className="mr-1" /> Espace sécurisé par spécialité
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
              Collaborez efficacement, en toute sécurité
            </h1>
            <p className="mt-3 text-gray-600">
              MedCollab offre des espaces dédiés par spécialité (cardiologie, pédiatrie, etc.) pour partager des cas, obtenir des avis d'experts et bénéficier d'une assistance IA — avec anonymisation des données et 2FA.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  <HeartPulseIcon size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Espaces par spécialité</p>
                  <p className="text-xs text-gray-600">Accès réservé aux spécialistes concernés</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  <ShieldCheckIcon size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Sécurité & 2FA</p>
                  <p className="text-xs text-gray-600">Contrôles d'accès renforcés et audit</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  <Users2Icon size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Réseau d'experts</p>
                  <p className="text-xs text-gray-600">Trouvez l'expertise adaptée à vos cas</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  <BrainCircuitIcon size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Assistant IA</p>
                  <p className="text-xs text-gray-600">Aide à l'analyse et suggestions pertinentes</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-6">
              <div>
                <p className="text-2xl font-bold text-gray-900">12+</p>
                <p className="text-xs text-gray-500">Spécialités</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2,5k+</p>
                <p className="text-xs text-gray-500">Experts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">10k+</p>
                <p className="text-xs text-gray-500">Cas partagés</p>
              </div>
            </div>

            <div className="mt-8 relative">
              <div className="h-48 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center overflow-hidden">
                <div className="absolute -top-8 -left-8 w-40 h-40 bg-white/60 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -right-6 w-48 h-48 bg-white/40 rounded-full blur-2xl" />
                <p className="text-sm text-blue-900/70 px-6 text-center">Plateforme conçue pour une collaboration clinique efficace et conforme. Accédez à votre espace de spécialité dès maintenant.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite: carte de connexion */}
        <div className="w-full max-w-md mx-auto lg:max-w-none">
          <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] transition-shadow overflow-hidden ring-1 ring-black/5">
            <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white/10 text-white p-2 rounded-lg">
                    <BrainCircuitIcon size={28} />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-semibold text-white tracking-tight">MedCollab</h1>
                    <p className="text-xs text-white/80">Collaboration médicale assistée par IA</p>
                  </div>
                </div>
                <span className="text-sm text-white/80">{greeting}</span>
            </div>
          </div>

            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm flex items-start">
                  <AlertCircleIcon size={16} className="mt-0.5 mr-2" />
                  <span>{error}</span>
        </div>
              )}

              {!otpRequired && (
                <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon size={18} className="text-gray-400" />
                </div>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white sm:text-sm"
                        placeholder="adresse@exemple.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
              </div>
            </div>

            <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                    <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={18} className="text-gray-400" />
                </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        className="block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white sm:text-sm"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        aria-label="Afficher/masquer le mot de passe"
                      >
                        {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                      </button>
              </div>
                    {/* Barre de force du mot de passe */}
                    <div className="mt-2">
                      <div className="h-1.5 w-full bg-gray-200 rounded">
                        <div className="h-1.5 rounded transition-all" style={{ width: strength.width, backgroundColor: strength.color }} />
            </div>
                      <div className="mt-1 text-xs text-gray-500">Force du mot de passe: <span style={{ color: strength.color }}>{strength.label}</span></div>
                </div>
                </div>

                  <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Se souvenir de moi</label>
              </div>
              <div className="text-sm">
                      <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Mot de passe oublié?</a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {submitting ? 'Connexion...' : (
                      <>
                        Se connecter
                        <ArrowRightIcon size={16} className="ml-2" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Pas encore de compte?{' '}
                    <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">Créer un compte</a>
                  </p>

                
                </form>
              )}

              {otpRequired && (
                <form className="space-y-5" onSubmit={handleVerifyOtp}>
                  <div className="flex items-center mb-1">
                    <KeyRoundIcon size={18} className="text-blue-600" />
                    <h3 className="ml-2 text-sm font-medium text-gray-900">Vérification en deux étapes</h3>
              </div>
                  <p className="text-xs text-gray-600">Entrez le code à 6 chiffres envoyé par e-mail/app d'authentification.</p>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className="block w-full px-3 py-3 tracking-[0.6em] text-center border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="_ _ _ _ _ _"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  />
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={submitting || otpCode.length !== 6}
                      className="inline-flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {submitting ? 'Vérification...' : 'Vérifier'}
            </button>
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-800">Renvoyer le code</button>
          </div>
                  <button
                    type="button"
                    className="w-full text-sm text-gray-600 hover:text-gray-800"
                    onClick={() => setOtpRequired(false)}
                  >
                    Retour
                  </button>
        </form>
              )}

              <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 p-3">
                <p className="text-xs text-gray-600">
                  En vous connectant, vous acceptez de respecter la confidentialité des données patients et de ne partager aucune information identifiante. L'anonymisation des cas est obligatoire. Toute activité est susceptible d'être auditée conformément à la réglementation en vigueur.
          </p>
        </div>
      </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <a className="hover:text-gray-700" href="#">Confidentialité</a>
            <span className="mx-2">•</span>
            <a className="hover:text-gray-700" href="#">Conditions d'utilisation</a>
            <span className="mx-2">•</span>
            <span>© {new Date().getFullYear()} MedCollab</span>
          </div>
        </div>
      </div>
    </div>
  );
};