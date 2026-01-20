import React, { useState, useEffect } from "react";
import axios from "axios";
// Import icons
import {
  MdOutlineShoppingCart,
  MdSupportAgent,
  MdOutlineLogout,
  MdClose,
} from "react-icons/md";
import { FaHome, FaRegHeart } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { HiOutlineTicket, HiArchive } from "react-icons/hi";
import { BsCreditCard } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import Profile from "./Profile.jsx";
import MyOrders from "./MyOrders.jsx";
import { useOutletContext } from "react-router-dom";

const SidebarUser = () => {
  const [activeMenu, setActiveMenu] = useState("Profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState(""); // ค่าเริ่มต้น
  const { logout } = useOutletContext();
  const apiBase =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

  const [currentDate] = useState(() => {
    const date = new Date();
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  });
  // ส่วนที่ 2: ดึงข้อมูล User (ทำงานครั้งเดียว และแก้ Infinite Loop แล้ว)
  useEffect(() => {
    const fetchUserData = async () => {

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token"); // เก็บไว้เผื่อมี แต่ไม่บังคับ


      // แก้ไข: เช็คแค่ userId ก็พอ ถ้าไม่มี userId ถึงจะหยุด
      if (!userId) {
        setUserName("Guest");
        return;
      }

      // สำคัญมาก: เปิดให้ส่ง Cookie ไปกับ Request
      axios.defaults.withCredentials = true;

      const url = `${apiBase}/users/${userId}`;

      try {
        // สร้าง config สำหรับ axios
        const config = {};
        // ถ้าบังเอิญมี token ก็ใส่ไป (เผื่อไว้) แต่ถ้าไม่มีก็ไม่ใส่
        if (token) {
          config.headers = { Authorization: `Bearer ${token}` };
        }

        const response = await axios.get(url, config);


        const userData = response.data.data || response.data;
        if (userData && userData.name) {
          setUserName(userData.name);
        }
      } catch (error) {
        // ถ้า Error 401 แสดงว่า Cookie หมดอายุ
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };

    fetchUserData();
  }, [apiBase, logout]);

  const mainMenuItem = [
    // แก้ไข: เก็บชื่อ Component เฉยๆ ไม่ต้องมี <div />
    { name: "Profile", icon: FaHome },
    { name: "My Orders", icon: MdOutlineShoppingCart },
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
  const renderContent = () => {
    switch (activeMenu) {
      case "Profile":
        return <Profile />;
      case "My Orders":
        return <MyOrders />;

      default:
        return <Profile />;
    }
  };
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar (ASIDE) */}
      <aside
        className={`
         fixed md:sticky
     md:top-16
    h-[calc(100vh-4rem)]
    bg-white shadow-xl md:shadow-none p-6
    overflow-y-auto
    transition-transform duration-300 ease-in-out z-40
    w-100 top-16 left-0
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Welcome, {userName}
              </h2>
              <p className="text-sm font-light text-gray-500">{currentDate}</p>
            </div>
            <button
              onClick={closeMobileMenu}
              className="md:hidden p-2 bg-gray-100 rounded-full text-gray-600"
            >
              <MdClose size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {mainMenuItem.map((item) => {
              const isActive = activeMenu === item.name;
              return (
                <a
                  key={item.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMenu(item.name);
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200
                    ${isActive ? "bg-[#447F98] text-white shadow-md" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="border-t border-gray-200 pb-32 pt-4 space-y-2 mt-4">
            {subMenuItem.map((item) => (
              <a
                key={item.name}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.name === "Logout") logout();
                  closeMobileMenu();
                }}
                className="flex items-center gap-3 px-4 py-3  rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="p-4 md:p-6 pb-24">
          <div className="md:hidden sticky top-0 z-30 flex justify-end items-center bg p-4 rounded-t-xl   mb-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-black-600 hover:bg-[#447F98] rounded-lg focus:outline-none transition-colors"
            >
              <CiSettings size={28} />
            </button>
          </div>

          <div className="bg-white md:bg-transparent rounded-b-xl md:rounded-none shadow-sm md:shadow-none">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SidebarUser;
