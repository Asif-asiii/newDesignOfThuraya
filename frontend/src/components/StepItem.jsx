import React from 'react';

function StepItem({ number, description, isLast }) {
  return (
    <div className={`flex gap-5 items-center pb-6 ${!isLast ? 'border-b border-gray-200' : ''} ${number !== '01' ? 'mt-5' : ''} w-full`}>
      <div className="flex overflow-hidden flex-col self-stretch my-auto font-bold leading-none text-teal-800 whitespace-nowrap border border-indigo-200 border-solid rounded-[78px] w-[39px]">
        <div className="px-3 py-3.5 rounded-full border-2 border-white border-solid">
          {number}
        </div>
      </div>
      <div className="self-stretch my-auto leading-5 text-neutral-700 w-[415px]">
        {description}
      </div>
    </div>
  );
}

export default StepItem;