import Card from "../components/Card";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import SubNavbar from "../components/SubNavbar";
import FilterBar from "../shop/FilterBar";
import { Link } from "react-router-dom";
import { products } from '../data';

export default function Shop() {

  return (
    <>
      <SubNavbar />
      <FilterBar />
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16">
          {products.map((product) => (
          <Link key={product.id} to={`/shop/${product.id}`}>
            <Card product={product} />
          </Link>
          ))}
        </div>
        <div className="flex justify-center items-center mt-12 gap-5 my-10">
          <button className="w-12 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
            1
          </button>

          <button className="w-12 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
            2
          </button>

          <button className="w-12 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
            3
          </button>

          <button className="px-6 h-12 rounded bg-[#d6ebf3] text-gray-800 font-bold text-lg hover:bg-[#447F98]  hover:text-white transition duration-300">
            Next
          </button>
        </div>
      </div>
      <SubFooter />
      <Footer />
    </>
  );
}

// if click at "Add to cart" button both of shop.jsx and ProductDetail.jsx  i want navigate to and add the list of production in the cart.jsx

// ✦ I'll implement "Add to Cart" by first creating a CartContext.jsx file in a new src/context directory. This context will manage cart items and an addToCart function. Next, I'll wrap
//   my app in main.jsx with the CartProvider. Then, in both Card.jsx and ProductDetail.jsx, I'll use useContext to get addToCart, create a function to add the product to the cart and
//   navigate to /cart, and attach this to the "Add to Cart" button's onClick event. Finally, I'll update Cart.jsx to consume the cartItems from the context and display the products and
//   total price. I'm starting with creating CartContext.jsx.