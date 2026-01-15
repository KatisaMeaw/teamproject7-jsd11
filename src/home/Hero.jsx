import React from 'react'
import {Link} from "react-router-dom";

const Hero = () => {
  return (
     <div
        className="flex items-center justify-center md:justify-end md:pr-10 lg:pr-20 bg-no-repeat bg-cover h-dvh w-full bg-[url('/img-prod/onboard1.jpg')]"
      >
        <div
          className="animate-fade-up w-[90%] sm:w-3/4 md:w-[550px] lg:w-[700px] h-auto  bg-[#B9D8E1]/80 backdrop-blur-sm p-8 md:p-12 lg:p-16 rounded-2xl shadow-2xl flex flex-col"
        >
          <div>
            <p className="text-[#629BB5] font-medium mb-2 text-sm md:text-base text-shadow-sm">New Arrival</p>
            <h1 className="font-bold text-[#447F98] text-4xl md:text-5xl lg:text-7xl mb-6 text-shadow-sm">
              Discover Our <br />New Collection
            </h1>
            <p className="text-[#629BB5] font-medium text-base lg:text-lg text-shadow-sm">
              Relieve your daily strain and reduce chronic pain. Our ergonomic collection provides vital support for a healthier, more productive workday.
            </p>
          </div>
          <Link to="/shop">
          <button
            className="w-full sm:w-40 bg-[#447F98] hover:bg-[#5591A9] text-white font-bold mt-10 h-15 rounded-lg shadow-md cursor-pointer hover:-translate-y-1 transition duration-300 hover:shadow-xl"
          >
            BUY NOW
          </button>
          </Link>
        </div>
      </div>
  )
}

export default Hero