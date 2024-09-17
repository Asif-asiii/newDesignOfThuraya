import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, CircularProgress } from '@mui/material';
import Lottie from 'lottie-react';
import lottieAnimationData from '../../assets/3.json';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import './Tabs.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

export default function Pin() {
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [currentBalance, setCurrentBalance] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [refillAmount, setRefillAmount] = useState('');

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setPhone(value);
        }
    };

    const handlePinChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setPin(value);
        }
    };

    const validateForm = () => {
        if (pin.length !== 14) {
            setError('Pincode must be exactly 14 characters long.');
            setShowMessage(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        console.log('Submitting:', { phone, pin });
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://174.138.25.87:5000/api/pin-recharge', { phone, pin }, {
                headers: {
                    Authorization: Cookies.get('token'),
                },
            });

            if (response.status === 200) {
                setSuccess('Card Loaded Successfully');
                setRefillAmount(pin); // Assuming pin represents the refill amount
                setCurrentBalance(response.data.current_balance);
                setExpiryDate(response.data.expiry_date);
                setShowMessage(true);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                setError('Network error. Please try again later.');
            }
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    };
    // Helper function to format expiry date
const formatExpiryDate = (dateString) => {
    if (!dateString) return ''; // If no date provided, return empty string

    const [day, month, year] = dateString.split('.'); // Split the date by periods

    const formattedYear = year.slice(-2); // Get the last two digits of the year

    return `${month}/${formattedYear}`; // Return the month and year in MM/YY format
};


    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {showMessage ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: 4,
                    borderRadius: '12px',
                    textAlign: 'center',
                    width:'100%'
                }}>
                    <Box
                        sx={{
                            backgroundColor: success ? '#E1FEFC' : '#FFEBEB',
                            color: success ? '#006A4E' : '#FF0000',
                            borderRadius: '50%',
                            fontSize: '48px',
                        }}
                    >
                        {success ? <CheckCircleIcon sx={{ fontSize: '40px' }} /> : <CancelIcon sx={{ fontSize: '40px' }} />}
                    </Box>
                    <Typography sx={{ marginTop: 2, fontSize: '28px', color: '#1A1A1A', fontFamily: 'Poppins' }}>
                        {success ? 'Card Loaded Successfully' : 'Error'}
                    </Typography>
                    <Box>
                    {success && (
                        <Box sx={{ width: '100%', backgroundColor: '#F3F3F3', padding: 2, borderRadius: '12px', marginTop: 2 }}>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                                <Typography sx={{ fontSize: '16px', color: '#1A1A1A', fontFamily: 'Poppins' }}>Current Balance:</Typography>
                                <Typography sx={{ fontSize: '16px', color: '#1A1A1A', fontFamily: 'Poppins' }}>{currentBalance}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' ,marginTop:2}}>
                                <Typography sx={{ fontSize: '16px', color: '#1A1A1A', fontFamily: 'Poppins' }}>Sim Expiry:</Typography>
                                <Typography sx={{ fontSize: '16px', color: '#1A1A1A', fontFamily: 'Poppins' }}>{formatExpiryDate(expiryDate)}</Typography>
                            </Box>
                        </Box>
                    )}

                    </Box>
                    

                    <Box sx={{ width: '100%' }}>
                        <Link to='/home'>

                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: '20px',
                                    color: '#006A4E',
                                    fontWeight: 'bold',
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#006A4E',
                                    marginTop: 3,
                                    fontFamily: 'poppins',
                                    width: '20%', // Make button take full width of the Box
                                }}
                            >
                                Back to Home
                            </Button>

                        </Link>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <Box sx={{ width: '40%', marginRight: 2 }}>
                        <Lottie animationData={lottieAnimationData} loop style={{ width: '100%', height: 'auto' }} />
                    </Box>
                    <Box sx={{ width: '60%' }}>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>Enter Thuraya Number</Typography>
                            <TextField
                                placeholder="xxxxxxxx"
                                fullWidth
                                type="text"
                                variant="outlined"
                                sx={{
                                    marginBottom: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        height: 45,
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <span className="prefix">88216</span>
                                        </InputAdornment>
                                    ),
                                }}
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                            <TextField
                                placeholder="xxxxxxxxxxxxxx"
                                type="text"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    marginBottom: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        height: 45,
                                    },
                                }}
                                value={pin}
                                onChange={handlePinChange}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1, gap: '8px' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{
                                    borderRadius: '20px',
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    backgroundColor: '#006A4E',
                                }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} sx={{ color: '#717171' }} /> : 'Load Pin'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}









