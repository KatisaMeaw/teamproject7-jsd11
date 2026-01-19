import React from "react";
import { useLocation } from "react-router-dom";

export default function SubNavbar() {
  const location = useLocation();
  const getPageTitle = () => {
    const path = location.pathname;

    switch (path) {
      case "/shop":
        return "Shop";
      case "/login":
        return "Login";
      case "/contact":
        return "Contact";
      case "/checkout":
        return "Checkout";
      case "/cart":
        return "Cart";
      case "/userprofile":
        return "User Profile";

      default:
        return path.replace("/", "").charAt(0).toUpperCase() + path.slice(2);
    }
  };

  const title = getPageTitle();

  return (
    <div className="w-full font-sans">
      <div className="relative w-full h-75 bg-gray-200 flex flex-col justify-center items-center">
        <img
          src="/img-prod/Home-Office.jpeg"
          className="absolute inset-0 w-full h-full object-cover blur-[6px] scale-97"
        />
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="z-10 flex flex-col items-center gap-2">
          <h1 className="text-5xl font-medium text-black">{title}</h1>

          <div className="flex items-center gap-2 text-base font-medium text-black">
            <span className="font-bold">Home</span>

            <span className="text-xl">&gt;</span>

            <span className="font-light">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
