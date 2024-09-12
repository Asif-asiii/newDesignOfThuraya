import React from "react";
import WhyChooseUs from "./WhyChooseUs";
import MainHeading from "./MainHeading";

const ThurayaMainHeading = () => {
  return (
    <section className="flex overflow-hidden flex-col items-center font-bold max-w-[860px]">
      <WhyChooseUs text="Why choose us" className="whyChooseUs"/>
      <MainHeading text="Instant and secure Thuraya Refills" />
    </section>
  );
};

export default ThurayaMainHeading;