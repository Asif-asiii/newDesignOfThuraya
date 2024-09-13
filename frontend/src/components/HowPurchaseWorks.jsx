import React from "react";
import image from "../assets/purchase.png";
import Button from "@mui/material/Button";
import lock from "../assets/lock.png";

const HowPurchaseWorks = () => {
  return (
    <div className="p-4 md:p-10 lg:p-20">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20" id="purchase">
        {/* Image on the left side */}
        <div className="w-full md:w-1/3 lg:w-1/4 order-1 md:order-1 rounded-lg overflow-hidden">
          <img
            src={image}
            alt="purchase image"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Purchase working content */}
        <div className="flex flex-col w-full md:w-2/3 lg:w-3/4 order-2 md:order-2">
          <Button
            variant="outlined"
            style={{
              borderRadius: "40px",
              padding: "5px 10px",
              width: "150px",
              height: "40px",
              fontWeight: "bold",
              borderColor: "#226B51",
              textTransform: "inherit",
              color: "#226B51",
              marginBottom: "20px",
            }}
          >
            Simple steps
          </Button>

          <h1 className="text-[#1A1A1A] text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
            How purchasing works
          </h1>

          {/* Steps */}
          {["Select", "Enter", "Proceed"].map((step, index) => (
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
                    ? "your email and signup information"
                    : "and complete payment via multiple payment methods"}
                </p>
              </div>
            </div>
          ))}

          {/* Final instructions with lock icon */}
          <div className="flex items-center mt-6 bg-[#F5F5F5] p-3 rounded-md shadow-sm">
            <img src={lock} alt="lock image" className="w-6 h-6 mr-3" />
            <p className="text-[#1A1A1A] text-sm md:text-base">
              Your Thuraya recharge codes will be securely emailed to you along
              with instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowPurchaseWorks;
