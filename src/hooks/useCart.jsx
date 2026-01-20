import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // เช็ค path ไฟล์ CartContext.js

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context; // ส่งค่า cartItems, addToCart, ฯลฯ กลับไปให้หน้า ProductDetail
};