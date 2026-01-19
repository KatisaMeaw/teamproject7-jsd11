<<<<<<< HEAD
import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import SubFooter from '../components/SubFooter';
import SubNavbar from '../components/SubNavbar';
import axios from 'axios'
=======
import { useState } from 'react'; // 1. เพิ่ม useState
import { products } from '../data';
import Footer from '../components/Footer';
import SubFooter from '../components/SubFooter';
import SubNavbar from '../components/SubNavbar';
import { useCart } from "../hooks/useCart";
import { useParams, useNavigate } from 'react-router-dom';
>>>>>>> 3825a47757f36928781bbfb8e8fb1e9b503f6237

export default function ProductDetail() {
  const apiBase = "http://localhost:3000/api/v1";
  const { id } = useParams();
<<<<<<< HEAD
 
  // สร้าง state มารอรับข้อมูล
  const [product, setProduct] = useState(null); //เริ่มต้นยังไม่มีของ
  const [loading, setLoading] = useState(true); // บอกว่ากำลังโหลด
  
  //useEffect ดึงสินค้าชิ้นเดียว
  useEffect(()=>{
    const fetchSingleProduct = async ()=>{
      try {
        setLoading(true);
        console.log("Fetching ID:", id);

        //ยิง api โดยส่งเลือกจาก id
        const response = await axios.get(`${apiBase}/products/${id}`)

        setProduct(response.data) //เก็บข้อมูลที่ได้ใส่ใน State นี้
        setLoading(false);

      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    if (id) { // เช็คว่ามี id ถึงจะยิง
        fetchSingleProduct();
    }
    fetchSingleProduct();
  },[id]); // หมายถึงถ้า id ใน URK เปลี่ยน ให้ดึงข้อมูลทันที

  
  //เช็คสถานะก่อนแสดงผล
  if(loading){
    return<div className='h-screen flex justify-center items-center text-2xl'>Loading Product...🕑</div>;
  }

  if (!product) {
    return <div className="h-screen flex justify-center items-center text-2xl">Product not found ❌</div>;
=======
  const { addToCart } = useCart();
  const navigate = useNavigate(); // 2. ประกาศตัวแปร navigate

  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="min-h-screen flex justify-center items-center">Product not found</div>;
>>>>>>> 3825a47757f36928781bbfb8e8fb1e9b503f6237
  }

  // ฟังก์ชันเพิ่ม-ลดจำนวน
  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // 3. ปรับฟังก์ชันส่งข้อมูล
  const handleAddToCart = () => {
    // ส่งข้อมูลไปที่ Context
    addToCart({ ...product, quantity: quantity });
    // สั่งให้เปลี่ยนหน้าไปยังหน้า cart ทันที
    navigate('/cart'); 
  };

  return (
    <>
    <SubNavbar />
      <div className="flex justify-center p-6">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-6xl">
          <div className="bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
            {/* picture section */}
            <div className="flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-xl object-cover"
                style={{ maxWidth: '400px' }}
              />
            </div>

<<<<<<< HEAD
        {/* content section */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl text-gray-500 font-medium">THB {product.price.toLocaleString()}</p>
=======
            {/* content section */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-2xl text-gray-500 font-medium">
                   THB {product.price.toLocaleString()}
                </p>
>>>>>>> 3825a47757f36928781bbfb8e8fb1e9b503f6237
          </div>
          <div className="flex item-center gap-4">
            <div className="flex text-yellow-400">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div className="h-5 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">5 Customer Review</span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {product.description || "No decription available."}
          </p>
          {/* Color Section
          <div className="space-y-5 mt-6">
            <div>
              <span className="block text-gray-400 text-sm font-medium mb-2">
                Color
              </span>
              <div className="flex gap-3">
                <button
                  className="w-8 h-8 rounded-full bg-red-300 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition"
                ></button>
                <button
                  className="w-8 h-8 rounded-full bg-black hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition"
                ></button>
                <button
                  className="w-8 h-8 rounded-full bg-teal-200 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition"
                ></button>
              </div>
            </div>
          </div> */}

          <div className="flex flex-row gap-5 mt-8">
                {/* ตัวปรับจำนวนสินค้า */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={decrementQty} // 5. ใส่ฟังก์ชันลด
                    className="w-10 h-12 text-gray-500 hover:bg-gray-200 transition"
                  >
                    -
                  </button>

                  <div className="w-12 h-12 flex items-center justify-center font-bold text-gray-900">
                    {quantity} {/* 6. แสดงจำนวนจาก State */}
                  </div>

                  <button
                    onClick={incrementQty} // 7. ใส่ฟังก์ชันเพิ่ม
                    className="w-10 h-12 text-gray-500 hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>

                {/* ปุ่ม Add To Cart */}
                <button
                  onClick={handleAddToCart} // 8. เชื่อมต่อฟังก์ชันส่งข้อมูล
                  className="flex-1 border border-black rounded-lg text-black font-bold text-lg hover:bg-black hover:text-white transition duration-300 px-8 py-3"
                >
                  Add To Cart
                </button>
              </div>

          <div
            className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 space-y-3"
          >
            <div className="flex">
              <span className="w-24 text-gray-800">SKU</span>
              <span>: SS00{product.id}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-800">Category</span>
              <span>: {product.category}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-800">Tags</span>
              <span>: {product.category}, Home, Shop</span>
            </div>
            <div className="flex items-center mt-6">
              <span className="w-24 text-gray-800">Share</span>
              <span className="text-gray-800 mx-2">:</span>
              <div className="flex gap-4">
                <img src="/icon/akar-icons_facebook-fill.png" alt="Facebook" className="w-8 h-8"/>
                <img src="/icon/ant-design_twitter-circle-filled.png" alt="Twitter" className="w-8 h-8"/>
                <img src="/icon/akar-icons_linkedin-box-fill.png" alt="LinkedIn" className="w-8 h-8"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <SubFooter />
    <Footer />
    </>
  )
};

