import React, { useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';

import Lottie from 'lottie-react';
import lottieAnimationData from '../../assets/3.json';

import './Tabs.css'
export default function SendMessage() {

    const handleBackClick= ()=>{

    }
    const handlesubmit= ()=>{
        
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <Box sx={{ width: '40%', marginRight: 2 }}>
                    <Lottie
                        animationData={lottieAnimationData}
                        loop
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Box>

                <Box sx={{ width: '60%' }}>

                    <Box sx={{ marginBottom: 1 }}>
                       
                       

                        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                            Enter Thuraya Number
                        </Typography>
                        <TextField
                            placeholder="Enter here"
                            type="number"
                            fullWidth
                            variant="outlined"
                            sx={{ marginBottom: 1 }}
                            InputProps={{
                                sx: { height: 35 } // Adjust height here
                            }}
                        />

                        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                            Enter Message
                        </Typography>
                        <TextField
                            placeholder="Enter here"
                            fullWidth
                            variant="outlined"
                            rows={4} // Adjust the number of rows for the message input box
                            sx={{ marginBottom: 0 }}
                            InputProps={{
                                sx: { height: 'auto', fontSize: '1rem', padding: '12px' } // Adjust height, font size, and padding
                            }}
                        />

                    
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: '8px' }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            onClick={handleBackClick}
                            sx={{
                                borderRadius: '20px',
                                color: '#006A4E',
                                fontWeight: 'bold',
                                backgroundColor: '#FFFFFF',
                                borderColor: '#006A4E',
                                width: '30%'

                            }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlesubmit}
                            sx={{
                                borderRadius: '20px',
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                backgroundColor: '#006A4E',
                                width: '70%',
                            }}
                        >


                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );






}
