import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);

  // มาตรฐาน: เช็คว่ามีการใช้ Hook นอก Provider หรือไม่
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};