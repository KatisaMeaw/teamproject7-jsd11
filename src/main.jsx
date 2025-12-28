import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import { Layout } from "./views/Layout.jsx";
import App from './App.jsx'
import Home from "./views/Home.jsx"
import Shop from "./views/Shop.jsx"
import ProductDetail from "./views/ProductDetail.jsx";
import Cart from "./views/Cart.jsx";
import Checkout from "./views/Checkout.jsx";
import Contact from "./views/Contact.jsx";
import Register from "./views/Register.jsx"
import UserProfile from "./components/UserProfile.jsx";
import AdminDashboard from "./views/AdminDashboard.jsx"

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
      { path: "/", element:<Home /> },
      { path: "/shop", element:<Shop /> },
      { path: "/register", element:<Register /> },
      { path: "shop/:id", element:<ProductDetail />},
      { path: "/cart", element: <Cart />},
      { path: "/contact", element: <Contact />},
      { path: "/checkout", element: <Checkout />},
      { path: "/userprofile", element:<UserProfile />},
      // { path: "/about", element:<About /> },
    ],
  },
  {
    path: "/admin",
    element:<AdminDashboard />,
  },
]);

 createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>);