import React, { useState } from 'react';
import Sidebar from '../components/AdminPage/Sidebar';
import Header from '../components/AdminPage/Header';
import Dashboard from '../components/Dashboard/Dashboard';

function AdminDashboard() {
    const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          collapsed = {sideBarCollapsed}
          onToggle = {() => setSideBarCollapsed(!sideBarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header
            sideBarCollapsed={sideBarCollapsed} onToggledSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
          />

          <main className='flex-1 overflow-y-auto bg-transparent'>
            <div className='p-6 space-y-6'>
              {currentPage === "dashboard" && <Dashboard />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;