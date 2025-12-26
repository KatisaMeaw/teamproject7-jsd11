import React, { useState } from 'react';

const Explore = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 3;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const slides = [
    { id: 1, title: "Inner Peace", desc: "01 — Office Room", img: "/img-prod/explore-1.jpeg" },
    { id: 2, title: "Cozy Rest", desc: "02 — Bedroom Setup", img: "/img-prod/explore-2.jpeg" },
    { id: 3, title: "Social Space", desc: "03 — Living Room", img: "/img-prod/explore-3.jpeg" },
  ];

  return (
    <section className="h-dvh w-screen bg-[#D6EBF3] overflow-hidden">
      <div className="grid grid-cols-5 h-full">
        {/* Left Content */}
        <div className="col-span-2 flex flex-col items-start justify-center px-6 ml-10 lg:ml-20">
          <h1 className="font-bold text-[#447F98] text-6xl mb-6 leading-tight">
            Explore your own <br /> style
          </h1>
          <p className="text-[#60A8C7] font-medium text-lg mb-8">
            We recommended you to try it out <br />
            All stuff you want in one room
          </p>
          <button className="bg-[#447F98] hover:bg-[#5591A9] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer">
            Explore More
          </button>
        </div>

        {/* Right Carousel Area */}
        <div className="col-span-3 h-full px-10 py-20 flex items-center justify-start relative overflow-hidden">
          {/* Slides Container */}
          <div
            className="flex items-center transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 10}%)` }} // Simple movement logic
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`w-[450px] h-[550px] flex-shrink-0 relative shadow-2xl transition duration-500 mr-12 rounded-xl overflow-hidden cursor-pointer
                ${currentIndex === index ? 'opacity-100 scale-105 z-10' : 'opacity-60 scale-95'}`}
              >
                <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
                {currentIndex === index && (
                  <div className="absolute bottom-10 left-10 text-white z-20">
                    <p className="text-sm">{slide.desc}</p>
                    <h2 className="text-4xl font-bold mt-1">{slide.title}</h2>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Indicators */}
          <div className="absolute z-30 flex space-x-3 bottom-20 left-1/2 -translate-x-1/2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${currentIndex === i ? 'bg-[#447F98]' : 'bg-gray-400 opacity-50'}`}
              />
            ))}
          </div>

          {/* Controls */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/70 hover:bg-white shadow-lg text-[#447F98]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/></svg>
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/70 hover:bg-white shadow-lg text-[#447F98]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Explore;