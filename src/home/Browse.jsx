import { useEffect, useState } from "react";
import CategoryMobile from "./CategoryMobile";
import CategoryDesktop from "./CategoryDesktop";
import axios from "axios";

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
        <h1 className="text-2xl md:text-3xl font-bold text-[#447F98]">
          Browse The Range
        </h1>
        <p className="text-[#629BB5] text-sm md:text-lg mt-3">
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

        />
        
      </div>

      {/* ----------------------------------Desktop 💻---------------------------------- */}

      <div className="max-w-[1200px] mx-auto mb-10 hidden md:flex ">
        {displayCategory.slice(0,3).map((post) =>(
          <CategoryDesktop 
          key={post.id}
          userId={post.userId}
          title={post.title}  />
        ))}

      </div>
    </>
  );
}
