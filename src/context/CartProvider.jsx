import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  // 1. ดึงข้อมูลจาก localStorage มาเป็นค่าเริ่มต้น
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. บันทึกข้อมูลลง localStorage ทุกครั้งที่ cartItems มีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- 3. เพิ่มฟังก์ชัน addToCart โดยเน้นย้ำเรื่อง ID ---
  const addToCart = (product) => {
    // ตรวจสอบว่า product มี id หรือ _id หรือไม่ เพื่อป้องกันปัญหาในหน้า Checkout
    const productId = product.id || product._id;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => (item.id || item._id) === productId);

      if (existingItem) {
        return prev.map((item) =>
          (item.id || item._id) === productId
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      // เก็บค่าทั้ง id และ _id ไว้เพื่อความปลอดภัยในการอ้างอิง
      return [...prev, { ...product, _id: productId, id: productId }];
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        (item.id || item._id) === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => (item.id || item._id) !== id));
  };

  // --- 4. ฟังก์ชันใหม่: clearCart สำหรับใช้หลังสั่งซื้อสำเร็จ ---
  const clearCart = () => {
    setCartItems([]); // ล้าง State
    localStorage.removeItem("cart"); // ล้าง Storage
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price);
    return acc + price * Number(item.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        subtotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;