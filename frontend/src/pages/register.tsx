import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrainCircuitIcon, MailIcon, LockIcon, UserIcon, UserCogIcon, CheckCircleIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from 'lucide-react';
import medcollabImg from '../assets/medcollab3.jpg';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'doctor' | 'student' | 'expert'>('doctor');
  const [specialty, setSpecialty] = useState('Cardiologie');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [rpps, setRpps] = useState('');
  const [bio, setBio] = useState('');
  const [studentId, setStudentId] = useState('');
  const [university, setUniversity] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const specialties = [
    'Cardiologie','Dermatologie','Endocrinologie','Gastroentérologie','Neurologie','Oncologie','Pédiatrie','Pneumologie','Psychiatrie','Radiologie','Rhumatologie'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!fullName.trim()) return setError('Le nom complet est requis.');
    if (password.length < 8) return setError('Le mot de passe doit contenir au moins 8 caractères.');
    if (password !== confirmPassword) return setError('Les mots de passe ne correspondent pas.');
    if (!agree) return setError('Vous devez accepter les conditions.');

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitting(false);
    setSuccess("Votre demande d'inscription a été envoyée. Un administrateur validera votre compte.");
    setTimeout(() => navigate('/login'), 1200);
  };

  const getPasswordStrength = (pass: string) => {
    if (pass.length < 4) return { strength: 0, color: 'bg-gray-200', text: '' };
    if (pass.length < 6) return { strength: 25, color: 'bg-red-400', text: 'Faible' };
    if (pass.length < 8) return { strength: 50, color: 'bg-yellow-400', text: 'Moyen' };
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) 
      return { strength: 100, color: 'bg-green-400', text: 'Fort' };
    return { strength: 75, color: 'bg-blue-400', text: 'Bon' };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Partie gauche : Image et message d'accueil */}
      <div
        className="w-full md:w-2/5 flex flex-col justify-center items-center p-8 relative min-h-[400px]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59,130,246,0.55), rgba(99,102,241,0.55)), url(${medcollabImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
      </div>
      {/* Partie droite : Formulaire d'inscription */}
      <div className="w-full md:w-3/5 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md text-sm">
          <h1 className="text-lg font-bold text-blue-700 mb-2">Créer un compte</h1>
          <p className="text-xs text-blue-700/70 mb-6">Remplissez le formulaire pour rejoindre la plateforme.</p>
          {error && (
            <div className="mb-4 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm shadow-sm">{error}</div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-xl border border-green-200 bg-green-50 text-green-700 text-sm shadow-sm">{success}</div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Nom complet */}
            <div>
              <label className="block text-xs font-semibold text-blue-700 mb-1">Nom complet *</label>
              <input
                type="text"
                className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 placeholder-blue-400 text-blue-900 text-sm focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                placeholder="Dr. Jean Dupont"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1">Adresse e-mail *</label>
              <input
                type="email"
                autoComplete="email"
                className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 placeholder-blue-400 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                placeholder="votre.email@hopital.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1">Mot de passe *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 placeholder-blue-400 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="mt-1 text-xs text-blue-500 hover:underline" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Masquer' : 'Afficher'} le mot de passe
              </button>
              {password && (
                <div className="mt-1 text-xs text-blue-700/70">Force : <span className={`font-bold ${passwordStrength.strength >= 75 ? 'text-green-600' : passwordStrength.strength >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{passwordStrength.text}</span></div>
              )}
            </div>
            {/* Confirmer mot de passe */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1">Confirmer le mot de passe *</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className={`block w-full px-3 py-2 border-2 rounded-xl bg-white/80 placeholder-blue-400 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition ${confirmPassword && password !== confirmPassword ? 'border-red-300 bg-red-50/30' : ''}`}
                placeholder="••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" className="mt-1 text-xs text-blue-500 hover:underline" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? 'Masquer' : 'Afficher'} le mot de passe
              </button>
              {confirmPassword && password !== confirmPassword && (
                <div className="mt-1 text-xs text-red-600">Les mots de passe ne correspondent pas</div>
              )}
            </div>
            {/* Rôle et spécialité */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Rôle *</label>
                <select
                  className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                >
                  <option value="doctor">👨‍⚕️ Médecin</option>
                  <option value="student">🎓 Étudiant en médecine</option>
                  <option value="expert">🔬 Expert / Chercheur</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Spécialité *</label>
                <select
                  className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  {specialties.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Champs spécifiques selon le rôle */}
            {role === 'doctor' && (
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">RPPS *</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 placeholder-blue-400 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                  placeholder="Numéro RPPS"
                  value={rpps}
                  onChange={e => setRpps(e.target.value)}
                />
              </div>
            )}
            {role === 'expert' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">RPPS *</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 placeholder-blue-400 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                    placeholder="Numéro RPPS"
                    value={rpps}
                    onChange={e => setRpps(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Biographie *</label>
                  <textarea
                    className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 placeholder-blue-400 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                    placeholder="Décrivez votre expertise, vos travaux, etc."
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-xl p-2 mt-2">
                  Votre compte expert devra être validé par un administrateur avant activation.
                </div>
              </>
            )}
            {role === 'student' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Identifiant étudiant *</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 placeholder-blue-400 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                    placeholder="Numéro étudiant"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Université *</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border-2 rounded-xl bg-white/80 placeholder-blue-400 text-blue-900 focus:outline-none focus:bg-white border-blue-100 focus:border-blue-400 transition"
                    placeholder="Université d'inscription"
                    value={university}
                    onChange={e => setUniversity(e.target.value)}
                  />
                </div>
              </>
            )}
            {/* Conditions */}
            <div className="flex items-start">
              <input
                id="agree"
                type="checkbox"
                className="w-5 h-5 rounded-md border-2 border-blue-200 bg-white focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0 mr-2"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="agree" className="text-sm text-blue-700 cursor-pointer">
                J'accepte les <a href="#" className="text-blue-600 hover:text-blue-800 font-medium underline">conditions d'utilisation</a> et la <a href="#" className="text-blue-600 hover:text-blue-800 font-medium underline">politique de confidentialité</a>.
              </label>
            </div>
            {/* Bouton submit */}
            <button
              type="submit"
              disabled={submitting || !agree}
              className={`w-full py-2 px-4 text-sm font-semibold rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:ring-offset-0 ${
                submitting || !agree
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:shadow-blue-200/50 transform hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {submitting ? 'Création en cours...' : 'Créer mon compte'}
            </button>
            <div className="text-center">
              <p className="text-sm text-blue-700/70">
                Vous avez déjà un compte ?{' '}
                <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">Se connecter ici</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};