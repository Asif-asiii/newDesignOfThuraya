import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Forgotpass() {
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');

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

    const handleForgotPassword = async () => {
        if (validateEmail(email)) {
            try {
                const formData = new FormData();
                formData.append('email', email);

                const response = await axios.post('https://174.138.25.87:5000/api/forgot-password', formData);
                if (response.status === 200) {
                    setEmailSent(true);
                    setApiError('');
                }
            } catch (error) {
                setApiError('Error sending password reset email. Please try again.');
            }
        } else {
            setApiError('Please enter a valid email address.');
        }
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
                padding: '0 16px', // Add padding for mobile view
                boxSizing: 'border-box',
                '@media (min-width:600px)': {
                    padding: '0',
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '950px',
                    '@media (max-width:600px)': {
                        padding: '0',
                    }
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '500px', // Adjust for smaller screens
                        '@media (min-width:600px)': {
                            width: '60%',
                        },
                        '@media (max-width:600px)': {
                            width: '100%',
                        }
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            marginBottom: 2,
                            textAlign: 'center',
                            '@media (max-width:600px)': {
                                fontSize: '1.2rem',
                            },
                        }}
                    >
                        {forgotPassword ? 'Forgot Password' : 'Login'}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            marginBottom: 2,
                            '@media (max-width:600px)': {
                                fontSize: '1rem',
                            },
                        }}
                    >
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
                            marginTop: 2,
                            marginBottom: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                height: 40,
                            },
                            '@media (max-width:600px)': {
                                '& .MuiOutlinedInput-root': {
                                    height: 50,
                                },
                            },
                        }}
                    />
                    {emailSent && (
                        <Typography
                            color="success"
                            sx={{
                                marginBottom: 2,
                                color: 'green',
                                '@media (max-width:600px)': {
                                    fontSize: '0.9rem',
                                },
                            }}
                        >
                            Please check your email for the password reset link.
                        </Typography>
                    )}
                    {apiError && (
                        <Typography
                            color="error"
                            sx={{
                                marginBottom: 2,
                                '@media (max-width:600px)': {
                                    fontSize: '0.9rem',
                                },
                            }}
                        >
                            {apiError}
                        </Typography>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: '100%',
                            marginTop: 2,
                            '@media (min-width:600px)': {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            },
                        }}
                    >
                        <Link to={'/login'} style={{ width: '100%' }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: '20px',
                                    color: '#006A4E',
                                    fontWeight: 'bold',
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#006A4E',
                                    fontFamily: 'poppins, sans-serif',
                                    width: '100%',
                                    '@media (min-width:600px)': {
                                        width: '30%',
                                    },
                                }}
                                onClick={() => setForgotPassword(false)}
                            >
                                Back to Login
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: '20px',
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                backgroundColor: '#006A4E',
                                fontFamily: 'poppins, sans-serif',
                                width: '100%',
                                '@media (min-width:600px)': {
                                    width: '65%',
                                },
                            }}
                            onClick={handleForgotPassword}
                        >
                            Send Reset Link
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
