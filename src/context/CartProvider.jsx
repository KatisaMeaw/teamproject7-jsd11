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

  // ----------------------------------
  // CHECK LOGIN FROM BACKEND
  // ----------------------------------
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
      // ถ้าไม่ล็อกอิน ให้ดึงจาก LocalStorage มาโชว์
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
      const res = await axios.get(`${API_URL}/carts`, { // ✅ เปลี่ยนเป็น /carts
        withCredentials: true
      });

      // ✅ แตกข้อมูลจาก Schema ที่ทำไว้: { data: { products: [ { productId: {...}, quantity: 1 } ] } }
      if (res.data.success && res.data.data) {
        const formattedItems = res.data.data.products.map(item => ({
          ...item.productId, // ข้อมูลสินค้าที่ถูก populate มา
          quantity: item.quantity,
          _id: item.productId._id // มั่นใจว่ามี ID ไว้ใช้อ้างอิง
        }));
        setCartItems(formattedItems);
      }
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
  // SAVE GUEST CART (LocalStorage)
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
      try {
        await axios.post(
          `${API_URL}/carts`, //
          { productId, quantity: 1 },
          { withCredentials: true }
        );
        fetchCartFromServer();
      } catch (error) {
        console.error("Add to cart error", error);
      }
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
          (i._id === id || i.id === id) ? { ...i, quantity: qty } : i
        )
      );
    } else {
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
      try {
        await axios.delete(`${API_URL}/carts/${id}`, {
          withCredentials: true
        });
        fetchCartFromServer();
      } catch (error) {
        console.error("Remove item error", error);
      }
    }
  };

  // ----------------------------------
  // CLEAR CART
  // ----------------------------------
  const clearCart = async () => {
    setCartItems([]);
    if (!authState.isLoggedIn) {
      localStorage.removeItem("cart");
    } else {
      try {
        await axios.delete(`${API_URL}/carts`, {
          withCredentials: true
        });
      } catch (error) {
        console.error("Clear cart error", error);
      }
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