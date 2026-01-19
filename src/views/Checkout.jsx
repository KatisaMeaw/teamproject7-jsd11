import { useState } from 'react';
import { useCart } from "../hooks/useCart"; // ดึงจาก Hook ตามมาตรฐานที่เราทำไว้
import SubNavbar from '../components/SubNavbar';
import SubFooter from '../components/SubFooter';
import Footer from '../components/Footer';

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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  // --- 1. ตรวจสอบเบอร์โทรและรหัสไปรษณีย์ก่อนส่ง ---
  if (formData.phone.length !== 10) {
    alert("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก");
    return;
  }
  if (formData.postalCode.length !== 5) {
    alert("กรุณากรอกรหัสไปรษณีย์ให้ครบ 5 หลัก");
    return;
  }

  // --- 2. เตรียมข้อมูลส่ง Backend (image_6ae7e7.png) ---
  const orderData = {
    orderItems: cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      image: item.image,
      price: Number(item.price),
      product: item.id
    })),
    shippingAddress: {
      address: formData.streetAddress,
      city: formData.city,
      postalCode: formData.postalCode, // ดึงจากช่องที่เพิ่งเพิ่มในหน้าจอจริง
      country: "Thailand"
    },
    totalPrice: finalTotal
  };

    try {
    // ตรวจสอบ URL: ต้องมี /v1 ตามโครงสร้าง Folder routes ของคุณ
    const response = await fetch('http://localhost:3000/api/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

      const data = await response.json();

      if (response.ok) {
        alert("สั่งซื้อสำเร็จ!");
        window.location.href = "/";
      } else {
        alert("เกิดข้อผิดพลาด: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถติดต่อ Server ได้");
    }
  };

  return (
    <>
    <SubNavbar/>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">

        {/* Billing Details */}
        <div className="lg:w-3/5">
          <h2 className="text-3xl font-medium mb-10">Billing details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          </div>
          <FormInput label="Company Name (Optional)" name="companyName" value={formData.companyName} onChange={handleInputChange} />
          <FormInput label="Street address" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} required />
          <FormInput label="Town / City" name="city" value={formData.city} onChange={handleInputChange} required />
          <FormInput label="Postcode / ZIP" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
          <FormInput label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
          <FormInput label="Email address" name="email" type="email" value={formData.email} onChange={handleInputChange} required />

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Additional information</label>
            <textarea
              name="additionalInfo"
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-1 focus:ring-blue-500 outline-none h-32"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-2/5 bg-gray-50 p-8 rounded-lg border shadow-sm h-fit">
          <h3 className="text-xl font-bold mb-6 border-b pb-4">Your Order</h3>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} x {item.quantity}</span>
                <span className="font-medium">THB {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3 font-medium">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>THB {subtotal.toLocaleString()}</span>
            </div>

            <div className="py-4 border-y border-gray-200">
              <p className="font-bold mb-2">Shipping</p>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer text-sm">
                  <input type="radio" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="mr-2" />
                  Free Delivery
                </label>
                <label className="flex items-center cursor-pointer text-sm">
                  <input type="radio" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="mr-2" />
                  Express Delivery (+THB 1,500)
                </label>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold text-blue-600 pt-2">
              <span>Total</span>
              <span>THB {finalTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-[#447F98] hover:bg-[#5591A9] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 cursor-pointer">
            PAY NOW THB {finalTotal.toLocaleString()}
          </button>
        </div>
      </form>
    </main>
    <SubFooter/>
    <Footer/>
    </>
  );
};

export default Checkout;