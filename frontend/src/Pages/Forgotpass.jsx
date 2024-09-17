import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ForgotBanner from "../components/ForgotBanner";

export default function Forgotpass() {
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
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
                padding: { xs: 2, md: 4 },
                backgroundColor: '#f9f9f9' // Light background for better visibility
            }}
        >
            <ForgotBanner />
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    width: '100%', 
                    maxWidth: '600px', // Max width for better layout on larger screens
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    backgroundColor: '#fff' // White background for the form box
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
                        Forgot Password
                    </Typography>

                    <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'center' }}>
                        Enter your email to reset your password
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
                            },
                        }}
                    />
                    {emailSent && (
                        <Typography color="success" sx={{ marginBottom: 2, color: 'green', textAlign: 'center' }}>
                            Please check your email for the password reset link.
                        </Typography>
                    )}
                    {apiError && (
                        <Typography color="error" sx={{ marginBottom: 2, textAlign: 'center' }}>
                            {apiError}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', marginTop: 2 }}>
                        <Link to={'/login'} style={{ width: '100%', marginBottom: { xs: 2, sm: 0 } }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: '20px',
                                    color: '#006A4E',
                                    fontWeight: 'bold',
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#006A4E',
                                    width: '100%'
                                }}
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
                                width: '100%',
                                marginLeft: { sm: 2 }
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
