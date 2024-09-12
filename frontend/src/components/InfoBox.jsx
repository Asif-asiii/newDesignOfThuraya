import React from 'react';

function InfoBox() {
  return (
    <div className="flex flex-wrap gap-3 items-center px-6 py-2.5 mt-12 text-base tracking-tighter leading-5 rounded-lg bg-neutral-100 min-h-[52px] shadow-[6px_122px_35px_rgba(158,158,158,0)] text-neutral-700 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/87300499cb53e82ea33ac1cdc10330b6b82ad48f5893042c6112efd2bd137833?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5"
        alt=""
        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[26px]"
      />
      <p className="self-stretch my-auto w-[423px] max-md:max-w-full">
        Your thuraya recharge codes will be securely emailed to you along with instructions
      </p>
    </div>
  );
}

export default InfoBox;