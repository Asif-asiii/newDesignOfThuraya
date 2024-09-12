import React from "react";

const MainHeading = ({ text }) => (
  <h1 className="mt-5 text-5xl tracking-tighter text-center leading-[52px] text-zinc-900 w-[550px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
    {text}
  </h1>
);

export default MainHeading;