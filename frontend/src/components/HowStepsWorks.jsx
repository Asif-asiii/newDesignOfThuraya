import React, { useRef } from "react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b5c215162a4bb3d51b76581e81a42a4ac4161d573a769442dc60c9d4f40df275?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Instant online refill",
    description: "Lorem ipsum dolor sit amet consectetur. amet diam",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5991a12536bc9560ba73a48613219af8a38ad2b05d2b31f30e06983260e86e18?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Instant Online Refill",
    description: "Lorem ipsum dolor sit amet consectetur. amet diam",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d168cbb4a856727ec931bab5733eaab11503d1a04d796f4f4f1f0aa03bd870ad?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Secure payment",
    description: "Lorem ipsum dolor sit amet consectetur. amet diam",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/65fdb5e4ce4fdde0690ddbd7e216c9fbc2c6788c660bec9613863c0a0a5d0af1?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Worldwide Access",
    description: "Lorem ipsum dolor sit amet consectetur. amet diam",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/55ffa56786471187ee8550522eeca362d7cd1a5057984adc1283d706ad67a972?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Worldwide Access",
    description: "Lorem ipsum dolor sit amet consectetur. amet diam",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b15a81791452172a7ef7ca8d11a56eb750b01b0c00d4f93ee256a793250d992?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Instant Online Refill",
    description: "Lorem ipsum dolor sit amet consectetur. amet diam",
  },
];

function HowStepsWorks() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // Scroll left by 300px
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // Scroll right by 300px
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="flex flex-col px-72 py-32 bg-white max-md:px-5 max-md:py-24">
      <header className="flex overflow-hidden flex-col items-center w-full font-bold max-md:max-w-full">
        <div className="gap-3 self-stretch px-3 py-2 text-base tracking-tighter leading-none text-teal-800 border border-teal-800 border-solid rounded-[68px]">
          Why choose us
        </div>
        <h1 className="mt-5 text-5xl tracking-tighter text-center leading-[52px] text-zinc-900 w-[550px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
          Instant and secure Thuraya Refills
        </h1>
      </header>

      <section className="flex flex-col mt-20 w-full text-base tracking-tighter max-md:mt-10 max-md:max-w-full">
        {/* Grid for large screens */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 w-full">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Carousel for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={scrollLeft} className="p-2 bg-gray-200 rounded-full">
            ◀️
          </button>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-5 scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="min-w-[45%] flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
          <button onClick={scrollRight} className="p-2 bg-gray-200 rounded-full">
            ▶️
          </button>
        </div>
      </section>
    </main>
  );
}

export default HowStepsWorks;
