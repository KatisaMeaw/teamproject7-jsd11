// import React from 'react'
function ProductDetail() {
  return (
    <div className="flex justify-center">
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-6xl">
      <div className="bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* picture */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1 w-20">
            <div
              className="aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 border border-gray-200"
            >
              <img
                src="picture\1.jpg"
                alt="chair"
                className="w-full h-full object-cover hover:scale-110 transition"
              />
            </div>
            <div
              className="aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 border border-gray-200"
            >
              <img
                src="picture\2.jpg"
                alt="chair"
                className="w-full h-full object-cover hover:scale-110 transition"
              />
            </div>
            <div
              className="aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 border border-gray-200"
            >
              <img
                src="picture\2.jpg"
                alt="chair"
                className="w-full h-full object-cover hover:scale-110 transition"
              />
            </div>
          </div>
          <div>
            <div
              className="flex-1 rounded-xl overflow-hidden relative h-[500px]"
            >
              <img
                src="picture\4.jpg"
                alt="big picture"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* content section */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Syltherine</h1>
            <p className="text-2xl text-gray-500 font-medium">THB 5,000</p>
          </div>
          <div className="flex item-center gap-4">
            <div className="flex text-yellow-400">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div className="h-5 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">5 Customer Review</span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Height and angle-adjustable headrest specially designed using
            luxe-touch woven fibre to meet your needs and comfort. Built-in
            height-adjustable cushioned lumbar support to provide maximum
            comfort and support for your back.
          </p>

          <div className="space-y-5 mt-6">
            <div>
              <span className="block text-gray-400 text-sm font-medium mb-2">
                Color
              </span>
              <div className="flex gap-3">
                <button
                  className="w-8 h-8 rounded-full bg-red-300 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition"
                ></button>
                <button
                  className="w-8 h-8 rounded-full bg-black hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition"
                ></button>
                <button
                  className="w-8 h-8 rounded-full bg-teal-200 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition"
                ></button>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-5 mt-8">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                className="w-10 h-12 text-gray-500 hover:bg-gray-100 hover:text-black rounded-l-lg transition"
              >
                -
              </button>

              <div
                className="w-12 h-12 flex items-center justify-center font-medium text-gray-900"
              >
                1
              </div>

              <button
                className="w-10 h-12 text-gray-500 hover:bg-gray-100 hover:text-black rounded-r-lg transition"
              >
                +
              </button>
            </div>

            <button
              className="flex-1 border border-black rounded-lg text-black font-medium text-lg hover:bg-black hover:text-white transition duration-300 px-8 py-3"
            >
              Add To Cart
            </button>
          </div>

          <div
            className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 space-y-3"
          >
            <div className="flex">
              <span className="w-24 text-gray-400">SKU</span>
              <span>: SS001</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-400">Category</span>
              <span>: Chairs</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-400">Tags</span>
              <span>: Chair, Home, Shop</span>
            </div>
            <div className="flex items-center mt-6">
              <span className="w-24 text-gray-400">Share</span>
              <span className="text-gray-400 mx-2">:</span>
              <div className="flex gap-4">
                <img src="picture\facebook.png" alt="icon" className="w-8 h-8"/>
                <img src="picture\twitter.png" alt="icon" className="w-8 h-8"/>
                <img src="picture\linkedin.png" alt="icon" className="w-8 h-8"/>
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