import React from 'react'

function Card() {
  return (
    <div class="bg-white rounded-lg shadow-sm">
            <div class="relative group">
              <img
                src="./img-prod/chair1.jpeg"
                alt="chair"
                class="w-full h-80 object-cover"
              />
              <div
                class="absolute top-5 right-5 bg-red-400 text-white rounded-full w-12 h-12 flex justify-center items-center text-sm font-medium"
              >
                -30%
              </div>
              <div
                class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <button
                  class="bg-white text-[#447F98] font-bold py-3 px-10 rounded shadow hover:bg-[#447F98] hover:text-white transition-colors duration-300"
                >
                  Add to cart
                </button>
                <div class="flex gap-4 mt-6 text-white text-sm font-semibold">
                  <div
                    class="flex items-center cursor-pointer hover:text-black"
                  >
                    <span class="mr-1">🔗</span> Share
                  </div>
                  <div
                    class="flex items-center cursor-pointer hover:text-black"
                  >
                    <span class="mr-1">❤️</span> Like
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-xl font-bold text-[#447F98] mb-1">Syltherine</h3>
              <p class="text-gray-500 text-sm mb-2">Full-support ergonomic chair with adjustable headrest for neck relief.</p>
              <div class="flex items-center justify-start gap-4">
                <span class="text-[#447F98] text-lg font-bold">thb 2,500</span>
                <span class="text-gray-400 text-sm line-through"
                  >thb 3,500</span
                >
              </div>
            </div>
          </div>
  )
}

export default Card