import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SignupBanner from "../components/SignupBanner";
import axios from 'axios';
import './Signup.css'; // Add this for custom animations and styling
import Select from 'react-select';

export default function Signup() {
    const [showForm, setShowForm] = useState(true); // Controls form visibility
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [thurayaPhone, setThurayaPhone] = useState('');
    const [country, setCountry] = useState(null); // Initialize country as null
    const [apiError, setApiError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // Tracks if signup was successful
    const [countries, setCountries] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Tracks loading state


    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');

                const countryOptions = response.data.map((country) => ({
                    value: country.cca2, // ISO 3166-1 alpha-2 country code
                    label: country.name.common, // Country name
                }));

                // Sort country options alphabetically by country name
                countryOptions.sort((a, b) => a.label.localeCompare(b.label));

                setCountries(countryOptions);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const validateFields = () => {
        let newErrors = {};
        if (!firstName) newErrors.firstName = 'First Name is required';
        if (!lastName) newErrors.lastName = 'Last Name is required';
        if (!email) newErrors.email = 'Email is required';
        else if (!validateEmail(email)) newErrors.email = 'Invalid email address';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!country) newErrors.country = 'Country is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleThurayaPhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setThurayaPhone(value);
    };

    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption); // Set the selected option (which includes both value and label)
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate password and confirm password
        if (password !== confirmPassword) {
            setApiError('Passwords do not match.');
            return;
        }
        if (validateFields()) {
            setIsLoading(true); // Start loading
            try {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('password', password);
                formData.append('first_name', firstName);
                formData.append('last_name', lastName);
                formData.append('thuraya_phone', thurayaPhone);
                formData.append('country', country ? country.value : ''); // Ensure country.value is used

                const response = await axios.post(`https://174.138.25.87:5000/api/signup`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // On success, hide the form and show the success message
                setSuccessMessage(response.data.message);
                setIsSuccess(true);
                setApiError('');
                setShowForm(false); // Hide form

            } catch (error) {
                if (error.response) {
                    setApiError(error.response.data.message || 'Signup failed');
                    setIsSuccess(false); // Indicate failure
                    setShowForm(false); // Hide form
                } else {
                    setApiError('An error occurred. Please try again.');
                    setIsSuccess(false); // Indicate failure
                    setShowForm(false); // Hide form
                }
            }
            finally {
                setIsLoading(false); // Stop loading
            }
        } else {
            console.log('Form has errors');
        }
    };

    const handleReturnSignup = () => {
        setShowForm(true); // Show the signup form again
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '100%', // Set the desired width
            marginBottom: '15px',
            height: '43px',
            borderRadius: '12px'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black', // Change text color to black
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'black', // Change placeholder color to black
        }),
        menu: (provided) => ({
            ...provided,
            color: 'black', // Set the text color of the dropdown menu
            zIndex: '999'
        }),
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%', fontFamily: 'poppins,sans-serif' }}  style={{marginBottom:"50px"}}>
        <SignupBanner />
            {showForm ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', width: '100%', maxWidth: '950px' }}>
                    <Box sx={{ width: '60%' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}>
                            Signup
                        </Typography>
                        {/* Form Fields */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <Box>

                                <Typography variant="h7" sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}>
                                    Enter First Name
                                </Typography>
                                <TextField
                                    placeholder='First Name'
                                    variant="outlined"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    fullWidth
                                    sx={{
                                        marginTop: 1,
                                        marginBottom: 2,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            height: 45
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            fontFamily: 'Poppins, sans-serif'
                                        }
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography variant="h7" sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}>
                                    Enter Last Name
                                </Typography>
                                <TextField
                                    placeholder='Last Name'
                                    variant="outlined"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    fullWidth
                                    sx={{
                                        marginTop: 1,
                                        marginBottom: 2,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            height: 45
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            fontFamily: 'Poppins, sans-serif'
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Typography variant="h7" sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
                            Enter Country
                        </Typography>
                        <Select
                            options={countries}
                            value={country} // Pass the selected country (object)
                            onChange={handleCountryChange}
                            placeholder='Select Country'
                            styles={{
                                ...customStyles,
                                singleValue: (provided) => ({
                                    ...provided,
                                    fontFamily: 'Poppins, sans-serif' // Apply Poppins font to selected value
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    fontFamily: 'Poppins, sans-serif' // Apply Poppins font to placeholder
                                })
                            }}
                        />
                        {errors.country && <Typography color="error" sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>{errors.country}</Typography>}
                        <Typography variant="h7" sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>Enter Thuraya Phone Number</Typography>
                        <TextField
                            placeholder='Thuraya Number (Optional)'
                            variant="outlined"
                            value={thurayaPhone}
                            onChange={handleThurayaPhoneChange}
                            fullWidth
                            sx={{
                                marginBottom: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    height: 45
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    fontFamily: 'Poppins, sans-serif'
                                },

                            }}
                            InputProps={{

                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span className="prefix">88216</span>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Typography variant="h7" sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>Enter Email</Typography>
                        <TextField
                            placeholder='Enter Email'
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
                                    height: 45
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    fontFamily: 'Poppins, sans-serif'
                                }
                            }}
                        />
                        <Typography variant="h7" sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>Enter Password</Typography>
                        <TextField
                            placeholder='Enter Password'
                            error={!!errors.password}
                            helperText={errors.password}
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={handlePasswordChange}
                            fullWidth
                            sx={{
                                marginBottom: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    height: 45
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    fontFamily: 'Poppins, sans-serif'
                                }
                            }}
                        />
                        <Typography variant="h7" sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>Confirm Password</Typography>
                        <TextField
                            placeholder='Enter Password'
                            error={!!errors.password}
                            helperText={errors.password}
                            type="password"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            sx={{
                                marginBottom: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    height: 45
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    fontFamily: 'Poppins, sans-serif'
                                }
                            }}
                        />

                        {apiError && <Typography color="error" sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>{apiError}</Typography>}
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: '20px',
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                backgroundColor: '#006A4E',
                                width: '100%',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                            onClick={handleSignup}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} sx={{ color: '#717171' }} />
                            ) : (
                                'Signup'
                            )}
                        </Button>
                    </Box>

                </Box>

            ) : (
                <Box className="success-box">
                    {isSuccess ? (
                        <CheckCircleIcon className='success-icon success' />
                    ) : (
                        <CancelIcon className='failure-icon error' />
                    )}
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>{isSuccess ? successMessage : apiError}</Typography>
                    <Button onClick={handleReturnSignup} sx={{ borderRadius: '20px', color: '#FFFFFF', fontWeight: 'bold', backgroundColor: '#006A4E', fontFamily: 'poppins,sans-serif' }}>Back to Signup</Button>
                </Box>
            )}
        </Box>
    );
}



