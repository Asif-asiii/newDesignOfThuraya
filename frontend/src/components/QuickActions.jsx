import React, { useEffect, useState } from 'react';
import QuickActionItem from './QuickActionItem';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const quickActionItems = [
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4d5ee66d5e76f364576bd9a918c2b91e2e28e64dc55eb5ff38af2aee0096e13?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5", altText: "Quick Refill Icon", title: "Quick Recharge", tab: 'one' },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b6f509cdf517bb6337ba19dc7b0c08476034fd534517b05688d42a15d309155?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5", altText: "Buy Codes Icon", title: "Buy Thuraya Codes", tab: 'two' },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e1f31c4a0a91f3076b88b24bddab0231f728ddeb79ec855a79326bf6b0b2bc85?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5", altText: "Load Thuraya with Pin Icon", title: "Refill Thuraya Codes", tab: 'three' },
  { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ffdd732323b421a7693a0b0354f808ee61c86a8de2a17c1e9785f648548061fb?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5", altText: "SMS to Thuraya Icon", title: "SMS to Thuraya", tab: 'four' }
];

function QuickActions() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quickActionItems.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const handleQuickActionClick = (tab) => {
    navigate('/tabs', { state: { selectedTab: tab } }); // Navigate to TabsComponent with selected tab
  };

  return (
    <section className="flex flex-wrap justify-between items-center text-base font-bold tracking-tighter leading-none text-teal-800 max-w-[976px] mx-auto">
      {isMobile ? (
        <div className="relative w-full overflow-hidden">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / 2)}%)` }}>
            {quickActionItems.map((item, index) => (
              <div key={index} onClick={() => handleQuickActionClick(item.tab)} className="w-1/2 flex-shrink-0 transition-transform transform hover:scale-105"> {/* Add hover scale effect */}
                <QuickActionItem
                  imageSrc={item.imageSrc}
                  altText={item.altText}
                  title={item.title}
                />
              </div>
            ))}
          </div>
          {/* Navigation Dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {quickActionItems.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-teal-800' : 'bg-gray-300'}`}
                style={{ transition: 'background-color 0.3s ease-in-out' }}
              />
            ))}
          </div>
        </div>
      ) : (
        quickActionItems.map((item, index) => (
          <div key={index} onClick={() => handleQuickActionClick(item.tab)} className="transition-transform transform hover:scale-105"> {/* Add hover scale effect */}
            <QuickActionItem
              imageSrc={item.imageSrc}
              altText={item.altText}
              title={item.title}
            />
          </div>
        ))
      )}
    </section>
  );
}

export default QuickActions;
