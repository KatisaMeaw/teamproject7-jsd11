import { Link, useOutletContext } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import SubNavbar from "../components/SubNavbar";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const {user} = useOutletContext();
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem, subtotal } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  // ✅ เปลี่ยนจาก id เป็น _id เพื่อรองรับ MongoDB
  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value, 10);
    if (qty < 1 || isNaN(qty)) {
      if (window.confirm("Do you want to remove this item from the cart?")) {
        removeItem(id);
      }
    } else {
      updateQuantity(id, qty);
    }
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeItem(id);
    }
  };

  return (
    <>
      <SubNavbar />
      <main className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh]">
        {!user ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-40 h-40 mb-6 bg-gray-50 rounded-full flex items-center justify-center">
              <svg
                className="w-20 h-20 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Please log in to see your cart
            </h3>
            <p className="text-gray-500 mb-8 max-w-sm">
              Log in now to view the items you have added or to start a new
              order.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login?redirect=/cart"
                className="bg-[#447F98] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5591A9] shadow-md transition-all"
              >
                Login / Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="hidden md:grid grid-cols-4 p-4 bg-blue-50/50 font-bold text-sm text-gray-700">
                  <div>Product</div>
                  <div>Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right md:text-left">Subtotal</div>
                </div>

                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item._id || item.id} // ✅ รองรับทั้ง _id และ id
                        className="grid grid-cols-2 md:grid-cols-4 items-center border-t border-gray-100 py-6 px-4 text-sm hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4 col-span-2 md:col-span-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover border rounded-md bg-white shrink-0"
                          />
                          <span className="font-medium text-gray-800">
                            {item.name}
                          </span>
                        </div>

                        {/* ราคาต่อชิ้น */}
                        <div className="text-gray-500">
                          <span className="md:hidden text-xs block text-gray-400">
                            Price
                          </span>
                          THB {item.price.toLocaleString()}
                        </div>

                        {/* ตัวปรับจำนวน */}
                        <div className="flex flex-col md:items-center">
                          <span className="md:hidden text-xs text-gray-400 mb-1">
                            Quantity
                          </span>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item._id || item.id,
                                e.target.value,
                              )
                            }
                            className="w-16 text-center border border-gray-300 rounded-md p-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>

                        <div className="flex justify-between items-center md:pl-4 col-span-2 md:col-span-1 border-t md:border-none pt-4 md:pt-0">
                          <div>
                            <span className="md:hidden text-xs block text-gray-400">
                              Subtotal
                            </span>
                            <span className="font-bold text-gray-900">
                              {/* ✅ คำนวณแบบปลอดภัย */}
                              {(
                                Number(item.price || 0) *
                                Number(item.quantity || 0)
                              ).toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={() => handleRemove(item._id || item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                      <Link
                        to="/shop"
                        className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        Continue Shopping
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="p-20 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6 text-blue-200">
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 mb-8">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link
                      to="/shop"
                      className="inline-block bg-[#447F98] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm sticky top-8">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">
                  Cart Total
                </h2>
                <div className="flex justify-between mb-6 text-gray-600">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">
                    {/* ✅ ป้องกัน Error Subtotal */}
                    THB {(subtotal || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-6 border-t border-gray-100 mb-8">
                  <span className="text-gray-800">Total</span>
                  <span className="text-blue-600">
                    THB {(subtotal || 0).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className={`text-center w-full mt-8 font-bold py-3 px-8 rounded-lg shadow-md transition duration-300
              ${cartItems.length > 0 ? "bg-[#447F98] hover:bg-[#5591A9] text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <SubFooter />
      <Footer />
    </>
  );
};

export default Cart;
