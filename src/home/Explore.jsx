import React from 'react'

const Explore = () => {
  return (
        <div>
    <div className="h-dvh w-full bg-[#D6EBF3] ">
        <div className="grid grid-cols-1 md:grid-cols-5 h-full ">
            <div className="col-span-2 flex flex-col items-center md:items-start justify-center px-1 md:ml-30 ">
                <h1 className="font-bold text-[#447F98] text-4xl md:text-6xl mt-15 md:mt-0 mb-6 leading-tight">
                    Explore your own style
                </h1>
                <p className="text-[#60A8C7] font-medium text-lg md:mb-8">
                    We recommended you to try it out <br/>
                    All stuff you want in one room
                </p>
                <button
                    className="bg-[#447F98] hover:bg-[#5591A9] text-white font-bold hidden md:block py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer"
                >
                    Explore More
                </button>
            </div>

            <div className="col-span-3  
                px-6 md:px-10 md:py-8
                flex items-start justify-start
                relative overflow-x-hidden">

        <div className="flex items-center transition-transform duration-500 transform translate-x-0">

            <div className="w-[350px] h-[450px] md:w-[500px] md:h-[600px] relative shadow-2xl  overflow-hidden cursor-pointer opacity-70
                        transition duration-300 ease-in-out hover:z-30 hover:scale-110 hover:shadow-2xl hover:opacity-100">
                <img src="/img-prod/explore-1.jpeg" alt="Office Room" className="w-full h-full object-cover"/>
                <div className="absolute bottom-10 left-10 text-white z-10 bg-white opacity-80 p-3">
                    <p className="text-sm text-[#447F98]">01 — Office Room</p>
                    <h2 className="text-4xl font-bold mt-1 text-[#447F98] ">Inner Peace</h2>
                </div>
            </div>

            <div className="w-[350px] h-[450px] md:w-[500px] md:h-[600px]  relative shadow-2xl ml-16 opacity-70 cursor-pointer
                        transition duration-300 ease-in-out hover:z-30 hover:scale-110 hover:opacity-100">
                <img src="/img-prod/explore-2.jpeg" alt="Bedroom Setup" className="w-full h-full object-cover"/>
            </div>

            <div className="w-[350px] h-[450px] md:w-[500px] md:h-[600px]  relative shadow-2xl ml-16 opacity-70 cursor-pointer
                        transition duration-300 ease-in-out hover:z-30 hover:scale-110 hover:opacity-100">
                <img src="/img-prod/explore-3.jpeg" alt="Living Room" className="w-full h-full object-cover"/>
            </div>

        </div>

        <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-20 left-1/2">
            <button type="button" className="w-3 h-3 rounded-full bg-[#447F98]" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
            <button type="button" className="w-3 h-3 rounded-full bg-gray-400 opacity-50" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
            <button type="button" className="w-3 h-3 rounded-full bg-gray-400 opacity-50" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        </div>

        <button type="button" className="absolute top-1/2 transform -translate-y-1/2 start-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/70 group-hover:bg-white shadow-lg">
                <svg className="w-5 h-5 text-[#447F98] rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
            </span>
        </button>

        <button type="button" className="absolute top-1/2 transform -translate-y-1/2 end-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/70 group-hover:bg-white shadow-lg">
                <svg className="w-5 h-5 text-[#447F98] rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
            </span>
        </button>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Explore