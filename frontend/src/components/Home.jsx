import React from 'react';
import HeroSection from './HeroSection';
import Cards from './Cards';
import HowRechargeWorks from './RechargeSteps';
import HowPurchaseWorks from './HowPurchaseWorks';
import ThureyaRefills from './ThurayaRefills';
import FAQ from './FaqSection';
import QuickActions from './QuickActions';

const Home = ({ rechargeRef, faqRef }) => { // Accept rechargeRef as a prop
  return (
    <div>
      <HeroSection />
      <Cards />
      <QuickActions />
      <div ref={rechargeRef}>
        <HowRechargeWorks />
      </div>
      <HowPurchaseWorks />
      <ThureyaRefills />
   
    </div>
  );
};

export default Home;
