import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '@/api';

interface User {
  userId: string;
  username: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get<User>('/auth/profile');
        setUser(response.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => setIsAuthenticated(true);

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
