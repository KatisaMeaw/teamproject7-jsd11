import {Link} from "react-router-dom";


export function Navbar() {
    return (
        	<nav className="flex justify-between items-center shadow-md  p-4">
				<div className="flex items-center">
					<img src="icon/Frame 281.png" alt="" />
				</div>
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
                        <Link to="contact" className="hover:text-gray-500">Contact</Link>
                    </li>
                </ul>
        <div>
          <div className="hidden md:flex justify-center gap-6 ">

               <a href="#" className="p-2 rounded-full text-gray-600 hover:bg-teal-100">
                    <img src="icon/mdi_account-alert-outline.png" alt="" />
                </a>

                <a href="#" className="p-2 rounded-full text-gray-600 hover:bg-teal-100">
                    <img src="icon/akar-icons_search.png" alt="" />
                </a>

                <a href="#" className="p-2 rounded-full text-gray-600 hover:bg-teal-100">
                 <img src="icon/akar-icons_heart.png" alt="" />
                </a>

                <a href="/cart" className="p-2 rounded-full text-gray-600 hover:bg-teal-100">
                  <img src="icon/ant-design_shopping-cart-outlined.png" alt="" />
                </a>
            </div>

        </div>
			</nav>
    );
}
