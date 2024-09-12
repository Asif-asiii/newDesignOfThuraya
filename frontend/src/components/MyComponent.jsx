import React from "react";
import SectionItem from "./SectionItem";

const sectionData = [
  {
    title: "Quick refill",
    description: "Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla.",
    linkText: "Explore now"
  },
  {
    title: "Buy codes",
    description: "Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla.",
    linkText: "Explore now"
  },
  {
    title: "Load thuraya with pin",
    description: "Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla.",
    linkText: "Explore now"
  },
  {
    title: "Sms to thuraya",
    description: "Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla.",
    linkText: "Explore now"
  }
];

function MyComponent() {
  return (
    <main className="flex flex-col w-full max-w-lg mx-auto mt-10">
      <section className="flex flex-col w-full mb-5">
        <h1 className="text-2xl font-bold tracking-tighter leading-3 text-zinc-900">
          Lorem ipsum dolor sit
        </h1>
        <p className="mt-8 text-base tracking-tighter leading-7 text-neutral-700">
          Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla. Et sit vivamus placerat ut platea mattis. Risus non netus diam sem mauris velit purus. Lorem ipsum dolor sit amet consectetur. Cursus ipsum quisque aliquet turpis. Odio hendrerit duis feugiat viverra lacinia varius lacus nulla. Et sit vivamus placerat ut platea mattis. Risus non netus diam sem mauris velit purus.
        </p>
      </section>
      <section className="flex flex-col w-full">
        {sectionData.map((item, index) => (
          <SectionItem
            key={index}
            title={item.title}
            description={item.description}
            linkText={item.linkText}
          />
        ))}
      </section>
    </main>
  );
}

export default MyComponent;
