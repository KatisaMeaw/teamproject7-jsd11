import { useState } from "react";
import CategoryMobile from "./CategoryMobile";
import CategoryDesktop from "./CategoryDesktop";
import { useNavigate } from "react-router-dom";

export default function Browse() {

  const navigate = useNavigate(); 
  const handleCategoryClick = (categoryName) =>{
    navigate('/shop', {state : {selectedCategory: categoryName}});
  }

  const myCategories = [
    {
      id: 1,
      name: "Ergonomic Chair",
      image: "./img-prod/Blue Gaming Chair - Pastel Series.jpeg"
    },
    {
      id: 2,
      name: "Ergonomic Desk",
      image: "./img-prod/White gaming setup inspiration _ Secretlab.jpeg"
    },
    {
      id: 3,
      name: "Accessories",
      image: "./img-prod/lamp.png"
    }
  ];  
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = myCategories;

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(visibleItems.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === visibleItems.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };


  return (
    <>
      <div className="p-10 md:p-20 flex flex-col justify-center items- text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#447F98] text-shadow-sm">
          Browse The Range
        </h1>
        <p className="text-[#629BB5] text-sm md:text-lg mt-3 text-shadow-sm">
          We offer a full spectrum of solutions to transform your workspace and
          promote lasting health and productivity.
        </p>
      </div>

      {/* ----------------------------------mobile 📱 ---------------------------------- */}

      <div
        id="controls-carousel"
        className="relative md:hidden gap-4 "
        data-carousel="static"
      >
      
          <CategoryMobile
          items={visibleItems}
          currentIndex={currentIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
          onCategoryClick={handleCategoryClick}

        />
        
      </div>

      {/* ----------------------------------Desktop 💻---------------------------------- */}

      <div className="flex-row justify-center items-start gap-8 mb-10 hidden md:flex ">
        <div className="flex flex-col items-center">
          <div>
            <img
              src="./img-prod/Blue Gaming Chair - Pastel Series.jpeg"
              alt="Ergonomic Chair"
              className="rounded-xl w-[350px] h-[400px] cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
              onClick={() => handleCategoryClick("Ergonomic Chair")}
            />
          </div>
          <span className="text-xl mt-8 text-[#447F98] font-bold cursor-pointer">
            Ergonomic Chair
          </span>
        </div>

        <div className="flex flex-col items-center ">
          <div>
            <img
              src="./img-prod/White gaming setup inspiration _ Secretlab.jpeg"
              alt="Ergonomic Desk"
              className="rounded-xl w-[350px] h-[400px] cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
              onClick={() => handleCategoryClick("Ergonomic Desk")}
            />
          </div>
          <span className="text-xl mt-8 text-[#447F98] font-bold cursor-pointer">
            Ergonomic Desk
          </span>
        </div>

        <div className="flex flex-col items-center ">
          <div>
            <img
              src="./img-prod/lamp.png"
              alt="Accessories"
              className="rounded-xl w-[350px] h-[400px] cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
              onClick={() => handleCategoryClick("Accessories")}
            />
          </div>
          <span className="text-xl mt-8 text-[#447F98] font-bold cursor-pointer">
            Accessories
          </span>
        </div>

      </div>
    </>
  );
}
