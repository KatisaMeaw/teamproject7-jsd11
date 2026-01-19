import { useCart } from "../hooks/useCart"; // ดึง Hook ตะกร้าสินค้า

function Card({ product }) {
  
  const { addToCart } = useCart(); 

  if (!product) {
    return null;
  }

  const handleAddToCart = (e) => {
    // ป้องกันไม่ให้การคลิกปุ่มไปกระตุ้น Link ที่ครอบ Card อยู่ (หน้า Shop)
    e.preventDefault();
    e.stopPropagation();

    const itemToAdd = {
      ...product,
      quantity: 1 
    };

    addToCart(itemToAdd); 
    // เมื่อเรียก addToCart ตัวเลขที่ Navbar จะอัปเดตเองอัตโนมัติผ่าน Context
    console.log("Added to cart:", product.name); 
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
<<<<<<< HEAD
        <div className="absolute top-5 right-5 bg-green-400 text-black rounded-full w-12 h-12 flex justify-center items-center text-sm font-medium">
          {product.discount}
        </div>
=======
        {product.discount && (
          <div className="absolute top-5 right-5 bg-red-400 text-white rounded-full w-12 h-12 flex justify-center items-center text-sm font-medium">
            {product.discount}
          </div>
        )}
        
>>>>>>> 3825a47757f36928781bbfb8e8fb1e9b503f6237
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleAddToCart}
            className="bg-white text-[#447F98] font-bold py-3 px-10 rounded shadow hover:bg-[#447F98] hover:text-white transition-colors duration-300"
          >
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
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">THB {product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
