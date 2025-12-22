import React from 'react'
import { BiFilter } from "react-icons/bi";

function FilterBar() {
  return (
    // 1. กล่องใหญ่สุด (Container)
    <div className='flex flex-col md:flex-row justify-between items-center bg-[#D6EBF3] px-4 py-6 md:px-10'>
        {/* 2. ส่วนทางซ้าย (Left Section) */}
        <div className='flex items-center gap-4 mb-4 md:mb-0'>
            {/* ปุ่ม Filter */}
            <button className='flex items-center gap-2 hover:opacity-70 transition'>
            <BiFilter size={20}/>
            <span className="font-medium">Filter</span>
            </button>

            {/* เส้นคั่นแนวตั้ง (Divider) */}
            <div className="h-6 w-2px bg-gray-400 mx-2"></div>
            {/* ข้อความแสดงผลลัพธ์ */}
            <p className="text-sm md:text-base text-gray-600">
                Showing 1–16 of 32 results
            </p>
        </div>

        {/* 3. ส่วนทางขวา (Right Section) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <span className="text-gray-600">sort by</span>
            <select className="h-10 px-4 bg-white text-gray-500 outline-none cursor-pointer">
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
            </select>
        </div>

      </div>
    </div>
  )
}

export default FilterBar