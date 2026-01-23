import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Card from "../components/Card";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import SubNavbar from "../components/SubNavbar";
import FilterBar from "../shop/FilterBar";
import { Link, useLocation } from "react-router-dom";

export default function Shop() {

  //📍 location = ข้อมูลเกี่ยวกับหน้าที่เราอยู่ (URL, state ที่ส่งมา)
  // ใช้เพื่อรับค่า category ที่ส่งมาจากหน้าอื่น
  const location = useLocation();

  // 🌐 apiBase = URL ของ API ที่เก็บไว้ใน .env
  // ใช้ import.meta.env เพื่อดึงค่าจากไฟล์ .env
  const apiBase = import.meta.env.VITE_API_URL;

  const initialCategory = location.state?.selectedCategory || "All";

  //State สำหรับการดึงข้อมูล
  const [products, setProducts] = useState([]); //สร้าง state ว่างเพื่อรอรับของ
  const [loading, setLoading] = useState(true); //สร้าง state รอโหลด

  //  สร้าง State สำหรับแบ่งหน้า
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // กำหนดว่าจะโชว์หน้าละกี่ชิ้น (เช่น 16 ชิ้น)

  // State สำหรับ Filter และ Sort
  const [sortOption, setSortOption] = useState(initialCategory);
  // เช็คว่ามีค่าส่งมาไหม? ถ้ามีให้ใช้ค่านั้นเลย ถ้าไม่มีให้ใช้ "All"
  const [category, setCategory] = useState(
    location.state?.selectedCategory || "All"
  );

  // ----------------------------------------------------
  //  Fetch Data: สร้าง UseEffect ดึงข้อมูลจาก Server หลังจากที่หน้าเว็บวาดเสร็จแล้ว
  // ----------------------------------------------------

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiBase}/products`);
      // แก้ไขบรรทัดนี้: ต้องดึง .data ข้างในออกมาเพื่อให้ได้ Array ของสินค้าจริง
      const result = response.data;
      setProducts(result.data || result);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  fetchProducts();
}, [apiBase]); // [] แปลว่าทำครั้งเดียวตอนเปิดหน้า

  // ฟังก์ชัน Reset Page เมื่อเปลี่ยน Filter
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
    setCurrentPage(1);
  };

  // Logic การกรองและเรียงลำดับ
  const displayProducts = useMemo(() => {
    let processedData = [...products];

    if (category !== "All") {
      processedData = processedData.filter((item) => item.category === category);
    }

    if (sortOption === "price-low") {
      processedData.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      processedData.sort((a, b) => b.price - a.price);
    } else {
      // เรียงตาม _id ของ MongoDB (ป้องกัน ID แบบเก่าหลุดมา)
      processedData.sort((a, b) => String(a._id).localeCompare(String(b._id)));
    }

    return processedData; // ส่งค่ากลับไปใส่ตัวแปร displayProducts
  }, [category, sortOption, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //การเช็ค Loading
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading Product...🕑
      </div>
    );
  }

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 p-4 md:p-16">
            {currentProducts.map((product) => (
              // ใช้ product._id เพื่อเชื่อมต่อไปยัง ProductDetail อย่างถูกต้อง
              <Link key={product._id} to={`/product/${product._id}`}>
                <Card product={product} />
              </Link>
            ))}
          </div>
        )}

        {/* --- PAGINATION --- */}
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
