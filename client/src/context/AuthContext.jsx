import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (identifier) => {
        try {
            const res = await axios.post('/api/auth/login', { identifier });
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            return { success: true, user: res.data };
        } catch (error) {
            console.error("Login failed", error);
            const message = error.response?.data?.message || error.message || 'Login failed';
            return { success: false, message: `Error: ${message}` };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
