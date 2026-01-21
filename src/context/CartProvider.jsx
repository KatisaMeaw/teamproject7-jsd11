import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userId: null,
    loading: true
  });

  // 1. เช็คสถานะการเข้าสู่ระบบ
  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/auth/cookie/me`, {
        withCredentials: true
      });

      setAuthState({
        isLoggedIn: true,
        userId: res.data.user._id,
        loading: false
      });
    } catch {
      setAuthState({
        isLoggedIn: false,
        userId: null,
        loading: false
      });
      // ✅ เมื่อไม่ล็อกอิน ให้ล้างข้อมูลตะกร้าใน State ทันที
      setCartItems([]);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 2. ดึงข้อมูลจาก Server (เฉพาะตอนล็อกอิน)
  const fetchCartFromServer = async () => {
    if (!authState.isLoggedIn) return; // กันเหนียว

    try {
      const res = await axios.get(`${API_URL}/carts`, { withCredentials: true });
      if (res.data.success && res.data.data) {
        const formattedItems = res.data.data.products
          .filter(item => item.productId)
          .map(item => ({
            ...item.productId,
            quantity: item.quantity,
            _id: item.productId?._id
          }));
        setCartItems(formattedItems);
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Fetch cart error:", err.message);
      }
    }
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
      fetchCartFromServer();
    } else {
      setCartItems([]); // ✅ ถ้า Logout ให้ล้าง State ทันที
    }
  }, [authState.isLoggedIn]);


  // 3. ADD TO CART (เฉพาะสมาชิก)
  const addToCart = async (product) => {
    if (!authState.isLoggedIn) {
      alert("Please login to add items to cart"); // แจ้งเตือน หรือเปลี่ยนเส้นทางไปหน้า Login
      return;
    }

    const productId = product._id || product.id;
    try {
      await axios.post(
        `${API_URL}/carts`,
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      fetchCartFromServer();
    } catch (error) {
      console.error("Add to cart error", error);
    }
  };

  // 4. UPDATE QTY (เฉพาะสมาชิก)
  const updateQuantity = async (id, qty) => {
    if (qty < 1 || !authState.isLoggedIn) return;

    try {
      await axios.put(
        `${API_URL}/carts/${id}`,
        { quantity: qty },
        { withCredentials: true }
      );
      fetchCartFromServer();
    } catch (error) {
      console.error("Update quantity error", error);
    }
  };

  // 5. REMOVE ITEM (เฉพาะสมาชิก)
  const removeItem = async (id) => {
    if (!authState.isLoggedIn) return;

    try {
      await axios.delete(`${API_URL}/carts/${id}`, {
        withCredentials: true
      });
      fetchCartFromServer();
    } catch (error) {
      console.error("Remove item error", error);
    }
  };

  // 6. CLEAR CART (เฉพาะสมาชิก)
  const clearCart = async () => {
    if (!authState.isLoggedIn) return;

    try {
      await axios.delete(`${API_URL}/carts`, {
        withCredentials: true
      });
      setCartItems([]);
    } catch (error) {
      console.error("Clear cart error", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
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
        isLoggedIn: authState.isLoggedIn,
        loading: authState.loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;