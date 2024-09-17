import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/HeroSectionVisual.json"; // Assuming your JSON animation is here
import "./HeroSection.css";

const SlowLottieAnimation = ({ speed }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      // Start the animation
      lottieRef.current.play();
      // Set a timeout to control the speed
      const interval = setInterval(() => {
        lottieRef.current.goToAndStop(lottieRef.current.getCurrentFrame() + 1, true);
      }, 1000 * speed); // Adjust the interval based on the speed
      return () => clearInterval(interval);
    }
  }, [speed]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 0,
      }}
    />
  );
};

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center bg-gradient-to-r from-cyan-100 to-teal-100 overflow-hidden lg:h-[425px]"
      id="heroSection"
    >
      {/* Right Section - Animation */}
      <div className="absolute top-0 right-0 w-full h-full" id="animationFile">
        <SlowLottieAnimation speed={4} /> {/* Adjust speed value for playback */}
      </div>

      {/* Left Section - Text */}
      <div
        className="relative z-10 w-full md:w-1/2 flex flex-col items-start justify-center p-4 md:p-8"
        style={{ width: "500px", marginLeft: "110px" }}
        id="textHero"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Thuraya quick <br /> recharge
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
