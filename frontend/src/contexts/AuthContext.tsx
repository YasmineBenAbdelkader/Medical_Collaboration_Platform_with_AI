import React, { useState, createContext, useContext, useEffect } from 'react';

export type UserRole = 'doctor' | 'expert' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  specialty: string;
  avatar: string;
  hospital?: string;
  availableSpecialties?: string[];
  twoFactorEnabled?: boolean;
}

export interface LoginResult {
  success: boolean;
  require2fa?: boolean;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  verifyOtp: (code: string) => Promise<boolean>;
  logout: () => void;
  setActiveSpecialty: (specialty: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const now = () => Date.now();

  const login = async (email: string, password: string): Promise<LoginResult> => {
    // Check lock
    if (lockedUntil && now() < lockedUntil) {
      const remaining = Math.ceil((lockedUntil - now()) / 1000);
      return { success: false, message: `Compte temporairement verrouillé. Réessayez dans ${remaining}s.` };
    }

    // DEMO validation: require minimal password length
    const isValid = password.length >= 4;
    if (!isValid) {
      const next = failedAttempts + 1;
      setFailedAttempts(next);
      // Lock after 5 failed attempts for 5 minutes
      if (next >= 5) {
        const lockDurationMs = next >= 7 ? 15 * 60 * 1000 : 5 * 60 * 1000;
        setLockedUntil(now() + lockDurationMs);
      }
      return { success: false, message: 'Identifiants invalides.' };
    }

    // Reset failures on success
    setFailedAttempts(0);
    setLockedUntil(null);

    // Mock users based on email
    let mockUser: User;
    if (email.includes('admin')) {
      mockUser = {
        id: '3',
        name: 'Admin System',
        email: email,
        role: 'admin',
        specialty: 'Administration',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        hospital: 'Système',
        twoFactorEnabled: true,
      };
    } else if (email.includes('expert')) {
      mockUser = {
        id: '2',
        name: 'Dr. Expert Martin',
        email: email,
        role: 'expert',
        specialty: 'Cardiologie',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        hospital: 'CHU Expert',
        availableSpecialties: ['Cardiologie', 'Neurologie'],
        twoFactorEnabled: true,
      };
    } else {
      mockUser = {
        id: '1',
        name: 'Dr. Sophie Martin',
        email: email,
        role: 'doctor',
        specialty: 'Cardiologie',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        hospital: 'CHU de Lyon',
        availableSpecialties: ['Cardiologie'],
        twoFactorEnabled: true,
      };
    }

    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);

    return { success: true, require2fa: true };
  };

  const verifyOtp = async (code: string) => {
    // DEMO: accept 6-digit 123456
    const ok = code.trim() === '123456';
    return ok;
  };

  const logout = () => {
    localStorage.removeItem('user');
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