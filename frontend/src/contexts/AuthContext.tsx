import React, { useState, createContext, useContext } from 'react';

type UserRole = 'doctor' | 'student' | 'expert' | 'admin';

interface User {
  id: string;
  name: string;
  role: UserRole;
  specialty: string;
  avatar: string;
  availableSpecialties?: string[];
  twoFactorEnabled?: boolean;
}

interface LoginResult {
  success: boolean;
  require2fa?: boolean;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  verifyOtp: (code: string) => Promise<boolean>;
  logout: () => void;
  setActiveSpecialty: (specialty: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Dr. Sophie Martin',
    role: 'doctor',
    specialty: 'Cardiologie',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availableSpecialties: ['Cardiologie'],
    twoFactorEnabled: true,
  });

  // Progressive lock
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  const now = () => Date.now();

  const login = async (_email: string, _password: string): Promise<LoginResult> => {
    // Check lock
    if (lockedUntil && now() < lockedUntil) {
      const remaining = Math.ceil((lockedUntil - now()) / 1000);
      return { success: false, message: `Compte temporairement verrouillé. Réessayez dans ${remaining}s.` };
    }

    // DEMO validation: require minimal password length
    const isValid = _password.length >= 4;
    if (!isValid) {
      const next = failedAttempts + 1;
      setFailedAttempts(next);
      // Lock after 5 failed attempts for 5 minutes
      if (next >= 5) {
        const lockDurationMs = next >= 7 ? 15 * 60 * 1000 : 5 * 60 * 1000; // escalate
        setLockedUntil(now() + lockDurationMs);
      }
      return { success: false, message: 'Identifiants invalides.' };
    }

    // Reset failures on success
    setFailedAttempts(0);
    setLockedUntil(null);

    // Normally: fetch user + claims from backend; ici on force une seule spécialité pour médecin
    setUser({
      id: '1',
      name: 'Dr. Sophie Martin',
      role: 'doctor',
      specialty: 'Cardiologie',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      availableSpecialties: ['Cardiologie'],
      twoFactorEnabled: true,
    });

    return { success: true, require2fa: true };
  };

  const verifyOtp = async (code: string) => {
    // DEMO: accept 6-digit 123456
    const ok = code.trim() === '123456';
    if (!ok) return false;
    return true;
  };

  const logout = () => {
    setUser(null);
    setFailedAttempts(0);
    setLockedUntil(null);
  };

  const setActiveSpecialty = (specialty: string) => {
    setUser(prev => (prev ? { ...prev, specialty } : prev));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, verifyOtp, logout, setActiveSpecialty }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};