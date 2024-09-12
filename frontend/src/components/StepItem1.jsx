import React from 'react';

const StepItem = ({ number, content, isLast }) => {
  return (
    <div className={`flex items-start ${isLast ? 'pb-0' : 'pb-4'}`}>
      {/* Circle with gradient background */}
      <div className="bg-gradient-to-r from-[#E1ECFF] to-[#FFFFFF] rounded-full flex items-center justify-center mr-4 border border-transparent">
        <p
          className="text-center text-[#226B51] w-12 h-12 flex items-center justify-center rounded-full shadow-inner"
          style={{ boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 1)" }}
        >
          {number}
        </p>
      </div>

      <div
        className="flex items-center"
        style={{ boxShadow: "0 4px 6px -6px rgba(0, 0, 0, 0.1)" }}
      >
        <p
          className="text-[#444444] p-2 rounded-md shadow-inner"
          style={{ boxShadow: "inset 0 0 0 1px #FFFFFF", width: "300px" }}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default StepItem;
