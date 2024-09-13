import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoginBanner from './LoginBanner';

export default function Login() {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiError, setApiError] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setErrors(prev => ({ ...prev, email: "Invalid email address" }));
        } else {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (validateFields()) {
            try {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('password', password);

                const response = await axios.post('https://174.138.25.87:5000/api/login', formData);
                const { access_token, first_name, last_name } = response.data;

                Cookies.set('token', access_token);
                Cookies.set('userInfo', JSON.stringify({ first_name, last_name }));
                setSuccessMessage(response.data.message);
                setIsSuccess(true);

            } catch (error) {
                if (error.response) {
                    setApiError(error.response.data.message || 'Login failed');
                } else if (error.request) {
                    setApiError('No response from server');
                } else {
                    setApiError('An error occurred. Please try again.');
                }
            }
        }
    };

    const validateFields = () => {
        return email && password && !errors.email;
    };

    const handleReturnLogin = () => {
        setShowForm(true);
    };

    return (
        <div >
        <LoginBanner/>
        <div className="flex flex-col items-center min-h-screen w-full font-sans mt-[200px] mb-0">
        {showForm ? (
            <div className="flex justify-center w-full max-w-2xl">
                <div className="w-3/5">
                    <h2 className="mb-4 text-xl text-center font-semibold">{forgotPassword ? 'Forgot Password' : 'Login'}</h2>
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm">Enter Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email here"
                            value={email}
                            onChange={handleEmailChange}
                            className={`mb-2 p-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:ring-green-500`}
                        />
                        {errors.email && <p className="mb-2 text-sm text-red-500">{errors.email}</p>}
                        <label className="mb-2 text-sm">Enter Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password here"
                            value={password}
                            onChange={handlePasswordChange}
                            className="mb-2 p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-green-500"
                        />
                        {apiError && <p className="mb-2 text-sm text-red-500">{apiError}</p>}
                        <Link to={'/forgot-password'} className="mb-2 text-sm text-green-700 text-left">
                            Forgot Password?
                        </Link>
                        <button
                            onClick={handleLogin}
                            className="w-full py-2 mt-2 text-white bg-green-700 rounded-full font-semibold"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 p-4 text-center">
                <CheckCircleIcon className={`${isSuccess ? 'text-green-500 animate-pulse' : 'text-red-500'}`} style={{ fontSize: '5rem', marginBottom: '20px' }} />
                <h2 className="mb-4 text-xl">{successMessage}</h2>
                <button onClick={handleReturnLogin} className="px-4 py-2 text-white bg-green-700 rounded-full">
                    Back to Login
                </button>
            </div>
        )}
    </div>
        </div>
      
    );
}
