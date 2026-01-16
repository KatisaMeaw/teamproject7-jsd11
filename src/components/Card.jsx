// import React from 'react'


function Card({ product }) {
  if (!product) {
    return null;
  }
 
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-5 right-5 bg-green-400 text-black rounded-full w-12 h-12 flex justify-center items-center text-sm font-medium">
          {product.discount}
        </div>
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-[#447F98] font-bold py-3 px-10 rounded shadow hover:bg-[#447F98] hover:text-white transition-colors duration-300">
            Add to cart
          </button>
          <div className="flex gap-4 mt-6 text-white text-sm font-semibold">
            <div className="flex items-center cursor-pointer hover:text-black">
              <span className="mr-1">🔗</span> Share
            </div>
            <div className="flex items-center cursor-pointer hover:text-black">
              <span className="mr-1">❤️</span> Like
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#447F98] mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">
          {product.description}
        </p>
        <div className="flex items-center justify-start gap-4">
          <span className="text-[#447F98] text-lg font-bold">THB {product.price}</span>
          <span className="text-gray-400 text-sm line-through">THB {product.originalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

// import React from 'react'


// function Card({id, title, body}) {
//   return (
//     <div className="bg-white rounded-lg shadow-sm">
//       <div className="relative group">
//         <img
//           src="./img-prod/chair1.jpeg"
//           alt="chair"
//           className="w-full h-80 object-cover"
//         />
//         <div className="absolute top-5 right-5 bg-red-400 text-white rounded-full w-12 h-12 flex justify-center items-center text-sm font-medium">
//           {id}
//         </div>
//         <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button className="bg-white text-[#447F98] font-bold py-3 px-10 rounded shadow hover:bg-[#447F98] hover:text-white transition-colors duration-300">
//             Add to cart
//           </button>
//           <div className="flex gap-4 mt-6 text-white text-sm font-semibold">
//             <div className="flex items-center cursor-pointer hover:text-black">
//               <span className="mr-1">🔗</span> Share
//             </div>
//             <div className="flex items-center cursor-pointer hover:text-black">
//               <span className="mr-1">❤️</span> Like
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="p-4">
//         <h3 className="text-xl font-bold text-[#447F98] mb-1">{title}</h3>
//         <p className="text-gray-500 text-sm mb-2">
//           {body}
//         </p>
//         <div className="flex items-center justify-start gap-4">
//           <span className="text-[#447F98] text-lg font-bold">thb 2,500</span>
//           <span className="text-gray-400 text-sm line-through">thb 3,500</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;
