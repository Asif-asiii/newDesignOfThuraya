import React from 'react';

const Hero = () => {
  return (
    <section className="overflow-hidden mt-6 max-w-full rounded-2xl w-[1040px] max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
          <h1 className="z-10 self-stretch my-auto text-6xl font-bold tracking-tighter leading-none text-zinc-900 max-md:mt-10 max-md:mr-0 max-md:text-4xl">
            Something here
          </h1>
        </div>
        <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f894725b48e93feb5a0ed48cc7783c19eb1e34d78654e44038cae3ffbdb2e26?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5" alt="Hero illustration" className="object-contain grow w-full aspect-[1.73]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;