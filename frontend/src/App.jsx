import React, { useRef, useState } from 'react';
import Navbar from './components/1.Navbar/Navbar';
import Footer from './components/Footer';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout2 from './components/MainLayout2';
import Signup from './components/Signup';
import Login from "./components/Login";
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
          <Route path='/aboutus' element={<MainLayout2 />} />
          <Route path='/login' element={<Login />} /> 
          <Route path='/signup' element={<Signup/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
