import { useState, useEffect, useCallback, useRef } from "react";
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

  const isCheckingAuthRef = useRef(false);
  const isLoggedInRef = useRef(false);

  // -------------------------
  // Fetch Cart
  // -------------------------
  const fetchCartFromServer = useCallback(async () => {
    if (!isLoggedInRef.current) {
      setCartItems([]);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/carts`, {
        withCredentials: true,
      });

      if (res.data?.data?.products) {
        const formattedItems = res.data.data.products
          .filter((item) => item.productId)
          .map((item) => ({
            ...item.productId,
            quantity: item.quantity,
            _id: item.productId._id,
          }));

        setCartItems(formattedItems);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setCartItems([]);
      } else {
        console.error("Fetch cart error:", err);
      }
    }
  }, []);

  // -------------------------
  // Check Auth (ยิงครั้งเดียว)
  // -------------------------
  const checkAuth = useCallback(async () => {
    if (isCheckingAuthRef.current) return;

    isCheckingAuthRef.current = true;

    try {
      const res = await axios.get(
        `${API_URL}/users/auth/cookie/me`,
        { withCredentials: true }
      );

      const { _id, name } = res.data.user;

      isLoggedInRef.current = true;

      setAuthState({
        isLoggedIn: true,
        userId: _id,
        userName: name,
        loading: false,
      });

      await fetchCartFromServer();
    } catch {
      isLoggedInRef.current = false;
      setAuthState({
        isLoggedIn: false,
        userId: null,
        userName: "",
        loading: false,
      });
      setCartItems([]);
    } finally {
      isCheckingAuthRef.current = false;
    }
  }, [fetchCartFromServer]);

  // -------------------------
  // Run once on app load
  // -------------------------
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // -------------------------
  // Cart Actions
  // -------------------------
  const addToCart = async (product) => {
    if (!authState.isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }

    const productId = product._id || product.id;
    const quantity = product.quantity || 1;

    try {
      await axios.post(
        `${API_URL}/carts`,
        { productId, quantity },
        { withCredentials: true }
      );
      await fetchCartFromServer();
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (!authState.isLoggedIn || quantity < 1) return;

    try {
      await axios.put(
        `${API_URL}/carts/${id}`,
        { quantity },
        { withCredentials: true }
      );
      await fetchCartFromServer();
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  const removeItem = async (id) => {
    if (!authState.isLoggedIn) return;

    try {
      await axios.delete(`${API_URL}/carts/${id}`, {
        withCredentials: true,
      });
      await fetchCartFromServer();
    } catch (err) {
      console.error("Remove item error:", err);
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (!authState.isLoggedIn) return;

    try {
      await axios.delete(`${API_URL}/carts`, {
        withCredentials: true,
      });
    } catch (err) {
      console.warn("Clear cart error:", err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
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
