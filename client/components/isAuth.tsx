import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';

const isAuth = (WrappedComponent: React.ComponentType) => {
    const AuthComponent = (props: any) => {
        const { user } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (!user) {
                console.log("no user isAuth");
                router.push('/login');
            }
        }, [user, router]);

        return user ? <WrappedComponent {...props} /> : null;
    };

    return AuthComponent;
};

export default isAuth;
