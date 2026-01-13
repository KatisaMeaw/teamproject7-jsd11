import React from "react";

const CategoryDesktop = ({ userId, title }) => {
  return (
    <>
      {/* การ์ดแต่ละ category */}
      <div className="w-[450px] overflow-hidden">
        <div>
          <div className="flex flex-col items-center text-center px-4">
            <img
              src={userId}
              alt={title}
              className="rounded-xl block object-cover w-[350px] h-[400px] cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
            <span className="inline-block text-xl mt-8 text-[#447F98] font-bold cursor-pointer">
              {title}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDesktop;
