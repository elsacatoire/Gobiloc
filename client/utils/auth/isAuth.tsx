import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

const isAuth = (WrappedComponent: React.ComponentType) => {
    const AuthenticatedComponent = (props: any) => {
        const router = useRouter();
        const { isAuthenticated, user } = useAuth();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return <p>Redirection vers la page de connexion...</p>;
        }
        return <WrappedComponent {...props} />;
    };
    return AuthenticatedComponent;
};
export default isAuth;
