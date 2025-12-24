import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // 1. จำลองข้อมูลสินค้าในตะกร้า (ในงานจริงอาจมาจาก Context หรือ Redux)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Syltherine',
      price: 5000,
      quantity: 1,
      image: 'picture/chair 1.jpeg',
    },
  ]);

  // 2. Logic สำหรับการอัปเดตจำนวนสินค้า
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return; // ป้องกันค่าติดลบ
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  // 3. Logic สำหรับลบสินค้า
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // 4. การคำนวณยอดรวม
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ส่วนรายการสินค้า (Table Section) */}
        <div className="lg:w-2/3">
          <div className="bg-white border-t border-b border-gray-300 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 text-left font-medium p-4 text-sm bg-orange-50/50">
              <div className="col-span-1">Product</div>
              <div className="col-span-1">Price</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1">Subtotal</div>
            </div>

            {/* Table Body - ใช้ map วนลูปรายการสินค้า */}
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-4 items-center border-t border-gray-100 py-6 px-4 text-sm">
                  <div className="col-span-1 flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover border rounded bg-orange-50" 
                    />
                    <span className="text-gray-500 font-medium">{item.name}</span>
                  </div>

                  <div className="col-span-1 text-gray-500">
                    {item.price.toLocaleString()}
                  </div>
                  
                  <div className="col-span-1 flex justify-center">
                    <input 
                      type="number" 
                      value={item.quantity} 
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 text-center border border-gray-300 rounded p-1 text-sm focus:ring-1 focus:ring-orange-300 outline-none" 
                    />
                  </div>
                  
                  <div className="col-span-1 flex justify-between items-center">
                    <span className="font-medium">{(item.price * item.quantity).toLocaleString()}</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-orange-400 hover:text-red-500 transition-colors p-1"
                      title="Remove Item"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 6h6v10H7V6z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-400">Your cart is empty.</div>
            )}
          </div>
        </div>

        {/* ส่วนสรุปราคา (Cart Totals) */}
        <div className="lg:w-1/3">
          <div className="bg-orange-50/50 p-8 rounded-sm">
            <h2 className="text-2xl font-semibold mb-8 text-center">Cart Totals</h2>

            <div className="flex justify-between mb-4 text-base">
              <span className="font-medium text-gray-800">Subtotal</span>
              <span className="text-gray-400">Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
              <span className="text-gray-800">Total</span>
              <span className="text-xl text-orange-600">Rs. {subtotal.toLocaleString()}</span> 
            </div>

            <div className="flex justify-center mt-10">
            <Link
                to="/checkout"
                className="inline-block bg-transparent text-black border-2 border-black hover:bg-black hover:text-white font-medium py-3 px-12 rounded-xl transition-all duration-300"
            >
                Check Out
            </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;