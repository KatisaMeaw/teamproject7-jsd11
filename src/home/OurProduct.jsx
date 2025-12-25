import React from "react";
import Card from "../components/Card";

function OurProduct() {
  return (
    <section>
      <div className="p-20 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-[#447F98]">Our Products</h1>
    </div>
      <div className="mb-30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          </div>

    </div>

    <div className="flex justify-center items-center md:mt-15">
      <button className="p-4 border border-[#447F98] w-80 text-md font-bold text-[#447F98] cursor-pointer hover:bg-[#447F98] hover:text-white">Show More</button>
    </div>


  </div>

</section>
  );
}

export default OurProduct;
