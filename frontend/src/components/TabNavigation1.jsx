import React from 'react';
import TabItem from './TabItem';

function TabNavigation1() {
  const tabs = [
    { label: 'Quick Refill', isActive: true },
    { label: 'Buy Codes', isActive: false },
    { label: 'Load Thuraya with Pin', isActive: false },
    { label: 'Sms to Thuraya', isActive: false }
  ];

  return (
    <nav className="flex flex-wrap items-center text-base tracking-tighter leading-none text-zinc-900">
      {tabs.map((tab, index) => (
        <TabItem key={index} label={tab.label} isActive={tab.isActive} />
      ))}
    </nav>
  );
}

export default TabNavigation1;