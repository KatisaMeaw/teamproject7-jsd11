import React, { useState, useEffect, useMemo } from "react";
import axios from "axios"; // ✅ เปลี่ยนมาใช้ axios
import Card from "../components/Card";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import SubNavbar from "../components/SubNavbar";
import FilterBar from "../shop/FilterBar";
import { Link } from "react-router-dom";

const parsePrice = (priceStr) => {
  if (typeof priceStr === "number") return priceStr; 
  if (!priceStr) return 0;
  return parseFloat(priceStr.toString().replace(/,/g, ""));
};

export default function Shop() {
  const [allProducts, setAllProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);

  // ✅ 1. ดึงข้อมูลสินค้าด้วย axios
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        // ใช้ axios.get แทน fetch
        const response = await axios.get("http://localhost:3000/api/v1/products");
        
        // axios จะเก็บ data ไว้ใน response.data โดยตรง
        const result = response.data;
        setAllProducts(result.data || result);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
    setCurrentPage(1);
  };

  const displayProducts = useMemo(() => {
    let processedData = [...allProducts];

    if (category !== "All") {
      processedData = processedData.filter((item) => item.category === category);
    }

    if (sortOption === "price-low") {
      processedData.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOption === "price-high") {
      processedData.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else {
      // ✅ เรียงตาม _id ของ MongoDB (ป้องกัน ID แบบเก่าหลุดมา)
      processedData.sort((a, b) => String(a._id).localeCompare(String(b._id)));
    }

    return processedData;
  }, [allProducts, category, sortOption]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center p-20 font-bold text-xl">Loading Shop...</div>;

  return (
    <>
      <SubNavbar />
      <FilterBar
        category={category}
        setCategory={handleCategoryChange}
        sortOption={sortOption}
        setSortOption={handleSortChange}
        totalResult={displayProducts.length}
        showingCount={currentProducts.length}
      />

      <div className="container mx-auto">
        {displayProducts.length === 0 ? (
          <div className="text-center p-20 text-gray-500 text-xl">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16">
            {currentProducts.map((product) => (
              // ✅ ใช้ product._id เพื่อเชื่อมต่อไปยัง ProductDetail อย่างถูกต้อง
              <Link key={product._id} to={`/product/${product._id}`}>
                <Card product={product} />
              </Link>
            ))}
          </div>
        )}

        {/* --- PAGINATION (คงเดิม) --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-5 my-10">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`w-12 h-12 rounded font-bold text-lg transition duration-300 ${
                    currentPage === pageNum ? "bg-[#B88E2F] text-white" : "bg-[#d6ebf3] text-gray-800"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              disabled={currentPage === totalPages}
              className={`px-6 h-12 rounded font-bold text-lg transition duration-300 ${
                currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-[#d6ebf3] text-gray-800"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <SubFooter />
      <Footer />
    </>
  );
}

// if click at "Add to cart" button both of shop.jsx and ProductDetail.jsx  i want navigate to and add the list of production in the cart.jsx

// ✦ I'll implement "Add to Cart" by first creating a CartContext.jsx file in a new src/context directory. This context will manage cart items and an addToCart function. Next, I'll wrap
//   my app in main.jsx with the CartProvider. Then, in both Card.jsx and ProductDetail.jsx, I'll use useContext to get addToCart, create a function to add the product to the cart and
//   navigate to /cart, and attach this to the "Add to Cart" button's onClick event. Finally, I'll update Cart.jsx to consume the cartItems from the context and display the products and
//   total price. I'm starting with creating CartContext.jsx.
