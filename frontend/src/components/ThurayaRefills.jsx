import React, { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";
import ThurayaMainHeading from "./ThurayaMainHeading";

const features = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b5c215162a4bb3d51b76581e81a42a4ac4161d573a769442dc60c9d4f40df275?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Instant Thuraya Top-up's",
    description: "Top-up in a flash - Faster than you can say recharge!"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5991a12536bc9560ba73a48613219af8a38ad2b05d2b31f30e06983260e86e18?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Worldwide Access",
    description: "Recharge from anywhere, anytime"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d168cbb4a856727ec931bab5733eaab11503d1a04d796f4f4f1f0aa03bd870ad?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Secure payment",
    description: "Your recharge, our fortress- 100% secure, every time"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/65fdb5e4ce4fdde0690ddbd7e216c9fbc2c6788c660bec9613863c0a0a5d0af1?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Best Value",
    description: "We gaurantee best value Thuraya Top-up's"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/55ffa56786471187ee8550522eeca362d7cd1a5057984adc1283d706ad67a972?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "Reliable Service",
    description: "Recharge with confidence, because we're always on!"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b15a81791452172a7ef7ca8d11a56eb750b01b0c00d4f93ee256a793250d992?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5",
    title: "24x7 Support",
    description: "Always at your service!"
  }
];

function ThureyaRefills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust threshold as needed

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust threshold as needed
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          return (prevIndex + 1) % features.length; // Loop through features
        });
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [isMobile]);

  return (
    <main className="flex flex-col px-4 md:px-20 lg:px-72 py-10 md:py-24 bg-white">
      <ThurayaMainHeading />
      <section className="flex flex-col mt-10 w-full text-base tracking-tighter">
        {isMobile ? (
          // Carousel for mobile screens
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${features.length * 100}%`, // Set width based on number of items
              }}
            >
              {features.map((feature, index) => (
                <div
                  className="flex-shrink-0 w-full flex justify-center p-4"
                  key={index}
                >
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Grid layout for larger screens
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ThureyaRefills;
