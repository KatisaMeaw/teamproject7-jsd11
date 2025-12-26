import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { Layout } from "./views/Layout.jsx";
import Home from "./views/Home.jsx"
import Shop from "./views/Shop.jsx"
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import Register from "./views/Register.jsx"
=======
import ProductDetail from "./views/ProductDetail.jsx";
import Cart from "./views/Cart.jsx";
import Checkout from "./views/Checkout.jsx";
import UserProfile from "./components/UserProfile.jsx";
>>>>>>> f0b6a6daa7e821200ee53444b2f3c54913ff9152

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
<<<<<<< HEAD
      { path: "/shop", element:<Shop /> },
      { path: "/register", element:<Register /> },
=======
      { path: "/shop", element:<Shop />},
      { path: "shop/:id", element:<ProductDetail />},
      { path: "/cart", element: <Cart />},
      { path: "/checkout", element: <Checkout />},
      { path: "/userprofile", element:<UserProfile />}
>>>>>>> f0b6a6daa7e821200ee53444b2f3c54913ff9152
      // { path: "/about", element:<About /> },
      // { path: "/contact", element:<Contact /> },
    ],
  },
]);

 createRoot(document.getElementById("root")).render(
 <RouterProvider router={router}>
  <App />
  </RouterProvider>);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
