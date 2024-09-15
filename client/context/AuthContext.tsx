import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import { DecodedToken } from '@/types/TokenType';

const AuthContext = createContext<{
    user: DecodedToken | null;
    loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    logoutUser: () => void;
}>({
    user: null,
    loginUser: async () => { },
    logoutUser: () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    let [user, setUser] = useState<DecodedToken | null>(null);
    let [authTokens, setAuthTokens] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTokens = localStorage.getItem('authTokens');
            console.log("localStorage.getItem('authTokens')", storedTokens);

            if (storedTokens) {
                try {
                    const decoded = jwtDecode<DecodedToken>(JSON.parse(storedTokens).access);
                    console.log("Decoded token: ", decoded);

                    setUser(decoded);
                    setAuthTokens(storedTokens);
                } catch (error) {
                    console.error("Token decoding failed", error);
                    setUser(null);
                    setAuthTokens(null);
                }
            }
        }
    }, []);


    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        const email = (target.elements.namedItem('email') as HTMLInputElement).value;
        const password = (target.elements.namedItem('password') as HTMLInputElement).value;

        let response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });

        const data = await response.json();
        if (response.status === 200) {
            const decodedUser = jwtDecode<DecodedToken>(data.access);
            console.log("Decoded user after login: ", decodedUser);

            setAuthTokens(data);
            setUser(decodedUser);
            localStorage.setItem('authTokens', JSON.stringify(data));
            console.log("localStorage.getItem ", localStorage.getItem('authTokens'));

            router.push('/');
        } else {
            alert('Login failed');
        }
    }

    const contextData = {
        user,
        loginUser
    }

    const logoutUser = () => {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
