'use client';
import React, {createContext, useContext, useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    firstName: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser : React.Dispatch<React.SetStateAction<User | null>>;
    refreshUser: () => void;
}

interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const Router = useRouter();

    const fetchUser = async () => {
        const token = sessionStorage.getItem('token');
        if (!token){
            Router.push('/auth/signin');
            return;
        }

        const response = await fetch(`${process.env.API_URL}/auth/user/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }});
        if (response.ok) {
            const data = await response.json();
            setUser(data);
        }
        else{
            Router.push('/auth/signin');
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <UserContext.Provider value={{user, setUser, refreshUser: fetchUser}}>
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