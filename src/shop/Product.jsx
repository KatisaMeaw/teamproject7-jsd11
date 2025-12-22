import React from 'react'


function Production() {
  return (
    <div class="bg-gray-50 p-24">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="p-4">
              <h3 class="text-xl font-bold text-[#447F98] mb-1">Ultimate</h3>
              <p class="text-gray-500 text-sm mb-2">Ergonomic chair</p>
              <div class="flex items-center justify-start gap-4">
                <span class="text-[#447F98] font-bold">thb 2,500</span>
                <span class="text-gray-400 text-lg line-through"
                  >thb 3,500</span>
              </div>
            </div>
        </div>
      </div>
    </div>

  )
}

export default Production