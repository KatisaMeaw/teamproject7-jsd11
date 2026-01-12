import React from "react";

function FilterBar({
  category,
  setCategory,
  sortOption,
  setSortOption,
  totalResult,
  showingCount,
}) {
  return (
    // 1. กล่องใหญ่สุด (Container)
    <div className="flex flex-col md:flex-row justify-between items-center bg-[#D6EBF3] px-4 py-6 md:px-10 rounded-lg">
      {/* 2. ส่วนทางซ้าย - Filter Category */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-0">
        {/* Dropdown */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Filter by:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 px-4 rouned border-gray-300 text-gray-600 focus:outline-non cursor-pointer"
          >
            <option value="All">All Category</option>
            <option value="Ergonomic Chair">Ergonomic Chair</option>
            <option value="Table">Table</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* เส้นคั้นแนวตั้ง */}
        <div className=" hidden sm:block h-6 w-0.5 bg-gray-400 mx-2"></div>

        {/* ข้อความแสดงผลลัพธ์ */}
        <p>
          {" "}
          className="text-sm md:text-base" Showing 1-{showingCount} of{" "}
          {totalResult}
        </p>
      </div>

      {/* 3. ส่วนทางขวา (Right Section) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">sort by</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="h-10 px-4 bg-white text-gray-500 outline-none cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
