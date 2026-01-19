import { useState } from "react";
import { useCart } from "../hooks/useCart";
import SubNavbar from "../components/SubNavbar";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import axios from "axios";

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  ...props
}) => (
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
  const { cartItems, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
    paymentMethod: "direct-bank",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [loading, setLoading] = useState(false);
  const shippingCost = shippingMethod === "express" ? 1500 : 0;
  const finalTotal = (subtotal || 0) + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation เบื้องต้น
    if (cartItems.length === 0) {
      alert("ตะกร้าของคุณยังไม่มีสินค้า กรุณาเลือกสินค้าก่อนชำระเงิน");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก");
      return;
    }

    // ✅ ปรับโครงสร้างข้อมูลให้ตรงกับ Order Schema ของคุณ
    const orderData = {
      // 1. เชื่อมโยงผู้ใช้ (ถ้ายังไม่ทำระบบ Login ให้ส่งเป็น null หรือค่าที่เหมาะสม)
      user: user.id, //

      // 2. รายการสินค้า (map ให้ตรงกับ schema ของ orderItems)
      orderItems: cartItems.map((item) => {
        const productId = item._id || item.id; // ดึง ObjectId มา

        return {
          product: productId, // ✅ ต้องส่ง ID นี้ไป (Required)
          name: item.name,    //
          quantity: Number(item.quantity || 1), //
          image: item.image,  //
          price: Number(item.price || 0), //
        };
      }),

      // 3. ที่อยู่จัดส่ง
      shippingAddress: {
        address: formData.streetAddress,
        city: formData.city,
        postalCode: formData.postalCode,
        country: "Thailand",
      },

      // 4. สรุปยอดเงินและสถานะ
      totalPrice: Number(finalTotal || 0),
      isPaid: false,      // ค่าเริ่มต้นตาม Schema
      status: "Pending",  // ค่าเริ่มต้นตาม Schema

      // ข้อมูลเพิ่มเติม (ถ้า Backend ไม่ได้กำหนดใน Schema จะไม่ถูกบันทึก)
      paymentMethod: formData.paymentMethod,
      additionalInfo: formData.additionalInfo,
    };

    setLoading(true);

    try {
      // ✅ ใช้ axios.post ตามที่คุณต้องการ
      const response = await axios.post(
        "http://localhost:3000/api/v1/orders",
        orderData
      );

      if (response.status === 200 || response.status === 201) {
        alert("สั่งซื้อสำเร็จ!");
        if (clearCart) clearCart();
        window.location.href = "/";
      }
    } catch (error) {
      // ✅ จัดการ Error แบบ axios
      const errorMessage = error.response?.data?.message || "ข้อมูลไม่ครบถ้วน หรือระบบมีปัญหา";

      // ถ้า Error บอกว่าขาด product แสดงว่า ID ในตะกร้าหาย
      if (errorMessage.includes("product")) {
        alert("เกิดข้อผิดพลาด: ข้อมูลสินค้าในตะกร้าไม่สมบูรณ์ กรุณาล้างตะกร้าแล้วเลือกสินค้าใหม่อีกครั้ง");
      } else {
        alert("เกิดข้อผิดพลาด: " + errorMessage);
      }
      console.error("Checkout Error:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-12"
        >
          {/* Billing Details */}
          <div className="lg:w-3/5">
            <h2 className="text-3xl font-medium mb-10">Billing details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <FormInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <FormInput
              label="Company Name (Optional)"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
            <FormInput
              label="Street address"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Town / City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Postcode / ZIP"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Additional information
              </label>
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
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    {/* ✅ เพิ่ม Safety check เพื่อไม่ให้หน้าจอขาว (Crash) */}
                    THB{" "}
                    {(
                      Number(item.price || 0) * Number(item.quantity || 0)
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3 font-medium">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>THB {(subtotal || 0).toLocaleString()}</span>
              </div>
              <div className="py-4 border-y border-gray-200">
                <p className="font-bold mb-2">Shipping</p>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer text-sm">
                    <input
                      type="radio"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="mr-2"
                    />
                    Free Delivery
                  </label>
                  <label className="flex items-center cursor-pointer text-sm">
                    <input
                      type="radio"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="mr-2"
                    />
                    Express Delivery (+THB 1,500)
                  </label>
                </div>
              </div>
              <div className="flex justify-between text-2xl font-bold text-blue-600 pt-2">
                <span>Total</span>
                <span>THB {(finalTotal || 0).toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className={`w-full mt-8 font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 
                ${
                  loading || cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#447F98] hover:bg-[#5591A9] text-white cursor-pointer"
                }`}
            >
              {loading
                ? "PROCESSING..."
                : `PAY NOW THB ${(finalTotal || 0).toLocaleString()}`}
            </button>
          </div>
        </form>
      </main>
      <SubFooter />
      <Footer />
    </>
  );
};

export default Checkout;
