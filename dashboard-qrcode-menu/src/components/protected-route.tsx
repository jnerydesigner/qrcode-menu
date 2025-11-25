import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/contexts/auth-context';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Carregando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to='/' replace state={{ from: location }} />;
    }

    return <>{children}</>;
};
