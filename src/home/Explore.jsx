import React, { useState } from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 3;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const slides = [
    {
      id: 1,
      title: "Inner Peace",
      desc: "01 — Office Room",
      img: "/img-prod/explore-1.jpeg",
    },
    {
      id: 2,
      title: "Cozy Rest",
      desc: "02 — Bedroom Setup",
      img: "/img-prod/explore-2.jpeg",
    },
    {
      id: 3,
      title: "Social Space",
      desc: "03 — Living Room",
      img: "/img-prod/explore-3.jpeg",
    },
  ];

  return (
    <div>
      <section>
        <div className="h-dvh w-full bg-[#D6EBF3] ">
          <div className="grid grid-cols-1 md:grid-cols-5 h-full ">
            <div className="col-span-2 flex flex-col items-center md:items-start justify-center px-1 md:ml-30 ">
              <h1 className="font-bold text-[#447F98] text-4xl md:text-6xl mt-15 md:mt-0 mb-6 leading-tight">
                Explore your own <br />
                style
              </h1>
              <p className="text-[#60A8C7] font-medium text-lg mb-8">
                We recommended you to try it out <br />
                All stuff you want in one room
              </p>
              <Link to="/shop">
                <button className="hidden md:block bg-[#447F98] hover:bg-[#5591A9] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer">
                  Explore More
                </button>
              </Link>
            </div>




            <div className="col-span-3 h-full px-8 py-30 flex items-center justify-start relative overflow-x-hidden">
              <div className=" flex items-center transition-transform duration-500 [--slide-dist:380px] md:[--slide-dist:460px] lg:[--slide-dist:370px]"
              style={{ transform: `translateX(calc(-1 * ${currentIndex} * var(--slide-dist)))`}}
              >
                

                <div className="w-[85vw] h-[450px] md:w-[400px] md:h-[600px] lg:w-[500px] relative shadow-2xl  overflow-hidden cursor-pointer opacity-70 transition duration-300 ease-in-out hover:z-30 hover:scale-110 hover:shadow-2xl hover:opacity-100"
                >
                  <img
                    src="/img-prod/explore-1.jpeg"
                    alt="Office Room"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-10 left-10 text-white z-10">
                    <p className="text-sm">01 — Office Room</p>
                    <h2 className="text-4xl font-bold mt-1">Inner Peace</h2>
                  </div>
                  </div>

              
                

                <div
                  className="w-[85vw] h-[450px] md:w-[400px] md:h-[600px] lg:w-[500px] relative shadow-2xl ml-10 md:ml-16 opacity-70 cursor-pointer
                            transition duration-300 ease-in-out hover:z-30 hover:scale-110 hover:opacity-100"
                >
                  <img
                    src="/img-prod/explore-2.jpeg"
                    alt="Bedroom Setup"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className="w-[85vw] h-[450px] md:w-[400px] md:h-[600px] lg:w-[500px] relative shadow-2xl ml-10 md:ml-16 opacity-70 cursor-pointer
                        transition duration-300 ease-in-out hover:z-30 hover:scale-110 hover:opacity-100"
                >
                  <img
                    src="/img-prod/explore-3.jpeg"
                    alt="Living Room"
                    className="w-full h-full object-cover"
                  />
                </div>

                
              </div>
              {/* Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/70 hover:bg-white shadow-lg text-[#447F98]"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m15 19-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/70 hover:bg-white shadow-lg text-[#447F98]"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Navigation Indicators */}
                <div className="absolute z-30 flex space-x-3 bottom-10 md:bottom-20 left-1/2 -translate-x-1/2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentIndex === i
                          ? "bg-[#447F98]"
                          : "bg-gray-400 opacity-50"
                      }`}
                    />
                  ))}
                </div>
            </div>



          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
