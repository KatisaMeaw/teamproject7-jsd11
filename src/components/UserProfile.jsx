import React from "react";

 const UserProfile = () => {
  return (
    <div className="min-h-screen bg-white p-8 flex justify-center">
      <div className="w-full max-w-5xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
              <img 
                src="" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Alexa Rawles</h1>
              <p className="text-gray-500">alexarawles@gmail.com</p>
            </div>
          </div>
          
          <button className="mt-4 md:mt-0 px-6 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-medium transition">
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
          
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Full Name</label>
            <input 
              type="text" 
              placeholder="Your First Name" 
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Nick Name</label>
            <input 
              type="text" 
              placeholder="Your First Name" 
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Gender</label>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
                <option>Your First Name</option> 
                <option>Male</option>
                <option>Female</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Country</label>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
                <option>Your First Name</option>
                <option>Thailand</option>
                <option>USA</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Language</label>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
                <option>Your First Name</option>
                <option>English</option>
                <option>Thai</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Time Zone</label>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
                <option>Your First Name</option>
                <option>GMT+7</option>
                <option>GMT+0</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

        </div>

        <div>
          <h3 className="text-gray-900 font-bold mb-4">My email Address</h3>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            </div>
            <div>
              <p className="text-gray-900 font-medium">alexarawles@gmail.com</p>
              <p className="text-gray-400 text-sm">1 month ago</p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-500 font-medium rounded-lg hover:bg-blue-100 transition">
            <span className="text-lg leading-none">+</span> Add Email Address
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserProfile