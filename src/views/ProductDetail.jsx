// import React from 'react'

function ProductDetail() {
  return (
    <div class="flex justify-center">
    <div class="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-6xl">
      <div class="bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* picture */}
        <div class="flex flex-row gap-4">
          <div class="flex flex-col gap-1 w-20">
            <div
              class="aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 border border-gray-200"
            >
              <img
                src="picture\1.jpg"
                alt="chair"
                class="w-full h-full object-cover hover:scale-110 transition"
              />
            </div>
            <div
              class="aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 border border-gray-200"
            >
              <img
                src="picture\2.jpg"
                alt="chair"
                class="w-full h-full object-cover hover:scale-110 transition"
              />
            </div>
            <div
              class="aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 border border-gray-200"
            >
              <img
                src="picture\2.jpg"
                alt="chair"
                class="w-full h-full object-cover hover:scale-110 transition"
              />
            </div>
          </div>
          <div>
            <div
              class="flex-1 rounded-xl overflow-hidden relative h-[500px]"
            >
              <img
                src="picture\4.jpg"
                alt="big picture"
                class="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* content section */}
        <div class="flex flex-col gap-6">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Syltherine</h1>
            <p class="text-2xl text-gray-500 font-medium">THB 5,000</p>
          </div>
          <div class="flex item-center gap-4">
            <div class="flex text-yellow-400">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div class="h-5 w-px bg-gray-300"></div>
            <span class="text-sm text-gray-500">5 Customer Review</span>
          </div>
          <p class="text-gray-600 leading-relaxed">
            Height and angle-adjustable headrest specially designed using
            luxe-touch woven fibre to meet your needs and comfort. Built-in
            height-adjustable cushioned lumbar support to provide maximum
            comfort and support for your back.
          </p>

          <div class="space-y-5 mt-6">
            <div>
              <span class="block text-gray-400 text-sm font-medium mb-2">
                Color
              </span>
              <div class="flex gap-3">
                <button
                  class="w-8 h-8 rounded-full bg-red-300 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition"
                ></button>
                <button
                  class="w-8 h-8 rounded-full bg-black hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition"
                ></button>
                <button
                  class="w-8 h-8 rounded-full bg-teal-200 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition"
                ></button>
              </div>
            </div>
          </div>

          <div class="flex flex-row gap-5 mt-8">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button
                class="w-10 h-12 text-gray-500 hover:bg-gray-100 hover:text-black rounded-l-lg transition"
              >
                -
              </button>

              <div
                class="w-12 h-12 flex items-center justify-center font-medium text-gray-900"
              >
                1
              </div>

              <button
                class="w-10 h-12 text-gray-500 hover:bg-gray-100 hover:text-black rounded-r-lg transition"
              >
                +
              </button>
            </div>

            <button
              class="flex-1 border border-black rounded-lg text-black font-medium text-lg hover:bg-black hover:text-white transition duration-300 px-8 py-3"
            >
              Add To Cart
            </button>
          </div>

          <div
            class="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 space-y-3"
          >
            <div class="flex">
              <span class="w-24 text-gray-400">SKU</span>
              <span>: SS001</span>
            </div>
            <div class="flex">
              <span class="w-24 text-gray-400">Category</span>
              <span>: Chairs</span>
            </div>
            <div class="flex">
              <span class="w-24 text-gray-400">Tags</span>
              <span>: Chair, Home, Shop</span>
            </div>
            <div class="flex items-center mt-6">
              <span class="w-24 text-gray-400">Share</span>
              <span class="text-gray-400 mx-2">:</span>
              <div class="flex gap-4">
                <img src="picture\facebook.png" alt="icon" class="w-8 h-8"/>
                <img src="picture\twitter.png" alt="icon" class="w-8 h-8"/>
                <img src="picture\linkedin.png" alt="icon" class="w-8 h-8"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProductDetail