import React, { useState } from 'react';

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqItems = [
    { question: "Lorem ipsum dolor sit amet" },
    { question: "Lorem ipsum dolor sit amet" },
    { question: "Lorem ipsum dolor sit amet" },
    { question: "Lorem ipsum dolor sit amet" },
    { question: "Lorem ipsum dolor sit amet" }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-32 text-center">
      <span className="inline-block text-sm text-green-700 border border-green-700 rounded-full px-4 py-1 mb-5 font-bold">
        Got questions?
      </span>
      <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-20">
        We have your answers
      </h2>
      <ul className="max-w-2xl mx-auto list-none p-0">
        {faqItems.map((item, index) => (
          <li key={index} className="border-b border-gray-300 pb-6 mb-8">
            <button
              className="flex justify-between items-center w-full text-left bg-transparent border-none cursor-pointer text-base font-medium text-gray-700"
              onClick={() => toggleQuestion(index)}
              aria-expanded={openQuestion === index}
            >
              {item.question}
              <img
                src={openQuestion === index ? "https://cdn.builder.io/api/v1/image/assets/TEMP/98d7f976b90b84196b157264e38c9c6c390144a4546079f359203a4f205869e6?placeholderIfAbsent=true&apiKey=f491141c1f2b4aeabdf65c1b08b75432" : "https://cdn.builder.io/api/v1/image/assets/TEMP/447b8c47a04258b489933c013803811d47b00b7271eedbbbe469caf4fc8257c5?placeholderIfAbsent=true&apiKey=f491141c1f2b4aeabdf65c1b08b75432"}
                alt=""
                className={`w-4 h-4 transition-transform duration-300 ease-in-out ${openQuestion === index ? 'rotate-180' : ''}`}
              />
            </button>
            {openQuestion === index && (
              <div className="pt-4 text-left text-sm text-gray-600">
                <p>Answer to the question goes here.</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FAQ;
