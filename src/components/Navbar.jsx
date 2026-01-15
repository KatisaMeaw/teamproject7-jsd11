import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export function Navbar() {
    // 1. ดึงข้อมูลสินค้าจาก useCart
    const { cartItems } = useCart();

    // 2. คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="flex justify-between items-center shadow-md p-4">
            <Link to="/" className="flex items-center">
                <img src="icon/Frame 281.png" alt="Logo" />
            </Link>

            <ul className="hidden md:flex justify-center gap-28 text-shadow-none text-[#447F98] font-bold">
                <li>
                    <Link to="/" className="hover:text-gray-500">Home</Link>
                </li>
                <li>
                    <Link to="/shop" className="hover:text-gray-500">Shop</Link>
                </li>
                <li>
                    <Link to="/about" className="hover:text-gray-500">About</Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:text-gray-500">Contact</Link>
                </li>
            </ul>

            <div>
                <div className="hidden md:flex justify-center gap-6">
                    <Link to="/login" className="p-2 rounded-full text-gray-600 hover:bg-teal-100">
                        <img src="icon/mdi_account-alert-outline.png" alt="User" />
                    </Link>

                    <a href="#" className="p-2 rounded-full text-gray-600 hover:bg-teal-100">
                        <img src="icon/akar-icons_search.png" alt="Search" />
                    </a>

                    <a href="#" className="p-2 rounded-full text-gray-600 hover:bg-teal-100">
                        <img src="icon/akar-icons_heart.png" alt="Wishlist" />
                    </a>

                    {/* 3. ส่วนของตะกร้าสินค้า เพิ่ม Badge ตัวเลข */}
                    <Link to="/cart" className="p-2 rounded-full text-gray-600 hover:bg-teal-100 relative">
                        <img src="icon/ant-design_shopping-cart-outlined.png" alt="Cart" />

                        {/* แสดงตัวเลขเฉพาะเมื่อมีสินค้าในตะกร้ามากกว่า 0 */}
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full shadow-sm">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}