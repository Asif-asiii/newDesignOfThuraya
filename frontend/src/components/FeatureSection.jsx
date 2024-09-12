import React from 'react';
import MyComponent from './MyComponent';

const features = [
  {
    title: "Quick refill",
    description: "Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla.",
  },
  {
    title: "Buy codes",
    description: "Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla.",
  },
  {
    title: "Load thuraya with pin",
    description: "Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla.",
  },
  {
    title: "Sms to thuraya",
    description: "Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla.",
  },
];

const FeatureSection = () => {
  return (
    <section className="mt-16 max-w-full p-5">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col w-full md:w-2/5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccef1e9520afedea5b28eebf6598ad76c68f87fda74dd01f1f81b9b74f96b033?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5"
            alt="Feature illustration"
            className="object-contain w-full rounded-3xl aspect-[0.82] mb-4"
          />
        </div>
        <div className="flex flex-col w-full md:w-3/5">
          {features.map((feature, index) => (
            <div key={index} className="mb-5">
              <h2 className="font-bold leading-none text-zinc-900">{feature.title}</h2>
              <p className="mt-2 leading-5 text-neutral-700">{feature.description}</p>
            </div>
          ))}
          <MyComponent />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
