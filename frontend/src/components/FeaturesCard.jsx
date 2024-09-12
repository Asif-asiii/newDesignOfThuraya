import React from 'react';

const FeaturesCard = ({ title, description }) => {
  return (
    <div className="flex flex-col justify-center py-9 w-full border-b border-stone-200 max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <h3 className="text-xl font-bold tracking-tighter leading-none text-zinc-900 max-md:max-w-full">
          {title}
        </h3>
        <p className="mt-6 text-base tracking-tighter leading-7 text-neutral-700 max-md:max-w-full">
          {description}
        </p>
      </div>
      <div className="flex gap-2 items-center self-start mt-8 text-base tracking-tighter leading-loose text-neutral-800">
        <span className="self-stretch my-auto">Explore now</span>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f92d0d44333fc53544d19eb42e26e1097b8bde0cb965cbc031c5c2bccdd0f5a9?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5" alt="Arrow icon" className="object-contain shrink-0 self-stretch my-auto aspect-[1.29] w-[9px]" />
      </div>
    </div>
  );
};

export default FeaturesCard;