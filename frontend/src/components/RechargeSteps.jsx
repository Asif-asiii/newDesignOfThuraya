import React from 'react';
import StepItem from './StepItem1';

const steps = [
  {
    number: '01',
    content: (
      <div>
        <span className="font-bold text-neutral-700">Enter</span>{' '}
        your Thuraya Prepay subscription number, your subscription status is first verified!
      </div>
    ),
  },
  {
    number: '02',
    content: (
      <div>
        <span className="font-bold text-neutral-700">Select</span>{' '}
        the recharge amount from 10, 20, 39, 50, 80 or other available denominations
      </div>
    ),
  },
  {
    number: '03',
    content: (
      <div>
        <span className="font-bold text-neutral-700">Proceed</span>{' '}
        and complete payment via multiple payment methods
      </div>
    ),
  },
];

function HowRechargeWorks() {
  return (
    <section className="flex flex-col md:flex-row gap-10 items-center p-4 md:p-10 lg:p-20 lg:ml-[-50px]" id="how-it-works">
      <div className="flex flex-col md:w-2/3 lg:w-3/4 order-2 md:order-1 max-w-md mx-auto">
        <header className="flex flex-col font-bold mb-6">
          <div className="text-base tracking-tighter leading-none text-teal-800 border border-teal-800 rounded-full px-4 py-2 w-max">
            Simple steps
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl tracking-tighter leading-tight text-zinc-900">
            How recharge works
          </h2>
        </header>
        <div className="flex flex-col space-y-6">
          {steps.map((step, index) => (
            <StepItem
              key={index}
              number={step.number}
              content={step.content}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 order-1 md:order-2 flex justify-center" >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/eed459abd0fdc0be64f6f8daac8acc245ea12d2d3d2649a787902f07fe103b60?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5"
          alt="Illustration of recharge process"
          className="w-full h-auto rounded-lg object-contain lg:ml-[-180px]"
        />
      </div>
    </section>
  );
}

export default HowRechargeWorks;
