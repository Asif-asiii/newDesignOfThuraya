import React from 'react';
import Header from './Header';
import Hero from './Hero';
import TabNavigation from './TabNavigation';
import QuickRefillForm from './QuickRefillForm';
import Footer from './Footer';
import SomethingHere from './SomethingHere';

const MainLayout = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center pt-7 bg-stone-50">
      
      <main>
        <SomethingHere />
        <TabNavigation />
        <QuickRefillForm />
      </main>
     
    </div>
  );
};

export default MainLayout;