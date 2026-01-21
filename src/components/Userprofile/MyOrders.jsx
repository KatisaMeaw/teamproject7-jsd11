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

  // เพิ่ม State สำหรับจัดการ Tab
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      if (authLoading) return;
      if (!isLoggedIn) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/orders/me`, {
          withCredentials: true,
        });
        setOrders(response.data.orders || response.data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 401) {
          setOrders([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn, authLoading]);

  // กรองข้อมูลตาม Tab ที่เลือก
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return order.status === "Delivered";
    if (activeTab === "pending") return order.status === "Pending";
    if (activeTab === "cancelled") return order.status === "Cancelled";
    return true;
  });

  const toggleOrder = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  if (!isLoggedIn && !authLoading) {
    return (
      <div className="p-4 text-center py-20 text-gray-500">
        Please log in to view your order history.
      </div>
    );
  }

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* ส่ง Props ไปยัง OrderTabs */}
      <OrderTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        orders={orders}
      />

      {/* เปลี่ยนจาก orders.map เป็น filteredOrders.map */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="border border-[#E4E7E9] mb-6 mt-10 overflow-hidden rounded-sm"
          >
            {/* ส่วนหัว (Header) */}
            <div
              className={`flex justify-between items-center p-6 cursor-pointer transition-all duration-200 
        ${
          openOrderId === order._id
            ? "bg-[#F2F4F5] border-b border-[#E4E7E9]" // เมื่อเปิด: พื้นหลังเทาอ่อนเพื่อให้เห็นขอบชัด
            : "bg-white hover:bg-[#F9FBFC]" // เมื่อปิด: สีขาวสะอาดตา
        }`}
              onClick={() => toggleOrder(order._id)}
            >
              <div className="flex gap-6 items-center text-xl font-medium">
                <span className="text-[#191C1F] font-bold">
                  #{order._id.slice(-8).toUpperCase()}
                </span>
                <div className="text-sm font-normal text-[#5F6C72]">
                  {order.orderItems?.length} Products •{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                {/* ปรับแต่ง Badge สถานะให้ดูสวยขึ้น */}
                <span
                  className={`text-[10px] uppercase px-2.5 py-0.5 rounded-full font-bold shadow-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-[#2484A2]"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-2xl font-bold text-[#2484A2]">
                  {" "}
                  {/* ใช้สีฟ้าโทนเดียวกับ Sidebar */}
                  THB {order.totalPrice?.toLocaleString()}
                </div>
                <div className="text-[#929FA5]">
                  {openOrderId === order._id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>
            </div>

            {/* ส่วนเนื้อหา (Content) */}
            {openOrderId === order._id && (
              <div className="p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-sm mb-6">
                  Order Status:{" "}
                  <span className="font-bold">{order.status}</span>
                </p>

                <h2 className="text-lg font-bold mb-4">
                  Product{" "}
                  <span className="text-gray-400 font-normal">
                    ({order.orderItems?.length.toString().padStart(2, "0")})
                  </span>
                </h2>

                <div className="grid grid-cols-4 p-3 bg-[#F2F4F5] text-[12px] font-bold text-[#475156] mb-4">
                  <p>PRODUCTS</p>
                  <p>PRICE</p>
                  <p>QUANTITY</p>
                  <p>SUB-TOTAL</p>
                </div>

                {order.orderItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 items-center py-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt=""
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-[#447F98] font-bold text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          Standard Quality Item
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      THB {item.price?.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      x{item.quantity}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      THB {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 mt-6 border-t border-gray-100">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Billing Address</h3>
                    <p className="text-sm font-bold">
                      {order.shippingAddress?.firstName}{" "}
                      {order.shippingAddress?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                      {order.shippingAddress?.address},{" "}
                      {order.shippingAddress?.city}{" "}
                      {order.shippingAddress?.postalCode}{" "}
                      {order.shippingAddress?.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
                    <p className="text-sm font-bold">
                      {order.shippingAddress?.firstName}{" "}
                      {order.shippingAddress?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                      {order.shippingAddress?.address},{" "}
                      {order.shippingAddress?.city}{" "}
                      {order.shippingAddress?.postalCode}{" "}
                      {order.shippingAddress?.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Order Notes</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {order.orderNotes || "No additional notes provided."}
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
