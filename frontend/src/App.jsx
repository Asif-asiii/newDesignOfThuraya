import React, { useRef } from 'react';
import Navbar from './components/1.Navbar/Navbar';
import HeroSection from './components/HeroSection';
import HowStepsWorks from './components/HowStepsWorks';
import RefillSection from './components/RefillSection';
import Footer from './components/Footer';
import './App.css';
import HowPurchaseWorks from './components/HowPurchaseWorks';
import Cards from './components/Cards';
import RechargeSteps from './components/RechargeSteps';
import FAQ from './components/FaqSection';
import ThureyaRefills from './components/ThurayaRefills';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout2 from './components/MainLayout2';

function App() {
  const rechargeRef = useRef(null);
  const faqRef = useRef(null); // Create a ref for the FAQ section

  const scrollToRecharge = () => {
    if (rechargeRef.current) {
      rechargeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFAQ = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <Router>
      <div className="App">
        <Navbar onScrollToRecharge={scrollToRecharge} onScrollToFAQ={scrollToFAQ} /> {/* Pass the function as a prop */}
        <Routes>
          <Route path='/' element={<Home rechargeRef={rechargeRef} faqRef={faqRef} />} /> {/* Pass the ref to Home */}
          <Route path='/main-layout' element={<MainLayout />} />
          <Route path='/aboutus' element={<MainLayout2 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
