import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField } from '@mui/material';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added success message state

  // Extract token from URL
  useEffect(() => {
    const pathToken = window.location.pathname.split('/').pop(); // Extract token from URL path
    setToken(pathToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setApiError('');
    setSuccessMessage('');

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setApiError('Passwords do not match.');
      return;
    }

    try {
        const formData = new FormData();
        formData.append('password', password);
    
      // Send the new password with the token in the URL
      await axios.post(
        `https://174.138.25.87:5000/api/reset-password/${token}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } } 
      );
      setSuccessMessage('Password reset successfully.');
    } catch (error) {
      console.error('Error resetting password:', error);
      setApiError('Failed to reset password. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%', fontFamily: 'poppins, sans-serif' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '950px' }}>
        <Box sx={{ width: '60%' }}>
          <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center' }}>
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Enter New Password
            </Typography>
            <TextField
              type="password"
              placeholder='Enter new password'
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: 40
                },
              }}
            />
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Confirm Password
            </Typography>
            <TextField
              type="password"
              placeholder='Confirm new password'
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: 40
                },
              }}
            />
            {apiError && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {apiError}
              </Typography>
            )}
            {successMessage && (
              <Typography color="success" sx={{ marginBottom: 2 }}>
                {successMessage}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: '20px',
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#006A4E',
                width: '100%',
                fontFamily: 'poppins, sans-serif'
              }}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
