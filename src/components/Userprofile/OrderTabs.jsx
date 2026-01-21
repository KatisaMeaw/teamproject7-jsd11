import React from "react";

const OrderTabs = ({ activeTab, onTabChange, orders = [] }) => { // กำหนดค่าเริ่มต้นเป็น []

  const getCount = (id) => {
    if (!orders) return 0; // ป้องกัน error ถ้า orders เป็น null/undefined
    if (id === "all") return orders.length;
    if (id === "completed") return orders.filter(o => o.status === "Delivered").length;
    if (id === "pending") return orders.filter(o => o.status === "Pending").length;
    if (id === "cancelled") return orders.filter(o => o.status === "Cancelled").length;
    return 0;
  };

  const tabs = [
    { id: "all", label: "All order", count: getCount("all") },
    { id: "completed", label: "Completed", count: getCount("completed") },
    { id: "pending", label: "Pending", count: getCount("pending") },
    { id: "cancelled", label: "Cancelled", count: 0 },
  ];

  return (
    <div className="flex bg-[#D6EBF3] p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)} // ส่งค่ากลับไปหน้าหลัก
          className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
          {tab.count > 0 && (
            <span className={`ml-1 ${activeTab === tab.id ? 'text-green-600' : ''}`}>
              ({tab.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default OrderTabs;