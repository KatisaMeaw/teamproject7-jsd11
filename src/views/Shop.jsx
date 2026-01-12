import React, { useState, useMemo } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import SubNavbar from "../components/SubNavbar";
import FilterBar from "../shop/FilterBar";
import { Link } from "react-router-dom";
import { products } from "../data";

//แปลงราคา "2,500" --> 2500 เพราะการ sort ราคามันต้องเป็น number
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  // ลบ comma ออก แล้วแปลงเป็น float
  return parseFloat(priceStr.replace(/,/g, ""));
};

export default function Shop() {
  //  สร้าง State สำหรับแบ่งหน้า
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // กำหนดว่าจะโชว์หน้าละกี่ชิ้น (เช่น 16 ชิ้น)

  // State สำหรับ Filter และ Sort
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  // สร้างฟังก์ชัน Wrapper เพื่อ Reset Page เมื่อเปลี่ยน Filter
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // รีเซ็ตหน้าทันทีที่กดเปลี่ยนหมวดหมู่
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
    setCurrentPage(1); // รีเซ็ตหน้าทันทีที่กดเปลี่ยนการเรียงลำดับ
  };

  const displayProducts = useMemo(() => {
    let processedData = [...products];

    // 1. Filter by Category
    if (category !== "All") {
      processedData = processedData.filter(
        (item) => item.category === category
      );
    }

    // 2. Sort by Price
    if (sortOption === "price-low") {
      processedData.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOption === "price-high") {
      processedData.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else {
      // Default: เรียงตาม ID
      processedData.sort((a, b) => a.id - b.id);
    }

    return processedData; // ส่งค่ากลับไปใส่ตัวแปร displayProducts
  }, [category, sortOption]);

  //  คำนวณ index สำหรับตัดแบ่งข้อมูล
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = displayProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);

  // ฟังก์ชันเปลี่ยนหน้า
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <SubNavbar />

      {/* ส่ง Props ไปให้ FilterBar ควบคุม */}
      <FilterBar
        category={category}
        setCategory={handleCategoryChange}
        sortOption={sortOption}
        setSortOption={handleSortChange}
        totalResult={displayProducts.length}
        showingCount={currentProducts.length}
      />

      <div className="container mx-auto">
        {/* เช็คว่ามีสินค้าไหม */}
        {displayProducts.length === 0 ? (
          <div className="text-center p-20 text-gray-500 text-xl">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16">
            {currentProducts.map((product) => (
              <Link key={product.id} to={`/shop/${product.id}`}>
                <Card product={product} />
              </Link>
            ))}
          </div>
        )}

        {/* --- PAGINATION BUTTONS ปุ่มเปลี่ยนหน้าเรียงกัน --- */}
        {/*แสดงเมื่อมีจำนวนหน้ามากกว่า 1 หน้า*/}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-5 my-10">
            {/* create dynamic button */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`w-12 h-12 rounded font-bold text-lg transition duration-300 ${
                    currentPage === pageNum
                      ? "bg-[#B88E2F] text-white"
                      : "bg-[#d6ebf3] text-gray-800 hover:bg-[#B88E2F] hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* ปุ่ม Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages} //ปิดปุ่มเมื่อถึงหน้าสุดท้าย
              className={`px-6 h-12 rounded font-bold text-lg transition duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#d6ebf3] text-gray-800 hover:bg-[#B88E2F] hover:text-white"
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
