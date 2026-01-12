import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import SubNavbar from '../components/SubNavbar';
import SubFooter from '../components/SubFooter';
import Footer from '../components/Footer';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, subtotal } = useCart();

  // ฟังก์ชันจัดการการเปลี่ยนจำนวนสินค้าแบบปลอดภัย
  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value);
    
    if (qty < 1 || isNaN(qty)) {
      // ถ้าผู้ใช้กรอก 0 หรือลบจนว่าง ให้ถามว่าจะลบสินค้าไหม
      if (window.confirm("Do you want to remove this item from the cart?")) {
        removeItem(id);
      }
    } else {
      updateQuantity(id, qty);
    }
  };

  // ฟังก์ชันลบสินค้าพร้อมยืนยัน
  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeItem(id);
    }
  };

  return (
    <>
    <SubNavbar />
    <main className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh]">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* ส่วนรายการสินค้า */}
        <div className="lg:w-2/3">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Table Header - ซ่อนบนมือถือเพื่อความสวยงาม (เลือกทำได้) */}
            <div className="grid grid-cols-4 p-4 bg-blue-50/50 font-bold text-sm text-gray-700">
              <div>Product</div>
              <div>Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right md:text-left">Subtotal</div>
            </div>

            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-4 items-center border-t border-gray-100 py-6 px-4 text-sm hover:bg-gray-50 transition-colors">
                    {/* ข้อมูลสินค้า */}
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover border rounded-md bg-white" />
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    
                    {/* ราคาต่อชิ้น */}
                    <div className="text-gray-500">Rs. {item.price.toLocaleString()}</div>
                    
                    {/* ตัวปรับจำนวน */}
                    <div className="flex justify-center">
                      <input 
                        type="number" 
                        min="1"
                        value={item.quantity} 
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="w-16 text-center border border-gray-300 rounded-md p-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      />
                    </div>
                    
                    {/* ราคารวมบรรทัดนี้ + ปุ่มลบ */}
                    <div className="flex justify-between items-center pl-4">
                      <span className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()}</span>
                      <button 
                        onClick={() => handleRemove(item.id)} 
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* ปุ่มกลับไปช้อปต่อ */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                   <Link to="/shop" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group">
                      <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                      </svg>
                      Continue Shopping
                   </Link>
                </div>
              </>
            ) : (
              /* หน้าว่างเมื่อไม่มีสินค้า */
              <div className="p-20 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6 text-blue-200">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-md">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ส่วนสรุปราคา (Sidebar) */}
        <div className="lg:w-1/3">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm sticky top-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Cart Totals</h2>
            
            <div className="flex justify-between mb-6 text-gray-600">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">THB {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-xl font-bold pt-6 border-t border-gray-100 mb-8">
              <span className="text-gray-800">Total</span>
              <span className="text-blue-600">THB {subtotal.toLocaleString()}</span> 
            </div>

            <Link 
              to={cartItems.length > 0 ? "/checkout" : "#"} 
              className="text-center w-full mt-8 md:block bg-[#447F98] hover:bg-[#5591A9] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer"
            >
              CHECKOUT
            </Link>

            <p className="text-center text-xs text-gray-400 mt-4">
              Tax included and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </main>
    <SubFooter />
    <Footer />
    </>
  );
};

export default Cart;