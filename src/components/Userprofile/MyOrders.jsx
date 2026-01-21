import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import OrderTabs from "./OrderTabs.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CartContext } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

const OrderHistoryCard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrderId, setOpenOrderId] = useState(null);
  const { isLoggedIn, loading: authLoading } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      // 1. ถ้าสถานะ Auth กำลังโหลด ให้รอการทำงานก่อน
      if (authLoading) return;

      // 2. ถ้าไม่ได้ Login ให้เคลียร์ข้อมูลและเลิกโหลด
      if (!isLoggedIn) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/orders/me`, {
          withCredentials: true,
        });
        // ✅ ป้องกัน Error ถ้า API ตอบกลับมาไม่มี data
        const data = response.data.orders || response.data.data || [];
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn, authLoading]);

  // กรองข้อมูลตาม Tab และป้องกัน orders เป็น undefined
  const filteredOrders = (orders || []).filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return order.status === "Delivered";
    if (activeTab === "pending")
      return order.status === "Pending" || order.status === "Processing";
    if (activeTab === "cancelled") return order.status === "Cancelled";
    return true;
  });

  const toggleOrder = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  const handleCancelOrder = async (e, orderId) => {
    e.stopPropagation(); // ป้องกันไม่ให้ Dropdown ปิดตอนกดยกเลิก

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const response = await axios.patch(
        `${API_URL}/orders/${orderId}/cancel`,
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        alert("Order cancelled successfully");

        // อัปเดต State แบบไม่ต้องรีโหลดหน้าจอ (Manual Update)
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Cancelled" } : order,
          ),
        );
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert(error.response?.data?.message || "Failed to cancel order");
    }
  };
  // แสดง Loading ระหว่างรอ Auth หรือรอ Data
  if (authLoading || (loading && orders.length === 0)) {
    return (
      <div className="p-20 text-center text-gray-500">
        Loading your orders...
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="p-4 text-center py-20 text-gray-500">
        Please log in to view your order history.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* ส่วนหัว Tab */}
      <OrderTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        orders={orders || []} // ส่งเป็น Array ว่างเสมอถ้าไม่มีข้อมูล
      />

      {/* รายการ Order */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="border border-[#E4E7E9] mb-6 mt-6 overflow-hidden rounded-sm"
          >
            {/* Header ของแต่ละ Order */}
            <div
              className={`flex justify-between items-center p-6 cursor-pointer transition-all duration-200 
                ${openOrderId === order._id ? "bg-[#F2F4F5] border-b" : "bg-white hover:bg-[#F9FBFC]"}`}
              onClick={() => toggleOrder(order._id)}
            >
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-[#191C1F] font-bold">
                  #{order._id?.slice(-8).toUpperCase()}
                </span>
                <div className="text-sm text-[#5F6C72]">
                  {/* ใช้ Optional Chaining ป้องกัน Error length */}
                  {order.orderItems?.length || 0} Products •{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </div>
                <span
                  className={`text-[10px] uppercase px-2.5 py-0.5 rounded-full font-bold ${
                    order.status === "Delivered" || order.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-[#2484A2]"
                  }`}
                >
                  {order.status}
                </span>

                {/* ปุ่ม Cancel Order: จะแสดงเฉพาะเมื่อสถานะเป็น Pending เท่านั้น */}
                {order.status === "Pending" && (
                  <button
                    onClick={(e) => handleCancelOrder(e, order._id)}
                    className="text-[10px] font-bold text-red-500 border border-red-200 px-2 py-0.5 rounded hover:bg-red-50 transition-colors"
                  >
                    CANCEL ORDER
                  </button>
                )}
              </div>

              <div className="flex items-center gap-6">
                <div className="text-xl font-bold text-[#2484A2]">
                  THB {order.totalPrice?.toLocaleString() || 0}
                </div>
                {openOrderId === order._id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </div>

            {/* รายละเอียดสินค้าภายใน (Dropdown) */}
            {openOrderId === order._id && (
              <div className="p-6 bg-white animate-in slide-in-from-top-2 duration-200">
                <div className="hidden md:grid grid-cols-4 p-3 bg-[#F2F4F5] text-[12px] font-bold text-[#475156] mb-4">
                  <p>PRODUCTS</p>
                  <p>PRICE</p>
                  <p>QUANTITY</p>
                  <p>SUB-TOTAL</p>
                </div>

                {order.orderItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-4 items-center py-4 border-b last:border-0 gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt=""
                        className="w-16 h-16 object-cover rounded-md bg-gray-100"
                      />
                      <div>
                        <p className="text-[#447F98] font-bold text-sm">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">
                      THB {item.price?.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                    <p className="text-sm font-bold">
                      THB {(item.price * item.quantity)?.toLocaleString()}
                    </p>
                  </div>
                ))}

                {/* ที่อยู่จัดส่ง */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 mt-6 border-t">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      Shipping Address
                    </h3>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress?.firstName}{" "}
                      {order.shippingAddress?.lastName}
                      <br />
                      {order.shippingAddress?.address},{" "}
                      {order.shippingAddress?.city}{" "}
                      {order.shippingAddress?.postalCode}
                      <br />
                      {order.shippingAddress?.country}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="mt-20 text-center text-gray-500">
          No orders found in "{activeTab}" category.
        </div>
      )}
    </div>
  );
};

export default OrderHistoryCard;
