import React, { useState, useEffect, useMemo } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import SubNavbar from "../components/SubNavbar";
import FilterBar from "../shop/FilterBar";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

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
      //async ฟังก์ชันนี้มีการทำงานที่ "ต้องรอ"
      try {
        // สั่งให้ Axios วิ่งไปที่ URL นี้ แล้ว "หยุดรอ" บรรทัดนี้จนกว่า Server จะตอบกลับมา
        const response = await axios.get(`${apiBase}/products`);
        // เมื่อได้ข้อมูลมาให้เก็บใน State
        setProducts(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); //ถึงจะ error ก็ต้องสั่งหยุดหมุน ไม่งั้นหน้าเว็บจะหมุนค้างตลอดกาล
      }
    };
    fetchProducts();
  }, [apiBase]); // [] แปลว่าทำครั้งเดียวตอนเปิดหน้า

  // ฟังก์ชัน Reset Page เมื่อเปลี่ยน Filter
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // รีเซ็ตหน้าทันทีที่กดเปลี่ยนหมวดหมู่
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
    setCurrentPage(1); // รีเซ็ตหน้าทันทีที่กดเปลี่ยนการเรียงลำดับ
  };

  // Logic การกรองและเรียงลำดับ
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
      processedData.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      processedData.sort((a, b) => b.price - a.price);
    } else {
      // Default: เรียงตาม ID
      processedData.sort((a, b) => a.id - b.id);
    }

    return processedData; // ส่งค่ากลับไปใส่ตัวแปร displayProducts
  }, [category, sortOption, products]);

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

  //การเช็ค Loading
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading Production...🕑
      </div>
    );
  }

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
