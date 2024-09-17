import React, { useState } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import './Login.css';
import LoginBanner from "../components/LoginBanner";

export default function Login() {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiError, setApiError] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [showForm, setShowForm] = useState(true); // Controls form visibility
    const [isSuccess, setIsSuccess] = useState(false); // Tracks if signup was successful
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Tracks loading state

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

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            setIsLoading(true); // Start loading
            try {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('password', password);

                const response = await axios.post('https://174.138.25.87:5000/api/login', formData);
                const { access_token, first_name, last_name } = response.data;

                localStorage.setItem('userInfo', JSON.stringify({ first_name, last_name }));
                const token = Cookies.set('token', access_token);
                const decodedToken = jwtDecode(token);
                if (decodedToken.user_role === 'customer') {
                    setApiError('');
                    window.location.href = "/";
                }
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
            } finally {
                setIsLoading(false); // Stop loading
            }
        }
    };

    const validateFields = () => {
        return email && password && !errors.email;
    };

    const handleReturnLogin = () => {
        setShowForm(true); // Show the signup form again
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                minHeight: '100vh', 
                width: '100%', 
                fontFamily: 'poppins, sans-serif',
                marginBottom: "50px",
                padding: 2,
                backgroundColor: '#f9f9f9', // Light background for better contrast
            }}
        >
            <LoginBanner />
            {showForm ? (
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    width: '100%', 
                    maxWidth: { xs: '100%', sm: '600px', md: '950px' }, // Responsive max-width
                    padding: 2
                }}>
                    <Box sx={{ width: '100%' }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                marginBottom: 2, 
                                fontWeight: 'bold', 
                                textAlign: 'center' 
                            }}
                        >
                             Login
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Enter Email
                            </Typography>
                            <TextField
                                placeholder='Enter Email here'
                                variant="outlined"
                                value={email}
                                onChange={handleEmailChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                fullWidth
                                sx={{
                                    marginBottom: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Enter Password
                            </Typography>
                            <TextField
                                placeholder='Enter Password here'
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={handlePasswordChange}
                                fullWidth
                                sx={{
                                    marginBottom: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            {apiError && (
                                <Typography color="error" sx={{ marginBottom: 1, textAlign: 'center' }}>
                                    {apiError}
                                </Typography>
                            )}
                            <Link to={'/forgot-password'}>
                                <Button
                                    variant="text"
                                    sx={{
                                        color: '#006A4E',
                                        textAlign: 'left',
                                        marginBottom: 2,
                                        fontFamily: 'Poppins, sans-serif',
                                    }}
                                    onClick={() => setForgotPassword(true)}
                                >
                                    Forgot Password?
                                </Button>
                            </Link>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: '20px',
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    backgroundColor: '#006A4E',
                                    width: '100%',
                                    marginBottom: 2
                                }}
                                onClick={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <CircularProgress size={24} sx={{ color: '#717171' }} />
                                ) : (
                                    'Login'
                                )}
                            </Button>
                            <Box
                                variant="contained"
                                sx={{
                                    borderRadius: '10px',
                                    color: '#717171',
                                    backgroundColor: '#F3F3F3',
                                    width: '100%',
                                    textAlign: 'center',
                                    padding: 1
                                }}
                            >
                                Don't have an Account yet?
                                <Link to={'/signup'}>
                                    <Button sx={{ color: '#006A4E', fontFamily: 'Poppins, sans-serif' }}>Sign up</Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box className="success-box" sx={{ textAlign: 'center', padding: 2 }}>
                    {isSuccess ? (
                        <CheckCircleIcon className='success-icon success' />
                    ) : (
                        <CancelIcon className='failure-icon error' />
                    )}
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>{isSuccess ? successMessage : apiError}</Typography>
                    <Button 
                        onClick={handleReturnLogin} 
                        sx={{ 
                            borderRadius: '20px', 
                            color: '#FFFFFF', 
                            fontWeight: 'bold', 
                            backgroundColor: '#006A4E', 
                            fontFamily: 'poppins,sans-serif' 
                        }}
                    >
                        Back to Login
                    </Button>
                </Box>
            )}
        </Box>
    );
}
