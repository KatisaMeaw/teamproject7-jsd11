import React from "react";
import Card from "../components/Card";

function OurProduct() {
  return (
    <section>
      <div className="p-15 flex flex-col justify-center items-center ">
        <h1 className="text-2xl md:text-3xl font-bold text-[#447F98]">Our Products</h1>
    </div>
      <div className="mb-30 w-full ">
      <div className="container mx-auto ">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-0 ">
          <Card />
          <Card />
          <Card />
          <Card />
          <div className="hidden md:block"><Card /></div>
    <div className="hidden md:block"><Card /></div>
    <div className="hidden md:block"><Card /></div>
    <div className="hidden md:block"><Card /></div>
          </div>

    </div>

    <div className="flex justify-center items-center md:mt-15">
      <button className="p-4 mt-10 md:mt-0 border border-[#447F98] w-80 text-md font-bold text-[#447F98] cursor-pointer hover:bg-[#447F98] hover:text-white">Show More</button>
    </div>


  </div>

</section>
  );
}

export default OurProduct;
