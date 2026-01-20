import React from 'react'
import RevenueChart from "./RevenueChart";
import SalesChart from './SalesChart';

function ChartSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-1 gap-1">
        <div className="xl:col-span-1">
            {/* <RevenueChart /> */}
        </div>
        <div className='space-y-6'>
          <SalesChart />
        </div>
    </div>
  )
}

export default ChartSection