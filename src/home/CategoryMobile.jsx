import React from "react";

const CategoryMobile = ({
  items,
  currentIndex,
  handlePrev,
  handleNext,

}) => {
  return (
    <>
      {/* ------------------------การ์ดแต่ละ category------------------------------- */}
      <div className=" w-full overflow-hidden">


        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
          {items.map((post, index) => {
            return (
              <div
                key={index}
                className="w-full flex-none flex flex-col items-center text-center px-4"
              >


                <img
                  // src={cate.img}
                  src={post.userId}
                  alt={post.title}
                  className="rounded-xl block object-cover w-62.5 h-75 cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
                />
                <span className="inline-block text-xl mt-8 text-[#447F98] font-bold cursor-pointer text-shadow-sm">
                  {/* {post.name} */} {post.title}
                </span>
                </div>
            );
          })}
        </div>

      </div>

      {/* ----------------------------ปุ่มกด < >------------------------------------ */}
      <button
        type="button"
        className="absolute top-42 transform -translate-y-1/2 start-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none"
        onClick={() => handlePrev()}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#447F98] group-hover:bg-[#31647a] shadow-lg">
          <svg
            className="w-5 h-5 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m15 19-7-7 7-7"
            />
          </svg>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-42 transform -translate-y-1/2 end-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none"
        onClick={() => handleNext()}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#447F98] group-hover:bg-[#31647a] shadow-lg">
          <svg
            className="w-5 h-5 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </span>
      </button>
    </>
  );
};

export default CategoryMobile;




// import React from "react";

// const CategoryMobile = ({
//   // items,
//   // currentIndex,
//   handlePrev,
//   handleNext,
//   userId, title
// }) => {
//   return (
//     <>
//       {/* การ์ดแต่ละ category */}
//       <div className=" w-full overflow-hidden">


//         <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//           {items.map((cate, index) => {
//             return (
//               <div
//                 key={index}
//                 className="w-full flex-none flex flex-col items-center text-center px-4"
//               >


//                 <img
//                   // src={cate.img}
//                   src={userId}
//                   alt={cate.name}
//                   className="rounded-xl block object-cover w-[250px] h-[300px] cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
//                 />
//                 <span className="inline-block text-xl mt-8 text-[#447F98] font-bold cursor-pointer">
//                   {/* {cate.name} */} {title}
//                 </span>
//                 </div>
//             );
//           })}
//         </div>

//       </div>

//       {/* ปุ่มกด < > */}
//       <button
//         type="button"
//         className="absolute top-42 transform -translate-y-1/2 start-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none"
//         onClick={() => handlePrev()}
//         data-carousel-prev
//       >
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#447F98] group-hover:bg-[#31647a] shadow-lg">
//           <svg
//             className="w-5 h-5 text-white rtl:rotate-180"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               stroke="currentColor"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="m15 19-7-7 7-7"
//             />
//           </svg>
//         </span>
//       </button>

//       <button
//         type="button"
//         className="absolute top-42 transform -translate-y-1/2 end-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none"
//         onClick={() => handleNext()}
//         data-carousel-next
//       >
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#447F98] group-hover:bg-[#31647a] shadow-lg">
//           <svg
//             className="w-5 h-5 text-white rtl:rotate-180"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               stroke="currentColor"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="m9 5 7 7-7 7"
//             />
//           </svg>
//         </span>
//       </button>
//     </>
//   );
// };

// export default CategoryMobile;