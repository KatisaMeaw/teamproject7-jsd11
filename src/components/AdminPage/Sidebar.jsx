import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    id: "inventory",
    icon: Package,
    label: "Inventory",
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
  },
];

function Sidebar({ collapsed, currentPage }) {

  return (
    <div
      className={`${collapsed ? "w-20" : "w-72"} transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10`}
    >
      {/*Logo Section*/}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex justify-between items-center">
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
            <Zap className='w-6 h-6 text-white' />
          </div>

          {/* Conditional rendering for Logo Text */}
          {!collapsed && (
            <div>
              <h1 className='text-xl font-bold text-slate-800 dark:text-white'>
              RELIEF
              </h1>
              <p className='text-xs text-slate-500 dark:text-slate-400'>
                Admin Panel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation and Dynamics Menus */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          return (
          <div key={item.id}>
            <button
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${currentPage === item.id ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25": "text-slate-600  dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
            >
              <div className='flex items-center space-x-3'>
                <item.icon className={'w-5 h-5'} />

                {/* Condition Rendering */}
                {!collapsed && (
                  <>
                    <Link to={`/admin/${item.id}`}>
                    <span className='font-medium ml-2'>{item.label}</span></Link>
                      {item.badge && (
                    <span className='px-2 py-1 text-xs bg-red-500 text-white rounded-full'>
                      {item.badge}
                    </span>
                    )}
                  </>
                )}
              </div>
            </button>
          </div>
          );
        })}
      </nav>

      {/* User Profile */}
      {!collapsed && (<div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <img
            src="https://is1-ssl.mzstatic.com/image/thumb/Features71/v4/9a/d2/82/9ad28263-7e5e-8528-9806-89cc3b28d103/mzl.tkmgpqca.png/190x190cc.webp"
            alt="user"
            className="w-10 h-10 rounded-full ring-2 ring-blue-500"
          />
          <div className="flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium  text-slate-800 dark:text-white truncate">
                Alex Johnson
              </p>
              <p className='text-xs text-slate-500 dark:text-slate-400 truncate'>
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Sidebar