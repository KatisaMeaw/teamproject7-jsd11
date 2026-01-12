import React ,{useState} from "react";

const  OrderTabs = () => {
  // สร้าง State เพื่อจำว่าตอนนี้แท็บไหนถูกเลือกอยู่
  const [activeTab, setActiveTab] = useState("all");
  const tabs = [
    { id: "all", label: "All order", count: 120 },
    { id: "completed", label: "Completed", count: null },
    { id: "pending", label: "Pending", count: null },
    { id: "cancleed", label: "Cancled", count: null },
  ];
  return (
    // Main Container
    <div className="flex bg-[#D6EBF3] p-1 rounded-lg w-fit">
      {/* ลองวนลูปแสดงชื่อเมนูออกมาก่อน เพื่อเช็คว่าข้อมูลมาถูกต้อง */}
      {tabs.map((tab) => (
        <button
          key={tab.id}
          // 3. เมื่อคลิก ให้สั่ง set ค่า activeTab เป็น id ของปุ่มนั้น
          onClick={() => setActiveTab(tab.id)}
          // 4. ใช้ Javascript เขียนเงื่อนไขใน className (Conditional Styling)
          className={`
            px-6 py-2 text-sm font-medium rounded-md transition-all
            ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm" // ถ้าถูกเลือก: พื้นขาว ตัวหนังสือเข้ม มีเงา
                : "text-gray-500 hover:text-gray-700" // ถ้าไม่ถูกเลือก: สีเทา
            }
          `}
        >
          {tab.label}
            {/* ใส่สีของตัวเลข*/}
          {tab.count && (
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
