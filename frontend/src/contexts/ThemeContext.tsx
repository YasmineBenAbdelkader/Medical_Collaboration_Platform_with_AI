import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
export type Specialty = 'cardiologie' | 'pédiatrie' | 'dermatologie' | 'pneumologie' | 'neurologie' | 'ophtalmologie' | 'orthopédie' | 'psychiatrie' | 'default';
interface ThemeContextType {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    light: string;
    gradient: string;
    icon: string;
  };
  specialty: Specialty;
  setSpecialty: (specialty: Specialty) => void;
}
const themeMap = {
  cardiologie: {
    primary: 'bg-red-600',
    secondary: 'bg-red-700',
    accent: 'text-red-600',
    light: 'bg-red-100',
    gradient: 'from-red-600 to-red-700',
    icon: '❤️'
  },
  pédiatrie: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-700',
    accent: 'text-blue-600',
    light: 'bg-blue-100',
    gradient: 'from-blue-600 to-blue-700',
    icon: '👶'
  },
  dermatologie: {
    primary: 'bg-orange-600',
    secondary: 'bg-orange-700',
    accent: 'text-orange-600',
    light: 'bg-orange-100',
    gradient: 'from-orange-600 to-orange-700',
    icon: '🧴'
  },
  pneumologie: {
    primary: 'bg-cyan-600',
    secondary: 'bg-cyan-700',
    accent: 'text-cyan-600',
    light: 'bg-cyan-100',
    gradient: 'from-cyan-600 to-cyan-700',
    icon: '🫁'
  },
  neurologie: {
    primary: 'bg-purple-600',
    secondary: 'bg-purple-700',
    accent: 'text-purple-600',
    light: 'bg-purple-100',
    gradient: 'from-purple-600 to-purple-700',
    icon: '🧠'
  },
  ophtalmologie: {
    primary: 'bg-indigo-600',
    secondary: 'bg-indigo-700',
    accent: 'text-indigo-600',
    light: 'bg-indigo-100',
    gradient: 'from-indigo-600 to-indigo-700',
    icon: '👁️'
  },
  orthopédie: {
    primary: 'bg-amber-600',
    secondary: 'bg-amber-700',
    accent: 'text-amber-600',
    light: 'bg-amber-100',
    gradient: 'from-amber-600 to-amber-700',
    icon: '🦴'
  },
  psychiatrie: {
    primary: 'bg-emerald-600',
    secondary: 'bg-emerald-700',
    accent: 'text-emerald-600',
    light: 'bg-emerald-100',
    gradient: 'from-emerald-600 to-emerald-700',
    icon: '🧠'
  },
  default: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-700',
    accent: 'text-blue-600',
    light: 'bg-blue-100',
    gradient: 'from-blue-600 to-blue-700',
    icon: '⚕️'
  }
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    user
  } = useAuth();
  const [specialty, setSpecialty] = useState<Specialty>('default');
  // Update theme based on user specialty
  useEffect(() => {
    if (user?.specialty && Object.keys(themeMap).includes(user.specialty)) {
      setSpecialty(user.specialty as Specialty);
    } else {
      setSpecialty('default');
    }
  }, [user?.specialty]);
  const theme = themeMap[specialty];
  return <ThemeContext.Provider value={{
    theme,
    specialty,
    setSpecialty
  }}>
      {children}
    </ThemeContext.Provider>;
};