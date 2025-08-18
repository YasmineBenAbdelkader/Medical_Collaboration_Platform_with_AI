import React, { useState, createContext, useContext } from 'react';
type UserRole = 'doctor' | 'student' | 'expert' | 'admin';
interface User {
  id: string;
  name: string;
  role: UserRole;
  specialty: string;
  avatar: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Dr. Sophie Martin',
    role: 'doctor',
    specialty: 'Cardiologie',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  });
  const login = async (email: string, password: string) => {
    // This would normally validate with a backend
    setUser({
      id: '1',
      name: 'Dr. Sophie Martin',
      role: 'doctor',
      specialty: 'Cardiologie',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    });
    return true;
  };
  const logout = () => {
    setUser(null);
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};