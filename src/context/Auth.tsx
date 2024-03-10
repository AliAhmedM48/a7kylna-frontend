import { createContext, useContext, useEffect, useState } from 'react';
import { LoginForm, User } from '../interfaces/user';
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (token: string | null) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    token: null
});

type ContextProviderProps = {
    children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (token: string | null) => {
        if (!token) return null;
        const decoded = jwtDecode(token) as User;
        localStorage.setItem('token', token);
        console.log("🚀 ~ login ~ decoded:", decoded)

        setUser(decoded);
        setToken(token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    // Check if token exists in local storage and login the user
    const loginWithToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            login(token);
        }
    };

    // Call loginWithToken on initial render
    useEffect(() => { loginWithToken() }, []);

    return (
        <>
            <AuthContext.Provider value={{ user, login, logout, token }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}