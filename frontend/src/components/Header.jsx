import React from 'react';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center w-full text-base max-w-[1039px] max-md:max-w-full">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fc03f28eb98d130cd35de37023707505ef783eb00a4c7281ffb3becd62b2973?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5" alt="Company logo" className="object-contain shrink-0 self-stretch my-auto bg-blend-darken aspect-[3.38] w-[115px]" />
      <nav className="flex flex-wrap gap-6 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
        <ul className="flex gap-4 items-center self-stretch my-auto text-neutral-700">
          <li className="self-stretch my-auto"><a href="#about">About</a></li>
          <li className="self-stretch my-auto"><a href="#how-it-works">How it works</a></li>
          <li className="self-stretch my-auto"><a href="#support">Support</a></li>
        </ul>
        <div className="flex gap-4 items-center self-stretch my-auto tracking-tighter whitespace-nowrap min-w-[240px]">
          <div className="flex gap-2 items-center self-stretch my-auto font-semibold w-[197px]">
            <button className="overflow-hidden flex-1 shrink gap-2.5 self-stretch px-5 py-2.5 my-auto text-sky-900 border border-teal-800 border-solid bg-yellow-500 bg-opacity-0 rounded-[100px]">
              Login
            </button>
            <button className="overflow-hidden flex-1 shrink gap-2.5 self-stretch px-5 py-2.5 my-auto text-white bg-teal-800 rounded-[100px]">
              Signup
            </button>
          </div>
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
};

export default Header;