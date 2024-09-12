import React from 'react';

const TabNavigation = () => {
  const tabs = [
    { id: 'quick-refill', label: 'Quick Refill', active: true },
    { id: 'buy-codes', label: 'Buy Codes', active: false },
    { id: 'load-thuraya', label: 'Load Thuraya with Pin', active: false },
    { id: 'sms-thuraya', label: 'Sms to Thuraya', active: false },
  ];

  return (
    <nav className="flex flex-wrap items-center mt-8 w-full text-base tracking-tighter leading-none max-w-[1040px] text-zinc-900 max-md:max-w-full">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          className={`flex-1 shrink gap-2.5 self-stretch px-2.5 pb-4 my-auto ${
            tab.active ? 'font-bold border-b-2 border-teal-800' : 'border-b-2 border-zinc-300'
          } min-w-[240px]`}
        >
          {tab.label}
        </a>
      ))}
    </nav>
  );
};

export default TabNavigation;