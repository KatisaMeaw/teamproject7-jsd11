import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import CartProvider from "./context/CartProvider.jsx";
import { Layout } from "./views/Layout.jsx";
import Home from "./views/Home.jsx";
import Shop from "./views/Shop.jsx";
import ProductDetail from "./views/ProductDetail.jsx";
import Cart from "./views/Cart.jsx";
import Checkout from "./views/Checkout.jsx";
import Contact from "./views/Contact.jsx";
import Register from "./views/Register.jsx";
import UserProfile from "./views/UserProfile.jsx";
import AdminDashboard from "./views/AdminDashboard.jsx";
import AdminInventory from "./views/AdminInventory.jsx";
import { AdminRoute, UserProfileRoute } from "./components/ProtectedRoute.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">404 - Page Not Found😭</h1>
      </div>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/login", element: <Register /> },
      { path: "shop/:id", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/contact", element: <Contact /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/userprofile", 
        element: (
          <UserProfileRoute>
        <UserProfile />
          </UserProfileRoute>
      ) 
    },
      // { path: "/about", element:<About /> },

      {
        path: "/admin",
        element: (
        //   <AdminRoute>
            <AdminDashboard />
        //   </AdminRoute>
        ),
        children: [{ path: "inventory", element: <AdminInventory /> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
);
