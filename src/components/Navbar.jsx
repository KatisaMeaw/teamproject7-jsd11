import {Link} from "react-router-dom";

export function Navbar() {
    return (
        	<nav className="flex justify-between items-center shadow-md  p-4">
				<div className="flex items-center">
					<span className="text-[#447F98] font-extrabold text-5xl ">R
						<span className="text-[#447F98] font-extrabold text-4xl"> RELIEF</span></span>
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
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" />
                    </svg>
                </a>

                <a href="#" className="p-2 rounded-full text-gray-600 hover:bg-teal-100">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                </a>

                <a href="#" className="p-2 rounded-full text-gray-600 hover:bg-teal-100">

                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                </a>
            </div>

        </div>
			</nav>
    );
}
