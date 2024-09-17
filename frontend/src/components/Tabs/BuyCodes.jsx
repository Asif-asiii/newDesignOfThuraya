import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

import Slider from 'react-slick';
import Lottie from 'lottie-react';
import lottieAnimationData from '../../assets/2.json';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Tabs.css'
export default function BuyCodes() {
    const [breadcrumbIndex, setBreadcrumbIndex] = useState(0);
    const [selectedCards, setSelectedCards] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [cardType, setCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [mandatoryErrors, setMandatoryErrors] = useState({});
    const [cardAvailability, setCardAvailability] = useState({});
    const [paymentMessage, setPaymentMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isGuest, setIsGuest] = useState(true);
    const [promoCode, setPromoCode] = useState('');
    const [promoMessage, setPromoMessage] = useState('');
    const [discount, setDiscount] = useState(0); // New state for discount
    const [refillUnits, setRefillUnits] = useState(null);
    const [currentBalance, setCurrentBalance] = useState(null);
    const [simExpiry, setSimExpiry] = useState(null);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [isPaymentError, setIsPaymentError] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const initialUnitOptions = [
        { units: 10, price: 10 },
        { units: 20, price: 20 },
        { units: 39, price: 39 },
        { units: 50, price: 50 },
        { units: 80, price: 80 },
        { units: 160, price: 160 },
        { units: 500, price: 500 },
        { units: 1000, price: 1000 },
        { units: 2500, price: 2500 },
    ];
    // const tabBreadcrumbs = [
    //     { label: '1', content: 'Buy Codes: Step 1 Content' },
    //     { label: '2', content: 'Buy Codes: Step 2 Content' },
    //     { label: '3', content: 'Buy Codes: Step 3 Content' },
    // ];
    const tabBreadcrumbs = [
        { label: 'Purchase Codes' },
        { label: 'Summary' },
        { label: 'Payment' }
    ];

    const handleBreadcrumbClick = (index) => {
        setBreadcrumbIndex(index);
    };




    useEffect(() => {
        const token = Cookies.get('token'); // Get token from cookies
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decode the token to get the email
                setEmail(decoded.sub); // Set email from the decoded token
                setIsGuest(false); // If the token exists, user is not a guest
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
        // Fetch card availability from the API
        const fetchCardAvailability = async () => {
            try {
                const response = await fetch('https://174.138.25.87:5000/api/check-availability');
                const data = await response.json();
                setCardAvailability(data);
            } catch (error) {
                console.error('Error fetching card availability:', error);
            }
        };

        fetchCardAvailability();
    }, []);



    const handleCardClick = (index) => {
        setSelectedCards((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };
    const handleNextClick = async () => {
        try {
            // Check if promo code is entered and validate it before moving to the next breadcrumb
            if (promoCode) {
                const response = await axios.post('https://174.138.25.87:5000/api/check-promo', {
                    promo_code: promoCode,
                    type: 'purchase',  // Assuming 'purchase' as type
                });

                if (response.status === 200) {
                    // Promo code is valid, apply discount
                    setPromoMessage('Promo code applied successfully!');
                    setDiscount(response.data.discount || 0); // Assume backend returns a discount value
                    // Move to the next breadcrumb
                    handleBreadcrumbClick(breadcrumbIndex + 1);
                }
            } else {
                // If no promo code, just move to the next breadcrumb
                setPromoMessage('');
                setDiscount(0);
                handleBreadcrumbClick(breadcrumbIndex + 1);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Show error message from backend if promo code is invalid
                setPromoMessage(error.response.data.message);
                setDiscount(0);
            } else {
                setPromoMessage('Failed to apply promo code. Please try again.');
                setDiscount(0);  // Reset discount on failure
            }
        }
    };


    const handleBackClick = () => {
        if (breadcrumbIndex > 0) {
            handleBreadcrumbClick(breadcrumbIndex - 1);  // Moves to the previous breadcrumb
        }
    };

    const handleQuantityChange = (index, delta) => {
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            if (newQuantities[index] === undefined) newQuantities[index] = 0;
            newQuantities[index] = Math.max(0, newQuantities[index] + delta);
            return newQuantities;
        });
    };

    const calculateTotalAmountCents = () => {
        let total = selectedCards.reduce((sum, cardIndex) => {
            const unitOption = initialUnitOptions[cardIndex];
            return sum + unitOption.price * (quantities[cardIndex] || 1);
        }, 0);

        // Apply discount if any
        if (discount > 0) {
            total = total - (total * (discount / 100)); // Discount in percentage
        }

        return total;
    };


    const handlePaymentSubmission = async () => {
        if (!stripe || !elements) return;

        setLoading(true);
        setPaymentMessage('');

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        const totalAmountCents = calculateTotalAmountCents();

        try {
            // Step 1: Create Payment Intent
            const paymentIntentRes = await axios.post(
                'https://174.138.25.87:5000/pay',
                {
                    amount: totalAmountCents,
                    email: email,
                    type: 'purchase'
                }
            );

            const { client_secret: clientSecret } = paymentIntentRes.data;
            console.log('Client Secret:', clientSecret); // Log the client secret

            if (!clientSecret) {
                throw new Error('No client secret');
            }

            // Step 2: Confirm the payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement,
                    billing_details: { email: email },
                },
            });

            if (error) {
                setPaymentMessage(`Payment failed: ${error.message}`);
                setIsPaymentError(true);
            } else if (paymentIntent.status === 'succeeded') {
                console.log('Payment Successful');

                // Add the client_secret to headers for the next request
                const token = Cookies.get('token');
                const headers = { 'Client-Secret': clientSecret };

                if (token) {
                    headers['Authorization'] = `${token}`;
                }

                // Step 3: Call the purchase API after successful payment
                const purchaseRes = await axios.post(
                    'https://174.138.25.87:5000/api/purchase',
                    {
                        email: email,
                        units: selectedCards.map((index) => ({
                            id: index,
                            name: `${initialUnitOptions[index].units} units`,
                            price: initialUnitOptions[index].price,
                            quantity: quantities[index] || 1,

                        })),
                        promo_code: promoCode || null
                    },
                    { headers } // Send headers (with token if logged in, client_secret always)
                );
                const responseData = purchaseRes.data;
                if (purchaseRes.status === 200) {
                    setPaymentMessage(responseData.message);
                    setIsPaymentSuccessful(true);
                } else {
                    setPaymentMessage('Purchase failed. Please try again.');
                }
            } else {
                setPaymentMessage('Payment incomplete. Please complete payment to proceed.');
            }
        } catch (error) {
            console.error('Error during payment submission:', error); // Log the error for debugging
            setPaymentMessage(`Error: ${error.message}`);
            setIsPaymentError(true);
        } finally {
            setLoading(false);
        }
    };


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

    const handleProceedToPayment = () => {
        if (selectedCards.length === 0) return;
        handleBreadcrumbClick(2);
    };
    const isProceedDisabled = selectedCards.length === 0;

    const validateFields = () => {
        let errors = {};
        if (!cardType) errors.cardType = "Card Type is required";
        if (!cardNumber) errors.cardNumber = "Card Number is required";

        if (!expiryDate) errors.expiryDate = "Expiry Date is required";
        if (!cvv) errors.cvv = "CCV/CVV is required";

        setMandatoryErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = () => {
        if (validateFields()) {
            // Proceed with form submission logic
            console.log('Form submitted successfully');
        } else {
            console.log('Form has errors');
        }
    };



    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <ArrowForwardIosIcon />,
        prevArrow: <ArrowBackIosIcon />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    const renderSuccessBox = () => (
        <>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: 4,
                    borderRadius: '12px',
                    textAlign: 'center',
                }}
            >
                <CheckIcon
                    sx={{
                        backgroundColor: '#E1FEFC',
                        color: '#006A4E',
                        borderRadius: '50%',
                        fontSize: '48px',
                    }}
                />
                <Typography
                    sx={{
                        marginTop: 2,
                        fontSize: '28px',
                        color: '#1A1A1A',
                        fontFamily: 'poppins',
                    }}
                >
                    Code sent successfully
                </Typography>

                <Typography
                    sx={{
                        marginTop: 2,
                        fontSize: '16px',
                        color: '#1A1A1A',
                        fontFamily: 'poppins',
                    }}
                >
                    We have emailed you your Codes
                </Typography>
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


        </>

    );

    const renderErrorBox = () => (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: 4,
                    borderRadius: '12px',
                    textAlign: 'center',
                }}
            >
                <CancelIcon
                    sx={{
                        backgroundColor: '#FFFFFF',
                        color: 'red',
                        borderRadius: '50%',
                        fontSize: '48px',
                    }}
                />
                <Typography
                    sx={{
                        marginTop: 2,
                        fontSize: '28px',
                        color: '#1A1A1A',
                        fontFamily: 'poppins',
                    }}
                >
                    Refill UnSuccessful
                </Typography>
                <Box
                    sx={{
                        width: '40%',
                        backgroundColor: '#F3F3F3',
                        padding: 1,
                        borderRadius: '12px',
                        marginTop: 2,
                    }}
                >
                    {/* Container for headings and values */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: '4px 0', // Optional, adds vertical padding between rows
                        }}
                    >

                    </Box>
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


        </>
    );





    const renderBreadcrumbs = () => (
        <Box sx={{ width: '100%', marginBottom: 2 }}>
            <Box display="flex" justifyContent="end" alignItems="center">
                {tabBreadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={index}>
                        <Box display="flex" alignItems="center">
                            {/* Breadcrumb Circle with Number */}
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    backgroundColor: index < breadcrumbIndex ? '#006A4E' : index === breadcrumbIndex ? '#173567' : '#D3D3D3',
                                    color: '#fff',
                                    marginRight: 1,
                                    fontFamily: 'poppins',
                                }}
                            >
                                {index < breadcrumbIndex ? <CheckIcon sx={{ color: '#fff', fontSize: '14px' }} /> : index + 1}
                            </Box>

                            {/* Step Label */}
                            <Typography
                                sx={{
                                    fontFamily: 'poppins',
                                    color: index < breadcrumbIndex ? '#1A1A1A' : index === breadcrumbIndex ? '#1A1A1A' : '#A9A9A9',

                                    marginLeft: 1
                                }}
                            >
                                {breadcrumb.label} {/* Here, add the label next to the number */}
                            </Typography>
                        </Box>

                        {/* Separator */}
                        {index < tabBreadcrumbs.length - 1 && (
                            <Typography sx={{ fontFamily: 'poppins', marginX: 2, color: '#B0C4DE', fontSize: '24px' }}>›</Typography>
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
    const renderContent = () => {
        switch (breadcrumbIndex) {
            case 0:
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderBreadcrumbs()}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>

                            <Box sx={{ width: '40%', marginRight: 2 }}>
                                <Lottie
                                    animationData={lottieAnimationData}
                                    loop
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </Box>

                            <Box sx={{ width: '60%' }}>

                                <Typography variant="h6" sx={{ marginBottom: 2, fontFamily: 'poppins' }}>
                                    Select Buy Codes
                                </Typography>

                                <Box sx={{ marginBottom: 2 }}>
                                    <Slider {...carouselSettings}>
                                        {initialUnitOptions.map((option, index) => (
                                            <Box key={index} sx={{ padding: 1, margin: '0 8px' }}>
                                                <Box
                                                    sx={{
                                                        width: selectedCards.includes(index) ? '100px' : '80px',
                                                        height: selectedCards.includes(index) ? '170px' : '120px',
                                                        backgroundColor: '#FFFFFF',
                                                        borderRadius: '12px',
                                                        border: selectedCards.includes(index) ? '2px solid #006A4E' : '1px solid #D3D3D3',
                                                        boxShadow: selectedCards.includes(index) ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                                                        padding: '16px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        position: 'relative',
                                                        cursor: cardAvailability[option.units] ? 'pointer' : 'not-allowed',
                                                        opacity: cardAvailability[option.units] ? 1 : 0.5,
                                                        transition: 'border-color 0.3s, box-shadow 0.3s, width 0.3s, height 0.3s',
                                                        '&:hover': {
                                                            borderColor: cardAvailability[option.units] ? '#006A4E' : 'inherit',
                                                            boxShadow: cardAvailability[option.units] ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'inherit',
                                                        },
                                                    }}
                                                    onClick={() => handleCardClick(index)}
                                                >
                                                    {!cardAvailability[option.units] && (
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: -5,
                                                                right: 8,
                                                                backgroundColor: 'red',
                                                                color: 'white',
                                                                padding: '2px 8px',
                                                                borderRadius: '8px',
                                                                fontSize: '12px',
                                                                fontFamily: 'poppins'

                                                            }}
                                                        >
                                                            Not Available
                                                        </Box>
                                                    )}
                                                    {selectedCards.includes(index) && (
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: '-8px',
                                                                left: '50%',
                                                                transform: 'translateX(-50%)',
                                                                height: '24px',
                                                                padding: '0 8px',
                                                                backgroundColor: '#006A4E',
                                                                color: '#FFFFFF',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: '12px',

                                                                fontSize: '0.5rem',
                                                                fontFamily: 'poppins',
                                                                
                                                                width: '90px'

                                                            }}
                                                        >
                                                            Best Value
                                                        </Box>
                                                    )}
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            width: '100%',
                                                            height: '100%',
                                                            justifyContent: 'space-between',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <Typography variant="h6" sx={{ fontSize: '16px', fontFamily: 'poppins', fontWeight: selectedCards.includes(index) ? 'bold' : 'normal', marginBottom: '8px' }}>
                                                            {option.units} Units
                                                        </Typography>
                                                        <Typography sx={{ fontFamily: 'poppins', fontWeight: 'bold', color: selectedCards.includes(index) ? '#006A4E' : '#1A1A1A', marginBottom: selectedCards.includes(index) ? '60px' : '16px' }}>
                                                            ${option.price}
                                                        </Typography>
                                                        {selectedCards.includes(index) && (
                                                            <>
                                                                <hr style={{ width: '100%', border: '1px solid #D3D3D3', margin: '0', position: 'absolute', bottom: '60px', visibility: 'visible' }} />
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        border: '1px solid #E4E4E4',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        position: 'absolute',
                                                                        bottom: '10px',
                                                                        left: 0,
                                                                        right: 0,
                                                                        padding: '0 16px',
                                                                        boxSizing: 'border-box',
                                                                        width: '100%'
                                                                    }}
                                                                >
                                                                    <Button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleQuantityChange(index, -1);
                                                                        }}
                                                                        sx={{
                                                                            borderRadius: '0px',
                                                                            borderRight: '1px solid #E4E4E4',
                                                                            fontFamily: 'poppins',
                                                                        }}
                                                                    >
                                                                        -
                                                                    </Button>
                                                                    <Typography sx={{ margin: '0 5px', fontFamily: 'poppins' }}>
                                                                        {quantities[index] || 0}
                                                                    </Typography>
                                                                    <Button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleQuantityChange(index, 1);
                                                                        }}
                                                                        sx={{
                                                                            borderRadius: '0px',
                                                                            borderLeft: '1px solid #E4E4E4',
                                                                            fontFamily: 'poppins'
                                                                        }}
                                                                    >
                                                                        +
                                                                    </Button>
                                                                </Box>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Slider>
                                </Box>

                                {selectedCards.length > 0 && (<Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                        <Typography sx={{ width: '60%', fontFamily: 'poppins', fontSize: '16px' }}>
                                            Enter Promo code (If available)
                                        </Typography>
                                        <TextField
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            variant="outlined"

                                            sx={{
                                                marginBottom: 1,
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    height: 45
                                                },

                                                width: '70%',
                                                fontFamily: 'poppins',

                                            }}
                                            InputProps={{
                                                sx: {
                                                    height: 43,
                                                    background: '#FFFFFF',
                                                    borderRadius: '12px',
                                                    fontFamily: 'poppins'

                                                },
                                            }}
                                        />
                                    </Box>


                                    {isGuest && (<TextField
                                        label="Enter your email address"
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
                                            fontFamily: 'poppins'
                                        }}
                                    />)}
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius: '20px',
                                            color: '#FFFFFF',
                                            fontWeight: 'bold',
                                            backgroundColor: '#006A4E',
                                            width: '100%',
                                            marginTop: 1,
                                            fontFamily: 'poppins'
                                        }}
                                        onClick={handleNextClick}
                                    >
                                        Next
                                    </Button>
                                </Box>)}
                            </Box>
                        </Box>
                    </Box>
                );
            case 1:
                return (
                    <>
                        {renderBreadcrumbs()}
                        <Box sx={{ width: '100%', display: 'flex', padding: 3 }}>

                            <Box sx={{ width: '40%', marginRight: 2 }}>
                                <Lottie
                                    animationData={lottieAnimationData}
                                    loop
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </Box>

                            <Box sx={{ width: '60%', padding: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'poppins', color: '#1A1A1A' }}>
                                    Summary
                                </Typography>


                                <Box sx={{ backgroundColor: '#F3F3F3', padding: 2, borderRadius: '8px' }}>
                                    {selectedCards.length > 0 ? (
                                        <>
                                            {selectedCards.map((index) => (
                                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'poppins' }}>
                                                        {quantities[index] || 1}x
                                                    </Typography>
                                                    <Typography sx={{ fontFamily: 'poppins' }} variant="body1">{initialUnitOptions[index].units} units</Typography>
                                                    <Typography sx={{ fontFamily: 'poppins' }} variant="body1">
                                                        ${initialUnitOptions[index].price * (quantities[index] || 1)}
                                                    </Typography>
                                                </Box>
                                            ))}

                                            {/* Display Subtotal */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'poppins' }}>Subtotal</Typography>
                                                <Typography sx={{ fontFamily: 'poppins' }} variant="body1">
                                                    ${selectedCards.reduce((total, cardIndex) => total + initialUnitOptions[cardIndex].price * (quantities[cardIndex] || 1), 0)}
                                                </Typography>
                                            </Box>

                                            {/* Display Discount if applicable */}
                                            {discount > 0 && (
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'green', fontFamily: 'poppins' }}>Discount ({discount}%)</Typography>
                                                    <Typography variant="body1" sx={{ color: 'green', fontFamily: 'poppins' }}>
                                                        -${(selectedCards.reduce((total, cardIndex) => total + initialUnitOptions[cardIndex].price * (quantities[cardIndex] || 1), 0) * (discount / 100)).toFixed(2)}
                                                    </Typography>
                                                </Box>
                                            )}

                                            {/* Display Final Total */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', borderTop: '1px solid #D3D3D3', paddingTop: '8px' }}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'poppins' }}>Total</Typography>
                                                <Typography variant="h6">
                                                    ${(
                                                        selectedCards.reduce((total, cardIndex) => total + initialUnitOptions[cardIndex].price * (quantities[cardIndex] || 1), 0) -
                                                        (selectedCards.reduce((total, cardIndex) => total + initialUnitOptions[cardIndex].price * (quantities[cardIndex] || 1), 0) * (discount / 100))
                                                    ).toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </>
                                    ) : (
                                        <Typography sx={{ fontFamily: 'poppins' }}>No units selected.</Typography>
                                    )}
                                </Box>


                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderRadius: '20px',
                                            color: '#006A4E',
                                            fontWeight: 'bold',
                                            backgroundColor: '#FFFFFF',
                                            borderColor: '#006A4E',
                                            width: '30%',
                                            fontFamily: 'poppins'

                                        }}
                                        onClick={handleBackClick}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            borderRadius: '20px',
                                            color: '#FFFFFF',
                                            fontWeight: 'bold',
                                            backgroundColor: '#006A4E',
                                            fontFamily: 'poppins'

                                        }}
                                        onClick={handleProceedToPayment}
                                        disabled={isProceedDisabled}
                                    >
                                        Proceed to Payment
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </>

                );
            case 2:
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderBreadcrumbs()}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                            <Box sx={{ width: '40%', marginRight: 2 }}>
                                <Lottie animationData={lottieAnimationData} loop style={{ width: '100%', height: 'auto' }} />
                            </Box>
                            <Box sx={{ width: '60%' }}>
                                <Typography variant="h6" sx={{ fontFamily: 'poppins', fontSize: '16px', marginBottom: 2 }}>Enter Payment Details</Typography>


                                <Box sx={{ marginBottom: 2 }}>
                                    <Typography variant="h6" sx={{ fontFamily: 'poppins', fontSize: '16px' }}>Card Number</Typography>
                                    <CardNumberElement

                                        options={{
                                            style: {
                                                base: {



                                                    height: '50px', // Adjust this value as needed
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                        fontFamily: 'poppins'
                                                    },
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ marginBottom: 2 }}>
                                    <Typography variant="h6" sx={{ fontFamily: 'poppins', fontSize: '16px' }}>Expiry Date</Typography>
                                    <CardExpiryElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    fontFamily: 'poppins',
                                                    color: '#424770',
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                    },
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ marginBottom: 2 }}>
                                    <Typography variant="h6" sx={{ fontFamily: 'poppins', fontSize: '16px' }}>CVC</Typography>
                                    <CardCvcElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    fontFamily: 'poppins',
                                                    color: '#424770',
                                                    '::placeholder': {
                                                        color: '#aab7c4',

                                                    },
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                            },
                                        }}
                                    />
                                </Box>


                                {/* Display Payment Message */}
                                {paymentMessage && (
                                    <Typography color="green" sx={{ marginBottom: 2 }}>
                                        {paymentMessage}
                                    </Typography>
                                )}
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderRadius: '20px',
                                            color: '#006A4E',
                                            fontWeight: 'bold',
                                            backgroundColor: '#FFFFFF',
                                            borderColor: '#006A4E',
                                            width: '30%',
                                            fontFamily: 'poppins'

                                        }}
                                        onClick={handleBackClick}
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            borderRadius: '20px',
                                            color: '#FFFFFF',
                                            fontWeight: 'bold',
                                            backgroundColor: '#006A4E',
                                        }}
                                        onClick={handlePaymentSubmission}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={20} sx={{ color: '#717171' }} /> : 'Submit'}
                                    </Button>

                                </Box>

                            </Box>
                        </Box>
                    </Box>
                );






        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            {/* Conditionally render based on payment success or error */}
            {isPaymentSuccessful ? (
                renderSuccessBox()
            ) : isPaymentError ? (
                renderErrorBox()
            ) : (
                renderContent()  // Original form content
            )}
        </Box>
    );

}









