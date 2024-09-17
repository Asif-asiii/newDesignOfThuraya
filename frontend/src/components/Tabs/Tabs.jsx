import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom'; // Import useLocation
import QuickRefill from '../Tabs/QuickRefill'; // Import QuickRefill component
import BuyCodes from '../Tabs/BuyCodes'; // Import BuyCodes component
import Pin from '../Tabs/Pin'; // Import Pin component
import SendMessage from '../Tabs/Sendmessage'; // Import SendMessage component
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SomethinghereBanner from '../../components/SomethingHereBanner'; // Import banner component

const p_k = "pk_test_51NkMNQK8vdtk62K280GEg0iVA13dhge5TXsEKEWulUgp3IbmSTo8en7CIYQg702DMt1pe8ca6U7Y5pHMUVG05BSE00L7I4hxpr";
const stripe_promise = loadStripe(p_k); // Load Stripe promise

// Styled Tabs component
const CustomTabs = styled(Tabs)(({ theme }) => ({
  '.MuiTabs-indicator': {
    display: 'none', // Remove default indicator
  },
}));

const CustomTab = styled(Tab)(({ theme, selected }) => ({
  color: '#1A1A1A',
  fontWeight: selected ? 'bold' : 'normal',
  position: 'relative',
  '&:not(.Mui-selected)': {
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '2px',
      backgroundColor: '#D3D3D3', // Gray underline
    },
  },
  '&.Mui-selected': {
    color: '#1A1A1A',
    fontWeight: 'bold',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '2px',
      backgroundColor: '#006A4E', // Bottle Green underline for selected tab
    },
  },
}));

export default function TabsComponent() {
  const location = useLocation(); // Get location state
  const [tabValue, setTabValue] = useState('one');

  // Effect to update tab based on passed state
  useEffect(() => {
    if (location.state && location.state.selectedTab) {
      setTabValue(location.state.selectedTab);
    }
  }, [location.state]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderContent = () => {
    switch (tabValue) {
      case 'two':
        return (
          <Elements stripe={stripe_promise}>
            <BuyCodes />
          </Elements>
        );
      case 'one':
        return (
          <Elements stripe={stripe_promise}>
            <QuickRefill />
          </Elements>
        );
      case 'three':
        return <Pin />;
      case 'four':
        return <SendMessage />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ background: '#F9F9F9', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%' }} >
      <SomethinghereBanner />
      <Box sx={{ width: '100%', maxWidth: '960px', marginBottom: 2 }} >
        <CustomTabs variant="fullWidth" value={tabValue} onChange={handleTabChange} centered>
          <CustomTab sx={{ fontFamily: 'poppins', fontSize: '16px' }} value="one" label="Quick Refill" />
          <CustomTab sx={{ fontFamily: 'poppins', fontSize: '16px' }} value="two" label="Buy Codes" />
          <CustomTab sx={{ fontFamily: 'poppins', fontSize: '16px' }} value="three" label="Load Thuraya with Pin" />
          <CustomTab sx={{ fontFamily: 'poppins', fontSize: '16px' }} value="four" label="SMS to Thuraya" />
        </CustomTabs>
      </Box>
      <Box sx={{ padding: '20px', width: '100%', maxWidth: '960px' }}>
        {renderContent()}
      </Box>
    </Box>
  );
}
