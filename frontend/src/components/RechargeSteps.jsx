import React from 'react';
import StepItem from './StepItem1';
import { Player } from '@lottiefiles/react-lottie-player'; // Import the Lottie player
import lottieAnimation from "../assets/1.json"; // Your Lottie animation JSON
import "./RechargeSteps.css"
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
          <h2 className="mt-4 text-4xl md:text-5xl tracking-tighter leading-tight text-zinc-900">
            How Thuraya Quick Recharge works?
          </h2>
          <h4 className='mt-2 text-[#115E59]'>Tap, Pay, Go - It's that easy!</h4>
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
        <p className='mt-2 text-[#115E59]'>You are set! Your Thuraya number will be instantly recharged!</p>
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 order-1 md:order-2 flex justify-center cursor-pointer animation-wrapper">
        <Player
          autoplay
          loop
          src={lottieAnimation}
          speed={0.5}  // Adjusting the speed to slow down the animation
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </section>
  );
}

export default HowRechargeWorks;
