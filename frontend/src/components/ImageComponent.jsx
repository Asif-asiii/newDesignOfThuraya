import React from 'react';

function ImageComponent() {
  return (
    <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f894725b48e93feb5a0ed48cc7783c19eb1e34d78654e44038cae3ffbdb2e26?placeholderIfAbsent=true&apiKey=9ccd02def6994ae69483e6b250d976b5" 
        alt="Descriptive content for the image"
        className="object-contain grow w-full aspect-[1.73]" 
      />
    </div>
  );
}

export default ImageComponent;