import { MoreHorizontal } from 'lucide-react'
import React from 'react'

function TableSection() {
  return (
    <div className="space-y-6">
        {/* Recent Orders Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                            Recent Orders
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Latest customer orders
                        </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                Order ID
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                Product
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                Amount
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                Status
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                Date
                            </th>
                        </tr>
                        <tbody>
                            <tr className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="p-4">
                                    <span className="text-sm font-medium text-blue">
                                        Order ID
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm text-slate-800 dark:text-white">
                                        Customer
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm text-slate-800 dark:text-white">
                                        Product
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm text-slate-800 dark:text-white">
                                        Amount
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span
                                        className={"text-slate-400 dark:text-white font-medium text-xs px-3 py-1 rounded-full"}
                                    >
                                        Order Status
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm text-slate-800 dark:text-white">
                                        <MoreHorizontal className='w-4 h-4' />
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </thead>
                </table>
            </div>
        </div>
    </div>
  )
}

export default TableSection