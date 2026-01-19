import { useEffect, useState } from "react";
import CategoryMobile from "./CategoryMobile";
import CategoryDesktop from "./CategoryDesktop";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Browse() {

  // const [category, setCategory] = useState([
  //   {
  //     id: "1",
  //     img: "./img-prod/Blue Gaming Chair - Pastel Series.jpeg",
  //     name: "Ergonomic Chair",
  //   },
  //   {
  //     id: "2",
  //     img: "./img-prod/White gaming setup inspiration _ Secretlab.jpeg",
  //     name: "Table",
  //   },
  //   {
  //     id: "3",
  //     img: "./img-prod/Desk Ideas for the Perfect Home Office Setup.jpeg",
  //     name: "Accessories",
  //   },
  // ]);

  const navigate = useNavigate(); 
  const handleCategoryClick = (categoryName) =>{
    navigate('/shop', {state : {selectedCategory: categoryName}});
  }


  const url = "https://jsonplaceholder.typicode.com/posts";
  
    const [displayCategory, setDisplayCategory] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleItems = displayCategory.slice(0, 3)

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

  useEffect(() => {
      const fetchData = async () => {
      let res = await axios.get(url);
      setDisplayCategory(res.data);
    };
    fetchData();
    }, []);

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
        <div className="relative h-fit rounded-xl ">

          {/* Item 1: Chair (เอา hidden ออกถ้าเป็นตัวแรก หรือให้ Library จัดการ) */}
          <div className="flex-none duration-700 ease-in-out flex flex-col items-center" data-carousel-item>
            <img
              src="./img-prod/Blue Gaming Chair - Pastel Series.jpeg"
              alt="Ergonomic Chair"
              className="rounded-xl block w-[250px] h-[300px] object-cover cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
            <span className="inline-block text-xl mt-8 text-[#447F98] font-bold cursor-pointer">
            Ergonomic Chair
          </span>
          </div>
        </div>

        {/* Item 2: Desk */}
        <div className="flex-none duration-700 ease-in-out flex flex-col items-center">
          <div>
            <img
              src="./img-prod/White gaming setup inspiration _ Secretlab.jpeg"
              alt="Desk"
              className="rounded-xl block w-[250px] h-[300px] object-cover cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
          </div>
          <span className="inline-block mt-8 text-xl  text-[#447F98] font-bold cursor-pointer ">
            Ergonomic Desk
          </span>
        </div>

        {/* Item 3: Accessories */}
        <div className="flex-none duration-700 ease-in-out flex flex-col items-center">
          <div>
            <img
              src=".\img-prod\lamp.png"
              alt="Accessories"
              className="rounded-xl block w-[250px] h-[300px] object-cover cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
          </div>
          <span className="inline-block mt-8 text-xl  text-[#447F98] font-bold cursor-pointer ">
            Accessories
          </span>
        </div>

          <CategoryMobile
          items={visibleItems}
          currentIndex={currentIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}

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
