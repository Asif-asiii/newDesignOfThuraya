import React from 'react';

const LoginBanner = () => {
  return (
    <section className="overflow-hidden mt-6 max-w-full rounded-2xl bg-gradient-to-r from-custom-blue to-custom-green p-5">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col w-full md:w-1/2 lg:ml-[500px] " >
          <h1 className="self-stretch my-auto text-5xl font-bold tracking-tighter leading-none text-zinc-900 text-center md:text-left md:text-6xl max-md:text-4xl">
            Login
          </h1>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f8b7e92961d1a8e553df1f14b3e202cb0bea518d2935e5ca80bc9ad0d4bef63?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5"
            alt="About us illustration"
            className="object-contain w-full aspect-[1.73] mt-4"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginBanner;
