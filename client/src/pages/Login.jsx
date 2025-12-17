import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Utensils, User, ArrowRight } from 'lucide-react';
import '../index.css'; // Ensure we use global styles

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [userType, setUserType] = useState('student');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!identifier.trim()) {
            setError('Please enter your ID');
            return;
        }

        let finalIdentifier = identifier.trim();

        // Student Validation
        if (userType === 'student') {
            // Strict Format: 2022b0101509
            const idRegex = /^\d{4}[a-zA-Z]\d+$/;
            if (!idRegex.test(finalIdentifier)) {
                setError('Invalid Admission Number. Format: 2022b0101509');
                return;
            }
            if (!password) {
                setError('Password is required');
                return;
            }
            if (isRegistering && !email) {
                setError('Email is required');
                return;
            }
            if (isRegistering && !name) {
                setError('Name is required');
                return;
            }
        } else {
            // Legacy Auto-Prefix for Teacher/Admin
            finalIdentifier = finalIdentifier.toUpperCase();
            if (userType === 'teacher' && !finalIdentifier.startsWith('T')) {
                finalIdentifier = 'T' + finalIdentifier;
            }
            // Admin IDs passed as is
        }

        let result;
        if (userType === 'student' && isRegistering) {
            result = await register({ identifier: finalIdentifier, email, password, name });
        } else {
            // Login for everyone
            result = await login(finalIdentifier, password);
        }

        if (result.success) {
            if (result.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/menu');
            }
        } else {
            setError(result.message);
        }
    };

    const getPlaceholder = () => {
        switch (userType) {
            case 'student': return 'Admission No (e.g. 2022b0101509)';
            case 'teacher': return 'Enter Teacher ID (e.g. 101)';
            case 'admin': return 'Enter Admin ID (e.g. A1)';
            default: return 'Enter ID';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:scale-[1.01]">
                <div className="text-center mb-8">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Utensils className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Campus Canteen</h1>
                    <p className="text-gray-500">Fresh, hot, and hygienic meals.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Toggle Switch */}
                    <div className="flex p-1 bg-gray-100 rounded-lg">
                        <button
                            type="button"
                            onClick={() => { setUserType('student'); setIsRegistering(false); }}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${userType === 'student'
                                ? 'bg-white text-orange-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => { setUserType('teacher'); setIsRegistering(false); }}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${userType === 'teacher'
                                ? 'bg-white text-orange-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Teacher
                        </button>
                        <button
                            type="button"
                            onClick={() => { setUserType('admin'); setIsRegistering(false); }}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${userType === 'admin'
                                ? 'bg-white text-orange-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Admin
                        </button>
                    </div>

                    {/* Register/Login Toggle for Students */}
                    {userType === 'student' && (
                        <div className="flex justify-center gap-4 text-sm">
                            <button
                                type="button"
                                onClick={() => setIsRegistering(false)}
                                className={`pb-1 border-b-2 ${!isRegistering ? 'border-orange-600 text-orange-600 font-bold' : 'border-transparent text-gray-500'}`}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsRegistering(true)}
                                className={`pb-1 border-b-2 ${isRegistering ? 'border-orange-600 text-orange-600 font-bold' : 'border-transparent text-gray-500'}`}
                            >
                                Register
                            </button>
                        </div>
                    )}

                    <div className="space-y-4">
                        {isRegistering && userType === 'student' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Enter your name"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {userType === 'student' ? 'Admission Number' : userType === 'teacher' ? 'Teacher ID' : 'Admin ID'}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                    placeholder={getPlaceholder()}
                                />
                            </div>
                        </div>

                        {isRegistering && userType === 'student' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                        )}

                        {userType === 'student' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Enter password"
                                />
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                    >
                        {isRegistering ? 'Register' : 'Login'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    <p>{userType === 'student' ? 'Students must register first.' : 'Enter your ID to login.'}</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
