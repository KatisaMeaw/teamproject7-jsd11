import { Link } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 flex justify-between items-center shadow-md p-4 bg-white z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="icon/Frame 281.png" alt="Logo" className="h-10" />
      </Link>
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
      <ul className="hidden md:flex justify-center gap-28 text-shadow-none text-[#447F98] font-bold">
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
      <div className="hidden md:flex justify-center gap-6">
        <Link
          to="/login"
          className="p-2 rounded-full text-gray-600 hover:bg-teal-100"
        >
          <img src="icon/mdi_account-alert-outline.png" alt="" />
        </Link>
        <a
          href="#"
          className="p-2 rounded-full text-gray-600 hover:bg-teal-100"
        >
          <img src="icon/akar-icons_search.png" alt="" />
        </a>
        <a
          href="#"
          className="p-2 rounded-full text-gray-600 hover:bg-teal-100"
        >
          <img src="icon/akar-icons_heart.png" alt="" />
        </a>
        <a
          href="/cart"
          className="p-2 rounded-full text-gray-600 hover:bg-teal-100"
        >
          <img src="icon/ant-design_shopping-cart-outlined.png" alt="" />
        </a>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-4 md:hidden z-40 transition-all duration-300 ease-in-out">
          <Link
            to="/"
            className="text-[#447F98] font-bold text-lg hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-[#447F98] font-bold text-lg hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-[#447F98] font-bold text-lg hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-[#447F98] font-bold text-lg hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <hr className="w-3/4 border-gray-200" />
          <div className="flex gap-6">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <img
                src="icon/mdi_account-alert-outline.png"
                alt=""
                className="h-6 w-6"
              />
            </Link>
            <Link to="#" onClick={() => setIsOpen(false)}>
              <img
                src="icon/akar-icons_search.png"
                alt=""
                className="h-6 w-6"
              />
            </Link>
            <Link to="#" onClick={() => setIsOpen(false)}>
              <img
                src="icon/akar-icons_heart.png"
                alt=""
                className="h-6 w-6"
              />
            </Link>
            <Link to="/cart" onClick={() => setIsOpen(false)}>
              <img
                src="icon/ant-design_shopping-cart-outlined.png"
                alt=""
                className="h-6 w-6"
              />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
