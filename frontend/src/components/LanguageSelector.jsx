import React from 'react';

const LanguageSelector = () => {
  return (
    <div className="flex gap-1.5 items-center self-stretch my-auto font-light text-sky-900">
      <span className="self-stretch my-auto">English</span>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca68ed2fdf6710f83248c0ad79959f83cb3d0342b45a879e1abd9c36625c424e?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5" alt="Language dropdown icon" className="object-contain shrink-0 self-stretch my-auto aspect-[1.38] w-[11px]" />
    </div>
  );
};

export default LanguageSelector;