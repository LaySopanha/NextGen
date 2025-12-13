import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock User Type
export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    tier: 'Standard' | 'Gold' | 'Platinum';
    coins: number;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (method: 'email' | 'phone' | 'google' | 'apple' | 'facebook', data?: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock User Data
const MOCK_USER: User = {
    id: 'u123',
    name: 'Nick 12',
    email: 'nick@example.com',
    avatar: 'https://github.com/shadcn.png', // Placeholder
    tier: 'Platinum',
    coins: 6630,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Check generic storage on load
    useEffect(() => {
        const storedUser = localStorage.getItem('nextgen_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (method: string, data?: any) => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo, we always log in the mock user, updating name if provided
        const newUser = { ...MOCK_USER };
        if (data?.name) newUser.name = data.name;
        if (data?.email) newUser.email = data.email;

        setUser(newUser);
        localStorage.setItem('nextgen_user', JSON.stringify(newUser));
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nextgen_user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
