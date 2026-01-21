import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTabs from "./OrderTabs.jsx";
import { ChevronDown, ChevronUp } from "lucide-react"; // แนะนำให้ลงเพิ่ม: npm install lucide-react

const API_URL = import.meta.env.VITE_API_URL;

const OrderHistoryCard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openOrderId, setOpenOrderId] = useState(null); // เก็บ ID ของออเดอร์ที่กำลังเปิดอยู่

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${API_URL}/orders/me`, { withCredentials: true });
                setOrders(response.data.orders || response.data.data || []);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const toggleOrder = (id) => {
        setOpenOrderId(openOrderId === id ? null : id);
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <OrderTabs />

            {orders.map((order) => (
                <div key={order._id} className="border border-[#E4E7E9] mb-6 mt-10 overflow-hidden rounded-sm">
                    
                    {/* ส่วนหัว (Header) - คลิกเพื่อ Dropdown */}
                    <div 
                        className="flex justify-between items-center bg-[#FDFAE7] border-b border-[#F8EBAA] p-6 cursor-pointer hover:bg-[#fffdf0] transition-colors"
                        onClick={() => toggleOrder(order._id)}
                    >
                        <div className="flex gap-6 items-center text-xl font-medium">
                            <span className="text-gray-800 font-bold">#{order._id.slice(-8).toUpperCase()}</span>
                            <div className="text-sm font-normal text-gray-500">
                                {order.orderItems?.length} Products • Order Placed in {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-2xl font-bold text-[#447F98]">
                                THB {order.totalPrice?.toLocaleString()}
                            </div>
                            {openOrderId === order._id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </div>
                    </div>

                    {/* ส่วนเนื้อหา (Content) - จะแสดงเมื่อมีการเลือก ID นี้ */}
                    {openOrderId === order._id && (
                        <div className="p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                            <p className="text-sm mb-6">Order expected arrival <span className="font-bold">23 Jan, 2026</span></p>
                            
                            <h2 className="text-lg font-bold mb-4">Product <span className="text-gray-400 font-normal">({order.orderItems?.length.toString().padStart(2, '0')})</span></h2>

                            {/* Header ตารางสินค้า */}
                            <div className="grid grid-cols-4 p-3 bg-[#F2F4F5] text-[12px] font-bold text-[#475156] mb-4">
                                <p>PRODUCTS</p>
                                <p>PRICE</p>
                                <p>QUANTITY</p>
                                <p>SUB-TOTAL</p>
                            </div>

                            {/* รายการสินค้า */}
                            {order.orderItems?.map((item, idx) => (
                                <div key={idx} className="grid grid-cols-4 items-center py-4 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-md" />
                                        <div>
                                            <p className="text-[#447F98] font-bold text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-400">Stylish comfy chair</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">THB {item.price?.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500 font-medium">x{item.quantity}</p>
                                    <p className="text-sm font-bold text-gray-900">THB {(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}

                            {/* ส่วนท้าย - Address Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 mt-6 border-t border-gray-100">
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Billing Address</h3>
                                    <p className="text-sm font-bold">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                        {order.shippingAddress?.address}, {order.shippingAddress?.city} {order.shippingAddress?.postalCode} {order.shippingAddress?.country}
                                    </p>
                                    <p className="text-sm mt-2 font-medium">Phone: <span className="text-gray-500 font-normal">{order.shippingAddress?.phone}</span></p>
                                    <p className="text-sm font-medium">Email: <span className="text-gray-500 font-normal">{order.shippingAddress?.email}</span></p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
                                    <p className="text-sm font-bold">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                        {order.shippingAddress?.address}, {order.shippingAddress?.city} {order.shippingAddress?.postalCode} {order.shippingAddress?.country}
                                    </p>
                                    <p className="text-sm mt-2 font-medium">Phone: <span className="text-gray-500 font-normal">{order.shippingAddress?.phone}</span></p>
                                    <p className="text-sm font-medium">Email: <span className="text-gray-500 font-normal">{order.shippingAddress?.email}</span></p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-4">Order Notes</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        No additional notes provided for this order.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderHistoryCard;