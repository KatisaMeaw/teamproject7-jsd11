import React from "react";
import Card from "../components/Card";

function OurProduct() {
  return (
    <section>
      <div class="p-20 flex flex-col justify-center items-center">
        <h1 class="text-4xl font-bold text-[#447F98]">Our Products</h1>
    </div>
      <div class="mb-30">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          </div>
          
    </div>
    
    <div class="flex justify-center items-center md:mt-15">
      <button class="p-4 border border-[#447F98] w-80 text-md font-bold text-[#447F98] cursor-pointer hover:bg-[#447F98] hover:text-white">Show More</button>
    </div>

    
  </div>

</section>
  );
}

export default OurProduct;
