import React from "react";
import { Player } from "@lottiefiles/react-lottie-player"; // Import the Lottie player
import lottieAnimation from "../assets/2.json"; // Your Lottie animation JSON
import lock from "../assets/lock.png";

const HowPurchaseWorks = () => {
  return (
    <div className="p-4 md:p-10 lg:p-20">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20" id="purchase">
        {/* Lottie animation on the left side */}
        <div className="w-full md:w-1/3 lg:w-1/4 order-1 md:order-1 rounded-lg overflow-hidden ">
          <Player
            autoplay
            loop
            src={lottieAnimation}
            speed={0.5} // Slow down the animation speed
            style={{ width: '100%', height: 'auto' }} // Responsive styling
          />
        </div>

        {/* Purchase working content */}
        <div className="flex flex-col w-full md:w-2/3 lg:w-3/4 order-2 md:order-2">
          <h1 className="text-[#1A1A1A] text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
            How Purchase Codes works?
          </h1>
          <h4 className='mt-2 text-[#115E59] font-bold'>More Flexibility, More Control!</h4>

          {/* Steps */}
          {["Select", "Enter", "Secure Delivery"].map((step, index) => (
            <div className="flex items-start pt-3 pb-3" key={index}>
              {/* Circle with gradient background */}
              <div className="bg-gradient-to-r from-[#E1ECFF] to-[#FFFFFF] rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-4 border border-transparent">
                <p
                  className="text-center text-[#226B51] w-full h-full flex items-center justify-center rounded-full shadow-inner"
                  style={{ boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 1)" }}
                >
                  {index + 1}
                </p>
              </div>

              <div className="shadow-sm p-2 rounded-md" style={{ width: "100%" }}>
                <p className="text-[#444444]">
                  <b>{step}</b>{" "}
                  {step === "Select"
                    ? "the denomination and quantity of recharge codes you wish to purchase"
                    : step === "Enter"
                    ? "your email and proceed with payment"
                    : <div className="flex items-start mt-3 bg-[#F5F5F5] p-3 rounded-md shadow-sm">
                      <img src={lock} alt="lock image" className="w-6 h-6 mr-3" />
                      <p className="text-[#1A1A1A] text-sm md:text-base">
                        Your Thuraya recharge codes will be securely emailed to you along
                        with instructions.
                      </p>
                    </div>}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowPurchaseWorks;
