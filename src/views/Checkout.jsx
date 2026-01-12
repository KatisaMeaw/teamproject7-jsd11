import React, { useState } from 'react';
import { useCart } from "../context/CartContext";

const FormInput = ({ label, name, type = "text", placeholder, value, onChange, required, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full border border-gray-300 p-3 rounded-md focus:ring-1 focus:ring-blue-500 outline-none transition-all"
      {...props}
    />
  </div>
);

const Checkout = () => {
  const { cartItems, subtotal } = useCart();
  
  // 1. นำฟิลด์ข้อมูลกลับมาให้ครบเหมือนตอนแรก
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    city: '',
    phone: '',
    email: '',
    additionalInfo: '',
    paymentMethod: 'direct-bank'
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingCost = shippingMethod === 'express' ? 1500 : 0;
  const finalTotal = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    console.log("Order Data:", { ...formData, items: cartItems, total: finalTotal });
    alert("Order Successful!");
    window.location.href = "/";
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        
        {/* ฝั่งซ้าย: Billing Details (ใส่ฟิลด์กลับมาครบถ้วน) */}
        <div className="lg:w-3/5">
          <h2 className="text-3xl font-medium mb-10">Billing details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          </div>

          <FormInput label="Company Name (Optional)" name="companyName" value={formData.companyName} onChange={handleInputChange} />
          <FormInput label="Street address" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} required />
          <FormInput label="Town / City" name="city" value={formData.city} onChange={handleInputChange} required />
          <FormInput label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
          <FormInput label="Email address" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Additional information</label>
            <textarea
              name="additionalInfo"
              placeholder="Notes about your order, e.g. special notes for delivery."
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-1 focus:ring-blue-500 outline-none h-32"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        {/* ฝั่งขวา: Order Summary (คงเดิมตามระบบ Context) */}
        <div className="lg:w-2/5 bg-gray-50 p-8 rounded-lg border shadow-sm h-fit">
          <h3 className="text-xl font-bold mb-6 border-b pb-4">Your Order</h3>
          
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} x {item.quantity}</span>
                <span className="font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            {cartItems.length === 0 && <p className="text-gray-400 text-center">No items in cart</p>}
          </div>

          <div className="border-t pt-4 space-y-3 font-medium">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            
            <div className="py-4 border-y border-gray-200">
              <p className="font-bold mb-2">Shipping</p>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer text-sm">
                  <input type="radio" name="ship" className="mr-2" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
                  Free Delivery
                </label>
                <label className="flex items-center cursor-pointer text-sm">
                  <input type="radio" name="ship" className="mr-2" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} />
                  Express Delivery (+Rs. 1,500.00)
                </label>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold text-blue-600 pt-2">
              <span>Total</span>
              <span>THB {finalTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mt-8 space-y-3">
             <label className="flex items-center p-3 border rounded bg-white cursor-pointer">
                <input type="radio" name="paymentMethod" value="direct-bank" checked={formData.paymentMethod === 'direct-bank'} onChange={handleInputChange} className="mr-2" />
                <span className="text-sm font-bold">Direct Bank Transfer</span>
             </label>
             <label className="flex items-center p-3 border rounded bg-white cursor-pointer">
                <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="mr-2" />
                <span className="text-sm font-bold">Cash on Delivery</span>
             </label>
          </div>

          <button 
            type="submit" 
            className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
          >
            PAY NOW THB {finalTotal.toLocaleString()}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Checkout;