import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  // 1. ดึงข้อมูลจาก localStorage มาเป็นค่าเริ่มต้น (ถ้าไม่มีให้เป็นอาเรย์ว่าง [])
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. บันทึกข้อมูลลง localStorage ทุกครั้งที่ cartItems มีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- 3. เพิ่มฟังก์ชัน addToCart เพื่อรับข้อมูลสินค้าใหม่ ---
  const addToCart = (product) => {
    setCartItems((prev) => {
      // ตรวจสอบว่าสินค้าชิ้นนี้มีอยู่ในตะกร้าแล้วหรือไม่
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        // ถ้ามีอยู่แล้ว ให้บวกจำนวน (quantity) เพิ่มเข้าไปจากเดิม
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      // ถ้าเป็นสินค้าใหม่ ให้เพิ่มเข้าไปในอาเรย์
      return [...prev, product];
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price);
    return acc + price * Number(item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, subtotal }}>
              {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
