import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
<<<<<<< HEAD

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
=======
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userId: null,
    loading: true
  });

  // ----------------------------------
  // CHECK LOGIN FROM BACKEND
  // ----------------------------------
  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, {
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

      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ----------------------------------
  // FETCH CART WHEN LOGIN
  // ----------------------------------
  const fetchCartFromServer = async () => {
    try {
      const res = await axios.get(`${API_URL}/cart`, {
        withCredentials: true
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Fetch cart error:", err.message);
    }
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
      fetchCartFromServer();
    }
  }, [authState.isLoggedIn]);

  // ----------------------------------
  // SAVE GUEST CART
  // ----------------------------------
  useEffect(() => {
    if (!authState.isLoggedIn && !authState.loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, authState]);

  // ----------------------------------
  // ADD TO CART
  // ----------------------------------
  const addToCart = async (product) => {
    const productId = product._id || product.id;

    if (!authState.isLoggedIn) {
      setCartItems((prev) => {
        const exist = prev.find((i) => (i._id || i.id) === productId);
        if (exist) {
          return prev.map((i) =>
            (i._id || i.id) === productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    } else {
      await axios.post(
        `${API_URL}/cart`,
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      fetchCartFromServer();
    }
  };

  // ----------------------------------
  // UPDATE QTY
  // ----------------------------------
  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    if (!authState.isLoggedIn) {
      setCartItems((prev) =>
        prev.map((i) =>
          i._id === id || i.id === id ? { ...i, quantity: qty } : i
        )
      );
    } else {
      await axios.put(
        `${API_URL}/cart/${id}`,
        { quantity: qty },
        { withCredentials: true }
      );
      fetchCartFromServer();
    }
  };

  // ----------------------------------
  // REMOVE ITEM
  // ----------------------------------
  const removeItem = async (id) => {
    if (!authState.isLoggedIn) {
      setCartItems((prev) =>
        prev.filter((i) => i._id !== id && i.id !== id)
      );
    } else {
      await axios.delete(`${API_URL}/cart/${id}`, {
        withCredentials: true
      });
      fetchCartFromServer();
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (!authState.isLoggedIn) {
      localStorage.removeItem("cart");
    } else {
      await axios.delete(`${API_URL}/cart`, {
        withCredentials: true
      });
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
        isLoggedIn: authState.isLoggedIn,
        loading: authState.loading
      }}
    >
      {children}
>>>>>>> 147caa49da6992da1ac05b35007fe686815bac0f
    </CartContext.Provider>
  );
};

export default CartProvider;
