import { useState, useEffect, useCallback } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userId: null,
    userName: "",
    loading: true,
  });

  // 2. ดึงข้อมูลจาก Server (แยกออกมาเป็น useCallback เพื่อให้เรียกซ้ำได้เสถียร)
  const fetchCartFromServer = useCallback(async (isLoggedIn) => {
    // หากไม่ได้ Login ให้ล้างข้อมูลตะกร้าและออกจากการทำงานทันที
    if (!isLoggedIn) {
      setCartItems([]);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/carts`, {
        withCredentials: true,
      });
      if (res.data.success && res.data.data) {
        const formattedItems = res.data.data.products
          .filter((item) => item.productId)
          .map((item) => ({
            ...item.productId,
            quantity: item.quantity,
            _id: item.productId?._id,
          }));
        setCartItems(formattedItems);
      }
    } catch (err) {
      // หากพบว่า 401 (Unauthorized) ให้ล้างตะกร้า
      if (err.response?.status === 401) {
        setCartItems([]);
      } else {
        console.error("Fetch cart error:", err.message);
      }
    }
  }, []);

  // 1. เช็คสถานะการเข้าสู่ระบบ
  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/users/auth/cookie/me`, {
        withCredentials: true,
      });

      const { _id, name } = res.data.user;

      setAuthState({
        isLoggedIn: true,
        userId: _id,
        userName: name,
        loading: false,
      });

      // 🔥 หัวใจสำคัญ: ดึงข้อมูลตะกร้าทันทีหลังตรวจสอบ Auth สำเร็จโดยส่งค่า true เข้าไปตรงๆ
      // เพื่อไม่ให้เกิด Race Condition ที่ต้องรอสถานะ isLoggedIn เปลี่ยน
      await fetchCartFromServer(true);
    } catch (error) {
      setAuthState({
        isLoggedIn: false,
        userId: null,
        userName: "",
        loading: false,
      });
      setCartItems([]);
    }
  }, [fetchCartFromServer]);

  useEffect(() => {
    checkAuth();

    const handleFocus = () => {
      // ใช้ค่าจาก authState.isLoggedIn ที่ใส่ใน dependency ด้านล่างแล้ว
      if (!authState.isLoggedIn) {
        checkAuth();
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [checkAuth, authState.isLoggedIn]); //

  // 3. ADD TO CART
  const addToCart = async (product) => {
    if (!authState.isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }

    const productId = product._id || product.id;
    const qty = product.quantity || 1;

    try {
      await axios.post(
        `${API_URL}/carts`,
        { productId, quantity: qty },
        { withCredentials: true },
      );
      // ดึงข้อมูลใหม่หลังเพิ่มเสร็จทันที
      fetchCartFromServer(true);
    } catch (error) {
      console.error("Add to cart error", error);
    }
  };

  // 4. UPDATE QTY
  const updateQuantity = async (id, qty) => {
    if (qty < 1 || !authState.isLoggedIn) return;

    try {
      await axios.put(
        `${API_URL}/carts/${id}`,
        { quantity: qty },
        { withCredentials: true },
      );
      fetchCartFromServer(true);
    } catch (error) {
      console.error("Update quantity error", error);
    }
  };

  // 5. REMOVE ITEM
  const removeItem = async (id) => {
    if (!authState.isLoggedIn) return;

    try {
      await axios.delete(`${API_URL}/carts/${id}`, {
        withCredentials: true,
      });
      fetchCartFromServer(true);
    } catch (error) {
      console.error("Remove item error", error);
    }
  };

  // 6. CLEAR CART
  const clearCart = async () => {
    if (!authState.isLoggedIn) return;

    try {
      await axios.delete(`${API_URL}/carts`, {
        withCredentials: true,
      });
      setCartItems([]);
    } catch (error) {
      console.error("Clear cart error", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        userId: authState.userId,
        userName: authState.userName,
        isLoggedIn: authState.isLoggedIn,
        loading: authState.loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
