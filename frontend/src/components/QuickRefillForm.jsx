import React from 'react';

const QuickRefillForm = () => {
  return (
    <form className="flex flex-wrap gap-10 items-start mt-8 max-w-full">
      {/* Image with responsive size */}
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/15a5a03605df04a50f4944bb876fa9e5a4fb7de1586fda93d1382812930e77d4?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5" 
        alt="Quick refill illustration" 
        className="object-contain rounded-3xl aspect-[0.82] w-full max-w-[240px] md:max-w-[419px] md:w-[50%]" 
      />
      <div className="flex flex-col w-full md:w-[50%]">
        <div className="flex gap-4 items-center self-start whitespace-nowrap">
          <StepIndicator step={1} label="Something" active={true} />
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b9ac04d850e05f24d2569f48481f11c57f8424b76564a5967b9b3e3a2e0cc27?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-[0.63] w-[5px]" />
          <StepIndicator step={2} label="Something" active={false} />
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c02419f9cd98dae07cb9895d5f1bf593555ff81910983db6e0c185884619c45?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-[0.63] w-[5px]" />
          <StepIndicator step={3} label="Something" active={false} />
        </div>
        <div className="flex flex-col mt-12 w-full text-base leading-none text-zinc-900">
          <div className="flex flex-col w-full">
            <label htmlFor="thurayaNumber" className="tracking-tighter">
              Enter your thuraya number
            </label>
            <div className="flex flex-col mt-6 w-full font-bold whitespace-nowrap">
              <div className="flex flex-wrap gap-3 items-center p-4 w-full rounded-lg border border-solid bg-white bg-opacity-50 border-neutral-200">
                <span className="self-stretch my-auto tracking-tighter">882</span>
                <input
                  type="tel"
                  id="thurayaNumber"
                  placeholder="xxxxxxxxxx"
                  className="self-stretch my-auto bg-transparent border-none outline-none"
                  aria-label="Thuraya number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const StepIndicator = ({ step, label, active }) => {
  return (
    <div className="flex gap-2.5 items-center my-auto">
      <div className={`overflow-hidden gap-1.5 px-2 text-xs tracking-tight leading-none ${active ? 'bg-sky-900 text-stone-50' : 'text-black border border-solid border-sky-900 border-opacity-10'} h-[21px] min-h-[21px] rounded-[53px] w-[21px]`}>
        {step}
      </div>
      <div className={`text-sm tracking-tight ${active ? 'text-zinc-900' : 'text-sky-900 text-opacity-50'}`}>
        {label}
      </div>
    </div>
  );
};

export default QuickRefillForm;
