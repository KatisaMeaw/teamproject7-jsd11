import { useState, useEffect, useCallback, useRef } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CartProvider = ({ children }) => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userId: null,
    userName: "",
    loading: true,
  });

  const isLoggedInRef = useRef(false);

  // 2. ฟังก์ชันดึงข้อมูลจาก Server
  const fetchCartFromServer = useCallback(async (isLoggedIn) => {
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
      if (err.response?.status === 401) {
        setCartItems([]);
      } else {
        console.error("Fetch cart error:", err.message);
      }
    }
  }, []);

  // 1. ฟังก์ชันเช็คสถานะการเข้าสู่ระบบ ใช้ได
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
      isLoggedInRef.current = true;

      // 🔥 ดึงตะกร้าต่อทันทีเมื่อยืนยันตัวตนสำเร็จ
      await fetchCartFromServer(true);
    } catch (error) {
      setAuthState({
        isLoggedIn: false,
        userId: null,
        userName: "",
        loading: false,
      });
      isLoggedInRef.current = false;
      setCartItems([]);
    }
  }, [fetchCartFromServer]);

  // 3. จัดการ Lifecycle ของแอป (ทำงานเมื่อ Load หน้าเว็บ และเมื่อกลับมาโฟกัสหน้าจอ)
  // --- ส่วนที่แก้ไข ---
  useEffect(() => {
    // ฟังก์ชันนี้จะทำงานทุกครั้งที่ location.pathname เปลี่ยนแปลง
    // เช่น เปลี่ยนจากหน้า /login ไปหน้า /cart
    checkAuth();

    const handleFocus = () => {
      checkAuth();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [checkAuth, location.pathname]); // เพิ่ม location.pathname ที่นี่
  // ------------------

  // ---------------------------------------------------------
  // Cart Actions (Add, Update, Remove, Clear)
  // ---------------------------------------------------------

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
      await fetchCartFromServer(true);
    } catch (error) {
      console.error("Add to cart error", error);
    }
  };

  const updateQuantity = async (id, qty) => {
    if (qty < 1 || !authState.isLoggedIn) return;
    try {
      await axios.put(
        `${API_URL}/carts/${id}`,
        { quantity: qty },
        { withCredentials: true },
      );
      await fetchCartFromServer(true);
    } catch (error) {
      console.error("Update quantity error", error);
    }
  };

  const removeItem = async (id) => {
    if (!authState.isLoggedIn) return;
    try {
      await axios.delete(`${API_URL}/carts/${id}`, {
        withCredentials: true,
      });
      await fetchCartFromServer(true);
    } catch (error) {
      console.error("Remove item error", error);
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (!authState.isLoggedIn) return;
    try {
      await axios.delete(`${API_URL}/carts`, {
        withCredentials: true,
      });
    } catch (error) {
      console.warn("Backend cart might already be empty:", error.response?.status);
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
        checkAuth,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;