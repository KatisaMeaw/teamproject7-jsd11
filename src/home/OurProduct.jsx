import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import axios from "axios";

function OurProduct() {
  // สร้าง state ว่างๆ เพื่อรอรับสินค้า สินค้าที่สุ่มมาแล้ว
    const [products, setProducts] = useState([])

  // กำหนด URL หลักของ Backend
  // apiBase = URL ของ API ที่เก็บไว้ใน .env
  // ใช้ import.meta.env เพื่อดึงค่าจากไฟล์ .env
    const apiBase = import.meta.env.VITE_API_URL;

  // ทำงานครั้งเดียวตอนโหลดหน้า web
  useEffect(()=> {
    const fetchRandomProDucts = async () => {
      try {
        // ดึงข้อมูลทั้งหมด 60 ตัว
        const response = await axios.get(`${apiBase}/products`);
        const allData = response.data.data || response.data;

        // shuffle ข้อมูลตำแหน่งcard
        // [...allData]ดึงdataทั้งหมดแบบไม่กระทบต้นฉบับ
        //.sort(<กำหนดเกณฑ์การค้นหา>)  Math.random(): คำสั่งนี้จะสุ่มตัวเลขระหว่าง 0 ถึง 0.999... ออกมาเสมอ
        const shuffled = [...allData].sort(() => 0.5 - Math.random());

        // เลือกมาแค่ 8 ชิ้น เก็บใส่ใน State (Index 0 ถึง 8)
        const selected = shuffled.slice(0,8)

        // เอา 8 ชิ้น เก็บไส่ state
        setProducts(selected);
      } catch (error) {
        console.error("Error fetching random products:" ,error);
      }
    };
    fetchRandomProDucts()
  },[]); // [] แปลว่าทำครั้งเดียว

  return (
    <>
      <div className="p-16 flex flex-col justify-center items-center ">
        <h1 className="text-2xl md:text-3xl font-bold text-[#447F98]">
          Our Products
        </h1>
      </div>
      <div className="mb-16 w-full">
        <div className="container mx-auto ">
          {/* Grid Layout: แสดง 4 column */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-0 ">

          {/* Loop สินค้า */}
          {products.map((item)=>(
            // ทำ Link ให้ไปหน้า ProductDetail
            <Link key={item.id} to={`/shop/${item.id}`}>
              {/* ส่งข้อมูลสินค้าทั้งก้อน(Item) ไปให้ Card */}
              <Card product={item}/>
            </Link>
          ))}
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
