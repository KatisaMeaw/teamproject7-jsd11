import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const apiBase = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name: "",
    nickName: "",
    gender: "",
    country: "",
    language: "",
    timeZone: "",
    email: "",
    profileImage: null, // เก็บ URL ของรูปที่อัปโหลด
  });

  useEffect(() => {
    if (!userId) return;
    const fetchUserData = async () => {
      try {
        axios.defaults.withCredentials = true;

        const url = `${apiBase}/users/${userId}`;

        const response = await axios.get(url);
        const userData = response.data.data || response.data; // กันพลาดตำแหน่งข้อมูล

        setFormData((prev) => ({
          ...prev,
          name: userData.name || "",
          email: userData.email || "",
          nickName: userData.nickName || "",
          gender: userData.gender || "",
          country: userData.country || "",
          language: userData.language || "",
          timeZone: userData.timeZone || "",
        }));
      } catch (error) {
        console.error("❌ ดึงข้อมูลไม่สำเร็จ:", error);
      }
    };

    fetchUserData();
  }, [apiBase, userId]);

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

  const handleSave = async () => {
    try {
      if (!userId) {
        alert("ไม่พบ User ID");
        return;
      }
      const url = `${apiBase}/users/${userId}`;
      const response = await axios.patch(url, formData);

      if (response.data.success) {
        alert("บันทึกข้อมูลเรียบร้อยแล้ว! 🎉");
      }
    } catch (error) {
      console.error("Update Failed:", error);
      alert(
        "เกิดข้อผิดพลาดในการบันทึก: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10">
        {/* Header Section: Mobile = Column/Center, Desktop = Row/Between */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="relative group cursor-pointer shrink-0">
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <label htmlFor="profile-upload" className="cursor-pointer block">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 flex items-center justify-center relative">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-400"
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

              {/* Icon กล้องถ่ายรูป ปรับตำแหน่งให้สวยขึ้น */}
              <label
                htmlFor="profile-upload"
                className="absolute bottom-1 right-1 bg-white border border-gray-200 rounded-full p-2 shadow-sm cursor-pointer hover:bg-gray-50 text-blue-600"
              >
                <svg
                  className="w-4 h-4"
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
                {formData.name || "Your Name"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {formData.email || "email@example.com"}
              </p>
            </div>
          </div>

          {/* Save Button: Mobile = Full Width, Desktop = Auto */}
          <button
            onClick={handleSave}
            className="w-full md:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition shadow-sm active:scale-95 transform"
          >
            Save Changes
          </button>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium text-sm">Nick Name</label>
            <input
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              placeholder="Enter your nickname"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium text-sm">Gender</label>
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {/* Custom Arrow Icon for consistency */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium text-sm">Country</label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
              >
                <option value="">Select Country</option>
                <option value="Thailand">Thailand</option>
                <option value="USA">USA</option>
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium text-sm">Language</label>
            <div className="relative">
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
              >
                <option value="">Select Language</option>
                <option value="Thai">Thai</option>
                <option value="English">English</option>
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium text-sm">Time Zone</label>
            <div className="relative">
              <select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
              >
                <option value="">Select Time Zone</option>
                <option value="GMT+7">GMT+7</option>
                <option value="GMT+0">GMT+0</option>
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div>
          <h3 className="text-gray-900 font-bold mb-4 text-lg">My Email Address</h3>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>

            <div className="w-full">
              <label className="text-xs text-gray-500 block mb-1 font-medium">
                Primary Email
              </label>
              <div className="text-gray-900 font-medium break-all">
                  {formData.email || "No email provided"}
              </div>
            </div>
            <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                Verified
            </div>
          </div>

          <button
            type="button"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 border border-dashed border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition mt-2"
            onClick={() => alert("ฟีเจอร์เพิ่มอีเมลสำรอง (ยังไม่ได้ทำ)")}
          >
            <span className="text-xl leading-none font-bold text-gray-400">+</span> 
            <span>Add Email Address</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
