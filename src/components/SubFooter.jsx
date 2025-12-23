

export default function SubFooter() {
  return (
    <div className="w-full bg-[#eef7fb] py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="flex items-center gap-4">
          <img src="../public/icon/trophy 1.png" alt="" className="text-5xl text-gray-800 h-10 w-10"/>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-900">High Quality</h3>
            <p className="text-sm text-gray-500">crafted from top materials</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <img src="../public/icon/Group.png" alt="" className="text-5xl text-gray-800 h-10 w-10"/>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-900">Warranty Protection</h3>
            <p className="text-sm text-gray-500">Over 2 years</p>
          </div>
        </div>

             <div className="flex items-center gap-4">
            <img src="../public/icon/Vector.png" alt="" className="text-5xl text-gray-800 h-10 w-10"/>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-900">Free Shipping</h3>
            <p className="text-sm text-gray-500">Order over 150 THB</p>
          </div>
        </div>


        <div className="flex items-center gap-4">
            <img src="../public/icon/customer-support.png" alt="" className="text-5xl text-gray-800 h-10 w-10"/>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-900">24 / 7 Support</h3>
            <p className="text-sm text-gray-500">Dedicated support</p>
          </div>
        </div>

      </div>
    </div>
  );
}

