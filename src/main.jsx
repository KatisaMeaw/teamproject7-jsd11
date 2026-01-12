import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { Layout } from "./views/Layout.jsx";
import Home from "./views/Home.jsx"
import Shop from "./views/Shop.jsx"
import { createRoot } from "react-dom/client";
import ProductDetail from "./views/ProductDetail.jsx";
import Cart from "./views/Cart.jsx";
import Checkout from "./views/Checkout.jsx";
import Contact from "./views/Contact.jsx";
import Register from "./views/Register.jsx"
import UserProfile from "./components/UserProfile.jsx";
import AdminDashboard from "./views/AdminDashboard.jsx"
import MyOrders from "./components/MyOrders.jsx"

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
      { path: "/login", element:<Register /> },
      { path: "shop/:id", element:<ProductDetail />},
      { path: "/cart", element: <Cart />},
      { path: "/contact", element: <Contact />},
      { path: "/checkout", element: <Checkout />},
      { path: "/userprofile", element:<UserProfile />},
      { path: "/admin", element:<AdminDashboard /> },
      { path: "/myorders", element:<MyOrders /> },
      // { path: "/about", element:<About /> },
    ],
  },
])

 createRoot(document.getElementById("root")).render(
 <RouterProvider router={router}>
  <App />
  </RouterProvider>);

