
import React, { useState } from "react";
// Import icons
import {
  MdOutlineShoppingCart,
  MdSupportAgent,
  MdOutlineLogout,
} from "react-icons/md";
import { FaHome, FaRegHeart } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { HiOutlineTicket, HiArchive } from "react-icons/hi";
import { BsCreditCard } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

const SidebarUser = () => {
  // สร้าง State เพื่อเก็บว่าหน้าไหน Active อยู่ (ตัวอย่างให้ Profile เป็นหน้าแรก)
  const [activeMenu, setActiveMenu] = useState("");

  const mainMenuItem = [
    // แก้ไข: เก็บชื่อ Component เฉยๆ ไม่ต้องมี < />
    { name: "Profile", icon: FaHome },
    { name: "My Order", icon: MdOutlineShoppingCart },
    { name: "Address", icon: LuMapPin },
    { name: "Coupon Code", icon: HiOutlineTicket },
    { name: "Archived orders", icon: HiArchive },
    { name: "Payments", icon: BsCreditCard },
    { name: "Saved Items", icon: FaRegHeart },
    { name: "Login & Security", icon: CiSettings },
  ];

  const subMenuItem = [
    { name: "Customer Support", icon: MdSupportAgent },
    { name: "Logout", icon: MdOutlineLogout },
  ];

  return (
    <aside className="w-64 bg-white border-2 border-gray-100 min-h-screen p-6">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">Welcome, Alexa</h2>
          <p className="text-sm font-light text-gray-500">
            Tue, 01 December 2025
          </p>
        </div>

        {/* MenuBar */}
        <nav className="space-y-2">
          {mainMenuItem.map((item) => {
            // สร้างตัวแปรเช็คว่า item นี้คือตัวที่ active อยู่หรือไม่
            const isActive = activeMenu === item.name;
            
            return (
              <a
                key={item.name}
                href="#"
                // เพิ่ม onClick เพื่อเปลี่ยน state เมื่อกด
                onClick={(e) => {
                    e.preventDefault(); // ป้องกัน link refresh หน้า
                    setActiveMenu(item.name);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                {/* เรียกใช้ Component Icon อย่างถูกต้อง */}
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        {subMenuItem.map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
          >
            {/* เรียกใช้ Component Icon อย่างถูกต้อง */}
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default SidebarUser;