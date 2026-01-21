import { Link } from "react-router-dom";
import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";

export function Navbar({logout,user}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 grid grid-cols-2 md:grid-cols-3 items-center shadow-md p-4 bg-white z-50">
      
      <div className="flex justify-start">
      <Link to="/" className="flex items-center">
        <img src="icon/Frame 281.png" alt="Logo" className="h-10" />
      </Link>
      </div>


      <ul className="hidden md:flex justify-center gap-12 lg:gap-28 text-shadow-none text-[#447F98] font-bold">
        <li>
          <Link to="/" className="hover:text-gray-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" className="hover:text-gray-500">
            Shop
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-500">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-500">
            Contact
          </Link>
        </li>
      </ul>



        {/* ส่วน Desktop Icons */}
      <div className="flex justify-end items-center gap-4">

      <div className="hidden md:flex items-center gap-4 lg:gap-6">

        {user && user.role === "admin" && (
    <Link
      to="/admin"
      className="p-2 px-4 rounded-full bg-red-100 text-red-600 hover:bg-red-200 font-bold flex items-center"
    >
      Admin Panel
    </Link>
  )}
        {user  ? ( <Link
          to="/userprofile"
          className="p-2 rounded-full text-gray-600 hover:bg-teal-100"
        >
          <img src="icon/mdi_account-alert-outline.png" alt="" />
        </Link>
        ) : (<Link
          to="/login"
          className="p-2 rounded-full text-gray-600 hover:bg-teal-100"
        >
          <img src="icon/mdi_account-alert-outline.png" alt="" />
        </Link>)}
        <a
          href="/shop"
          className="p-2 rounded-full text-gray-600 hover:bg-teal-100"
        >
          <img src="icon/akar-icons_search.png" alt="" />
        </a>
        
        
        <Link to="/cart"
          className="p-2 rounded-full text-gray-600 hover:bg-teal-100"
        >
          <img src="icon/ant-design_shopping-cart-outlined.png" alt="Cart" />
        </Link> 

        {user && (
          <button
            onClick={logout}
            className="group p-2 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors cursor-pointer"
          >
            <MdOutlineLogout className="w-6 h-6 text-[#629BB5] group-hover:text-red-500 transition-colors" />
          </button>
        )}
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-teal-600 focus:outline-none"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      </div>

     

      {/* ส่วน Mobile Nav */}
        <div className={`fixed inset-0 top-18 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-6 md:hidden z-50 transition-all duration-700 ease-in-out
          ${isOpen 
    ? "translate-x-0 opacity-100 visible animate-menu-slide" 
    : "translate-x-full opacity-0 invisible animate-menu-exit"}
          `

        }>
          <Link
            to="/"
            className={`text-[#447F98] font-bold text-lg opacity-0 focus:text-[#7ab0c7] ${isOpen ? "animate-item-fade [animation-delay:300ms]" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`text-[#447F98] font-bold text-lg opacity-0 focus:text-[#7ab0c7] ${isOpen ? "animate-item-fade [animation-delay:400ms]" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className={`text-[#447F98] font-bold text-lg opacity-0 focus:text-[#7ab0c7] ${isOpen ? "animate-item-fade [animation-delay:500ms]" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-[#447F98] font-bold text-lg opacity-0 focus:text-[#7ab0c7] ${isOpen ? "animate-item-fade [animation-delay:600ms]" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          {user && (
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className={`px-4 py-2 rounded-md text-[#447F98] text-lg opacity-0 font-bold focus:text-[#7ab0c7] ${isOpen ? "animate-item-fade [animation-delay:700ms]" : ""}`}
              title="Logout"
            >
              Logout
            </button>
          )}

          {user && user.role === "admin" && (
      <Link
        to="/admin"
        className={`px-4 py-2 rounded-md text-red-600 text-lg opacity-0 font-bold focus:text-red-500 ${isOpen ? "animate-item-fade [animation-delay:800ms]" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        Admin Panel
      </Link>
    )}


        </div>

    </nav>
  );
}
