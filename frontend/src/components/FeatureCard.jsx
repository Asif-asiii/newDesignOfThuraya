import React from "react";
import "./FeatureCard.css";

function FeatureCard({ icon, title, description }) {
  return (
    <article
      className="flex overflow-hidden flex-col flex-1 shrink self-stretch px-9 py-12 my-auto basis-0 min-w-[240px] max-md:px-5 bg-gradient-to-r from-[#F4F8FF] to-[#E4EFFF] hover:bg-[#D6FFF3] transition-colors duration-300"
      style={{ height: "300px" }}
      id="featureCard"
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain aspect-square w-[65px]"
      />
      <div className="flex flex-col mt-16 w-full max-md:mt-10">
        <h2 className="font-bold leading-none text-zinc-900">{title}</h2>
        <p className="mt-6 leading-5 text-neutral-700">{description}</p>
      </div>
    </article>
  );
}

export default FeatureCard;
