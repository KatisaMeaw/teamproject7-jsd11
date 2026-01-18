import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Bottombar = ({user}) => {

    const navItems = [
        { name: "Home", img: "icon/home.png", link: "/"},
        { name: "Search", img: "icon/akar-icons_search.png", link: "/shop"},
        { name: "Favorite", img: "icon/akar-icons_heart.png", link: "/favorite"},
        { name: "Cart", img: "icon/ant-design_shopping-cart-outlined.png", link: "/cart"},
        { name: "Profile", img: "icon/mdi_account-alert-outline.png", link: user ? "/userprofile" : "/login"},
        
];

const location = useLocation();
    const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 h-18 z-50 md:hidden">
    {/* Bottom Navigation Bar สำหรับ Mobile */}
<nav className="flex justify-around items-center h-full">
                {navItems.map((item) => {
                    const isCurrent = currentPath === item.link;
                    return (
                    <Link
                        key={item.name}
                        to={item.link}

                        className={`
                            flex flex-col items-center flex-grow 
                            text-xs font-medium 
                            p-2 mb-1 
                            min-w-0
                            ${isCurrent ? 'rounded-2xl bg-[#D6EBF3] text-gray-600'
                                : 'text-gray-500  hover:rounded-lg'}
                        `}
                    >
                        {/* Icon */}
                        
                        <img src={item.img} alt={item.name} className="h-5 w-5" />
                        {/* Label */}
                        <span className="mt-1">{item.name}</span>
                    </Link>
                    );
                })}
            </nav>
</div>
  )
}


export default Bottombar