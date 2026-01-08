import React from 'react'
import SidebarUser from './SidebarUser'
import OrderTabs from './OrderTabs'
import OrderHistoryCard from './OrderHistoryCard'

const MyOrders = () => {
  return (
    <div className="relative ">
        
        <div className="absolute left-70 top-8">
        <OrderTabs />
        <div className="mt-8">
        <OrderHistoryCard />
        <OrderHistoryCard />
        </div>
        </div>

        <div>
            <SidebarUser />
        </div>
    </div>
    
  )
}

export default MyOrders