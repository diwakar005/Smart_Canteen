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

    const login = async (identifier, password) => {
        try {
            const res = await axios.post('/api/auth/login', { identifier, password });
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            // Set default auth header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            return { success: true, user: res.data };
        } catch (error) {
            console.error("Login failed", error);
            const message = error.response?.data?.message || error.message || 'Login failed';
            return { success: false, message: `Error: ${message}` };
        }
    };

    const register = async (userData) => {
        try {
            const res = await axios.post('/api/auth/register', userData);
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            return { success: true, user: res.data };
        } catch (error) {
            console.error("Registration failed", error);
            const message = error.response?.data?.message || error.message || 'Registration failed';
            return { success: false, message: `Error: ${message}` };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
