import React, { useEffect, useState, createContext, useContext } from 'react';
// Define the medical services/specialties
export const medicalServices = [{
  id: 'cardiologie',
  name: 'Cardiologie',
  icon: '❤️'
}, {
  id: 'pédiatrie',
  name: 'Pédiatrie',
  icon: '👶'
}, {
  id: 'dermatologie',
  name: 'Dermatologie',
  icon: '🧴'
}, {
  id: 'pneumologie',
  name: 'Pneumologie',
  icon: '🫁'
}, {
  id: 'neurologie',
  name: 'Neurologie',
  icon: '🧠'
}, {
  id: 'ophtalmologie',
  name: 'Ophtalmologie',
  icon: '👁️'
}, {
  id: 'orthopédie',
  name: 'Orthopédie',
  icon: '🦴'
}, {
  id: 'psychiatrie',
  name: 'Psychiatrie',
  icon: '🧠'
}, {
  id: 'default',
  name: 'Médecine Générale',
  icon: '⚕️'
}];
// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  specialty: string;
  service?: string;
  hospital?: string;
  role?: string;
}
// Define the auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
// Create the auth provider
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  // Login function
  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: 'Dr. Jean Dupont',
      email: email,
      specialty: 'cardiologie',
      hospital: 'CHU de Lyon',
      role: 'doctor'
    };
    // Store the user in local storage
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };
  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };
  return <AuthContext.Provider value={{
    isAuthenticated,
    user,
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};