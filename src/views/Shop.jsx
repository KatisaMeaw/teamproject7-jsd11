import Card from "../components/Card";
import FilterBar from "../shop/FilterBar";



export default function Shop() {
  
  return (
    <div class="container mx-auto">
      <FilterBar />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-16">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        
      </div>
      <div class="flex justify-center items-center mt-12 gap-5 my-10">
        <button class="w-12 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
          1
        </button>

        <button class="w-12 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
          2
        </button>

        <button class="w-12 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
          3
        </button>

        <button class="px-6 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
          Next
        </button>
      </div>
    </div>
  );
}
