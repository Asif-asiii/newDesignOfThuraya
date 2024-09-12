import React from 'react';

function QuickActionItem({ imageSrc, altText, title }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-w-[240px] cursor-pointer">
      <img loading="lazy" src={imageSrc} alt={altText} className="object-contain aspect-square w-[86px]" style={{borderWidth:"1px", borderColor:"whitesmoke", borderRadius:"50%"}}/>
      <h2 className="mt-6 text-base font-bold tracking-tighter  leading-none text-teal-800 hover:underline">{title}</h2>
    </div>
  );
}

export default QuickActionItem;
