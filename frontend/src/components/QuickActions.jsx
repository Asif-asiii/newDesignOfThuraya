import React, { useEffect, useState } from 'react';
import QuickActionItem from './QuickActionItem';

const quickActionItems = [
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4d5ee66d5e76f364576bd9a918c2b91e2e28e64dc55eb5ff38af2aee0096e13?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5", altText: "Quick Refill Icon", title: "Quick Refill" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b6f509cdf517bb6337ba19dc7b0c08476034fd534517b05688d42a15d309155?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5", altText: "Buy Codes Icon", title: "Buy Codes" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e1f31c4a0a91f3076b88b24bddab0231f728ddeb79ec855a79326bf6b0b2bc85?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5", altText: "Load Thuraya with Pin Icon", title: "Load thuraya with pin" },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ffdd732323b421a7693a0b0354f808ee61c86a8de2a17c1e9785f648548061fb?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5", altText: "SMS to Thuraya Icon", title: "Sms to thuraya" }
];

function QuickActions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust threshold as needed

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust threshold as needed
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < quickActionItems.length - 2) {
            return prevIndex + 1;
          } else {
            return 0; // Reset to first item
          }
        });
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [isMobile]);

  return (
    <section className="flex flex-wrap justify-between items-center text-base font-bold tracking-tighter leading-none text-teal-800 max-w-[976px] mx-auto">
      {isMobile ? (
        // Carousel for mobile screens
        <div className="relative">
          <div className="flex overflow-hidden">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${(currentIndex / 2) * 100}%)` }}>
              {quickActionItems.map((item, index) => (
                <QuickActionItem
                  key={index}
                  imageSrc={item.imageSrc}
                  altText={item.altText}
                  title={item.title}
                  className="flex-shrink-0 w-1/2 " // Ensure two items are shown
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Static layout for larger screens
        quickActionItems.map((item, index) => (
          <QuickActionItem
            key={index}
            imageSrc={item.imageSrc}
            altText={item.altText}
            title={item.title}
          />
        ))
      )}
    </section>
  );
}

export default QuickActions;
