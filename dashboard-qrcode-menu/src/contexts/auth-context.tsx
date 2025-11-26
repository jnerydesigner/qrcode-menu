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
  login: () => Promise<void>;
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

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && !error.config.url?.includes('/auth/logout')) {
          setUser(null);
          setIsAuthenticated(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, []);

  const login = async () => {
    try {
      const response = await api.get<User>('/auth/profile');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching profile on login:", error);
      // Even if profile fetch fails, we might still want to consider them authenticated 
      // if the login mutation was successful, but usually we want the user data.
      // For now, let's assume if profile fails, something is wrong.
      setIsAuthenticated(false);
      setUser(null);
    }
  };

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
