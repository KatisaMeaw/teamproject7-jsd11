import { useState, useEffect } from "react";
import axios from "axios"; // ✅ เปลี่ยนมาใช้ axios
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import SubNavbar from "../components/SubNavbar";
import { useCart } from "../hooks/useCart";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams(); 
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // ✅ 1. ตรวจสอบ ID เบื้องต้นเพื่อป้องกัน Infinite Loop (cite: image_db1c3c.png)
      if (!id || id === "undefined" || id.length < 10) {
        setLoading(false);
        setError("Invalid Product ID format");
        return; 
      }

      setLoading(true);
      try {
        // ✅ 2. ใช้ axios.get แทน fetch
        const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
        
        // axios จะเก็บข้อมูลไว้ใน property .data โดยอัตโนมัติ
        const result = response.data;
        const data = result.data || result;
        
        setProduct(data);
        setError(null);
      } catch (err) {
        // ✅ 3. การจัดการ Error ของ axios
        console.error("Error fetching product:", err);
        const errorMessage = err.response?.data?.message || err.message || "Product not found";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center font-bold text-xl">
        Loading product data...
      </div>
    );
  }

  // ✅ แสดงข้อความแจ้งเตือนถ้าหาไม่เจอ (ป้องกันหน้าขาวใน image_dac604.png)
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-500 gap-4">
        <p className="text-xl font-bold">Error: {error}</p>
        <button 
          onClick={() => navigate("/shop")}
          className="text-blue-500 underline"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const productId = product._id || product.id; 
    if (!productId) {
      alert("Cannot add to cart: Missing Product ID");
      return;
    }

    addToCart({
      ...product,
      id: productId, 
      quantity: quantity,
    });

    navigate("/cart");
  };

  return (
    <>
      <SubNavbar />
      <div className="flex justify-center p-6">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-6xl">
          <div className="bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-10 p-6 rounded-xl">
            
            {/* 🖼️ Picture Section */}
            <div className="flex justify-center items-center bg-white rounded-lg p-4 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-xl object-cover"
                style={{ maxWidth: "400px", minHeight: "300px" }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
              />
            </div>

            {/* 📝 Content Section */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {/* ✅ ป้องกัน toLocaleString พัง (cite: image_daafc4.png) */}
                <p className="text-2xl text-[#447F98] font-semibold">
                  THB {(Number(product.price || 0)).toLocaleString()}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex text-yellow-400">
                  <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                </div>
                <div className="h-5 w-px bg-gray-300"></div>
                <span className="text-sm text-gray-500">5 Customer Review</span>
              </div>
              
              <p className="text-gray-600 leading-relaxed min-h-[100px]">
                {product.description || "No description available for this product."}
              </p>

              <div className="flex flex-row gap-5 mt-8">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={decrementQty}
                    className="w-12 h-12 text-gray-500 hover:bg-gray-100 transition text-xl"
                  >
                    -
                  </button>
                  <div className="w-12 h-12 flex items-center justify-center font-bold text-gray-900 border-x">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQty}
                    className="w-12 h-12 text-gray-500 hover:bg-gray-100 transition text-xl"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#447F98] text-white rounded-lg font-bold text-lg 
                            hover:bg-[#356377] active:scale-95
                            transition-all duration-300 px-8 py-3 shadow-md"
                >
                  Add To Cart
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 space-y-3">
                <div className="flex">
                  <span className="w-24 text-gray-400 font-medium">SKU</span>
                  <span className="text-gray-900">
                    : {product._id ? String(product._id).substring(0, 8).toUpperCase() : "N/A"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-400 font-medium">Category</span>
                  <span className="text-gray-900">: {product.category || "General"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubFooter />
      <Footer />
    </>
  );
}