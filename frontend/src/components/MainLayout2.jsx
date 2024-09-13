import React from 'react';
import AboutSelection from './AboutSelection';
import FeatureSection from './FeatureSection';

const MainLayout2 = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center pt-7 bg-stone-50">
      <main>
        <AboutSelection />
        <FeatureSection />
      </main>
    </div>
  );
};

export default MainLayout2;
