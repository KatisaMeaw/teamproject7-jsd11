import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import axios from "axios";

function OurProduct() {
  // const [allProducts, setAllProducts] = useState([
  //   { id: 1, name: "Leviosa", description: "stylish comfy chair", price: 2500, badge: "-30%", img:""},
  //   { id: 2, name: "Lolito", description: "stylish comfy chair", price: 1500, badge: "-30%"},
  //   { id: 3, name: "Respira", description: "stylish comfy chair", price: 500, badge: "-30%", img:"" },
  //   { id: 4, name: "viosa", description: "stylish comfy chair", price: 700, badge: "-30%", img:"" },
  //   { id: 5, name: "pira", description: "stylish comfy chair", price: 2500, badge: "-30%", img:"" },
  //   { id: 6, name: "Pingky", description: "stylish comfy chair", price: 1500, badge: "-30%", img:"" },
  //   { id: 7, name: "Leatera", description: "stylish comfy chair", price: 500, badge: "-30%", img:"" },
  //   { id: 8, name: "Lovely", description: "stylish comfy chair", price: 700, badge: "-30%", img:"" },
  //   { id: 9, name: "Grifo", description: "stylish comfy chair", price: 2500, badge: "-30%", img:"" },
  //   {
  //     id: 10,
  //     name: "Syltherine",
  //     description: "stylish comfy chair",
  //     price: 3000,
  //   },
  // ]);
  const url = "https://jsonplaceholder.typicode.com/posts";

  const [displayProducts, setDisplayProducts] = useState([]);

  

  function showAllItems() {
    return (
      <>
        {displayProducts.slice(0, 8).map((post) => (
          <Card
            // key={prod.id}
            // name={prod.name}
            // description={prod.description}
            // price={prod.price}
            // badge={prod.badge}
            key={post.id}
            title={post.title}
            body={post.body}

          />
        ))}
      </>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
    let res = await axios.get(url);
    setDisplayProducts(res.data);
  };
  fetchData();
  }, []);

  return (
    <>
      <div className="p-15 flex flex-col justify-center items-center ">
        <h1 className="text-2xl md:text-3xl font-bold text-[#447F98]">
          Our Products
        </h1>
      </div>
      <div className="mb-15 w-full">
        <div className="container mx-auto ">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-0 ">
           {showAllItems()}
           
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center md:mt-15">
        <Link to="/shop">
          <button className="p-4 mb-10 border border-[#447F98] w-80 text-md font-bold text-[#447F98] cursor-pointer hover:bg-[#447F98] hover:text-white">
            Show More
          </button>
        </Link>
      </div>
    </>
  );

  
}

export default OurProduct;
