import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
    const { user } = useContext(AuthContext);
    const isAuthenticated = user !== null && user !== undefined;
    return { user, isAuthenticated };
};

export const getAuthToken = () => {
    if (typeof window !== "undefined") {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? JSON.parse(storedTokens).access : null;
    }
    return null;
};