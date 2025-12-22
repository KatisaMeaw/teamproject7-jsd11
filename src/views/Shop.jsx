import Card from "../components/Card";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import SubNavbar from "../components/SubNavbar";
import FilterBar from "../shop/FilterBar";

export default function Shop() {
  const products = [
    {
      id: 1,
      image: "./img-prod/chair1.jpeg",
      name: "Syltherine",
      description:
        "Full-support ergonomic chair with adjustable headrest for neck relief.",
      price: "2,500",
      originalPrice: "3,500",
      discount: "-30%",
    },
    {
      id: 2,
      image: "./img-prod/chair2.jpeg",
      name: "Lolito",
      description: "Luxury big sofa 2-seater",
      price: "7,000",
      originalPrice: "14,000",
      discount: "-50%",
    },
    {
      id: 3,
      image: "./img-prod/chair3.jpeg",
      name: "Respawn",
      description: "Minimalist fan-shaped sofa",
      price: "5,000",
      originalPrice: "6,000",
      discount: "New",
    },
    {
      id: 4,
      image: "./img-prod/chair6.jpeg",
      name: "Grifo",
      description: "Night lamp",
      price: "1,500",
      originalPrice: "1,800",
      discount: "-20%",
    },
    {
      id: 5,
      image: "./img-prod/chair8.jpeg",
      name: "Muggo",
      description: "Small mug",
      price: "150",
      originalPrice: "200",
      discount: "New",
    },
    {
      id: 6,
      image: "./img-prod/chair1.jpeg",
      name: "Pingky",
      description: "Cute bed set",
      price: "7,000",
      originalPrice: "14,000",
      discount: "-50%",
    },
    {
      id: 7,
      image: "./img-prod/chair2.jpeg",
      name: "Potty",
      description: "Minimalist flower pot",
      price: "500",
      originalPrice: "600",
      discount: "New",
    },
    {
      id: 8,
      image: "./img-prod/chair3.jpeg",
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: "2,500",
      originalPrice: "3,500",
      discount: "-30%",
    },
  ];

  return (
    <>
      <SubNavbar />
      <FilterBar />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-16">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-12 gap-5 my-10">
          <button className="w-12 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
            1
          </button>

          <button className="w-12 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
            2
          </button>

          <button className="w-12 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
            3
          </button>

          <button className="px-6 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
            Next
          </button>
        </div>
      </div>
      <SubFooter />
      <Footer />
    </>
  );
}
