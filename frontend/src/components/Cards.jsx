import React from "react";
import image from "../assets/card1.png";
import image2 from "../assets/data.png"; // First image (data)
import image3 from "../assets/mobile1.png"; // Second image (mobile)

const Cards = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-4" id="cards">
        
        {/* Card 1 */}
        <div className="relative flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-md w-full md:max-w-lg p-6 bg-white overflow-hidden" id="card1" style={{height:"250px"}}>
          {/* Container for the images */}
          <div className="relative bg-gradient-to-r from-[#F4F8FF] to-[#E4EFFF] hover:bg-custom-light-green w-full md:w-1/2 p-6 rounded-lg overflow-hidden transition duration-300">
            <div className="relative flex justify-center items-center w-full h-full">
              {/* First Image (Data image) */}
              <img
                src={image2}
                alt="data image"
                className="w-24 h-24 "
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
              {/* Second Image (Mobile image) */}
              <img
                src={image3}
                alt="mobile image"
                className="w-28 h-auto "
                style={{
                  position: "absolute",
                  bottom: "-60px",
                  left: "-30px",
                  transform: "rotate(-20deg)",
                }}
              />
            </div>
          </div>

          {/* Text content on the right */}
          <div className="flex flex-col justify-between w-full md:w-1/2 pl-6 mt-4 md:mt-0">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Quick Refill</h2>
            <p className="text-sm md:text-base text-gray-600 my-2">
              Top up your Thuraya number with ease and convenience.
            </p>
            <button className="text-green-700 hover:text-green-900 font-bold flex items-center gap-2 mt-4 text-sm md:text-base">
              Start Now <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-md w-full md:max-w-lg p-6 bg-white" id="card2" style={{height:"250px"}}>
          {/* Image Section */}
          <div className="flex justify-center items-center w-full md:w-1/2 bg-gradient-to-r from-[#F4F8FF] to-[#E4EFFF] hover:bg-custom-light-green p-6 rounded-lg transition duration-300">
            <img src={image} alt="Buy Codes image" className="w-32 h-auto" />
          </div>

          {/* Text content on the right */}
          <div className="flex flex-col justify-between w-full md:w-1/2 pl-6 mt-4 md:mt-0">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Buy Codes</h2>
            <p className="text-sm md:text-base text-gray-600 my-2">
              Top up your Thuraya number with ease and convenience.
            </p>
            <button className="text-green-700 hover:text-green-900 font-bold flex items-center gap-2 mt-4 text-sm md:text-base">
              Start Now <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
