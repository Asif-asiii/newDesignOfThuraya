import React from 'react';
import ImageComponent from './ImageComponent';

function SomethingHere() {
  return (
    <section className="overflow-hidden rounded-2xl max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col">
        <header className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
          <h1 className="z-10 self-stretch my-auto text-6xl font-bold tracking-tighter leading-none text-zinc-900 max-md:mt-10 max-md:mr-0 max-md:text-4xl">
            Something here
          </h1>
        </header>
        <ImageComponent />
      </div>
    </section>
  );
}

export default SomethingHere;