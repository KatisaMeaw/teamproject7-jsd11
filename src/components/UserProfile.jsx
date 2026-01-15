import React, { useState, useEffect } from "react";
import { useNavigate ,useOutletContext} from "react-router-dom";

const UserProfile = () => {
  // 1. ดึงข้อมูล User และสถานะการโหลดมาจาก Layout (ตัวแม่)
  const { user, authLoading } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    nickName: "",
    gender: "",
    country: "",
    language: "",
    timeZone: "",
    email: "",
    profileImage: null,
  });

  // 2. useEffect สำหรับเช็คว่า Login หรือยัง (แก้ปัญหาหน้าจอค้าง)
  useEffect(() => {
    // ถ้า "โหลดเสร็จแล้ว" (!authLoading) แต่ "ไม่มีข้อมูล user" (!user) แสดงว่ายังไม่ Login
    if (!authLoading && !user) {
      alert("กรุณาเข้าสู่ระบบก่อนใช้งาน!");
      navigate("/"); // ดีดกลับไปหน้าแรก หรือหน้า Login
    }
  }, [authLoading, user, navigate]); // ✅ ใส่ Dependency Array ป้องกันการวนลูป

  // 3. useEffect สำหรับดึงข้อมูล User มาใส่ในฟอร์มอัตโนมัติ
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",   // ดึงชื่อจาก Backend
        email: user.email || "",     // ดึงอีเมลจาก Backend
        // ถ้า Backend ส่งข้อมูลอื่นมาด้วย ก็ใส่เพิ่มตรงนี้ได้ครับ
      }));
    }
  }, [user]);
  // 2. ฟังก์ชันจัดการการอัปโหลดรูป
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        profileImage: imageUrl,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("Data to save:", formData);
    alert("บันทึกข้อมูลแล้ว");
  };

  return (
    <div className="min-h-screen bg-white p-8 flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <label htmlFor="profile-upload" className="cursor-pointer block">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center relative">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white text-xs font-medium">
                      Change
                    </span>
                  </div>
                </div>
              </label>

              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm cursor-pointer hover:bg-gray-50"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </label>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.fullName || "Your Name"}
              </h1>
              <p className="text-gray-500">
                {formData.email || "email@example.com"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-4 md:mt-0 px-6 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-medium transition"
          >
            Save Changes
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Nick Name</label>
            <input
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              placeholder="Enter your nickname"
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Gender</label>
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Country</label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                <option value="">Select Country</option>
                <option value="Thailand">Thailand</option>
                <option value="USA">USA</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Language</label>
            <div className="relative">
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                <option value="">Select Language</option>
                <option value="Thai">Thai</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Time Zone</label>
            <div className="relative">
              <select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                <option value="">Select Time Zone</option>
                <option value="GMT+7">GMT+7</option>
                <option value="GMT+0">GMT+0</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-gray-900 font-bold mb-4">My Email Address</h3>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>

            <div className="w-full max-w-md">
              <label className="text-xs text-gray-400 block mb-1">
                Primary Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition mt-2"
            onClick={() => alert("ฟีเจอร์เพิ่มอีเมลสำรอง (ยังไม่ได้ทำ)")}
          >
            <span className="text-xl leading-none font-bold">+</span> Add Email
            Address
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
