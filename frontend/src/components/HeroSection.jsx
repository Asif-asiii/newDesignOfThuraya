import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/HeroSectionVisual.json"; // Assuming your JSON animation is here
import "./HeroSection.css";
import Button from "@mui/material/Button";

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center bg-gradient-to-r from-cyan-100 to-teal-100 overflow-hidden"
      id="heroSection"
      style={{ height: "425px" }}
    >
      {/* Right Section - Animation */}
      <div className="absolute top-0 right-0 w-full h-full" id="animationFile">
        <Lottie
          animationData={animationData}
          autoplay
          loop
          speed={0.5} // This reduces the speed of the animation (0.5 is half speed)
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 0,
          }} // Set zIndex to 0 for background
        />
      </div>

      {/* Left Section - Text */}
      <div
        className="relative z-10 w-full md:w-1/2 flex flex-col items-start justify-center p-4 md:p-8"
        style={{ width: "500px", marginLeft: "110px" }}
        id="textHero"
      >
        <Button
          variant="outlined"
          style={{
            borderRadius: "40px",
            paddingLeft: "5px",
            paddingRight: "5px",
            height: "30px",
            fontWeight: "bold",
            borderColor: "#226B51",
            textTransform: "inherit",
            color: "#226B51",
            marginBottom: "20px",
          }}
        >
          Top-up on the go
        </Button>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Thuraya quick <br /> recharge
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
