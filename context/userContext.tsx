'use client';
import React, {createContext, useContext, useState, useEffect} from 'react';

interface User {
    id: number;
    firstName: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser : React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://127.0.0.1:8000/auth/user/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }});
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        };
        fetchUser();
    }, []);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(){
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}