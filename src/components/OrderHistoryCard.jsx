import React from 'react'

const OrderHistoryCard = () => {
  return (
    <div className=" w-2/3 border border-[#E4E7E9] py-10 mb-6">
        <div className="flex justify-between items-center bg-[#FDFAE7] border border-[#F8EBAA] w-[90%] mx-auto py-10">
        <div className="text-xl ml-8 font-medium">#96459761<div className="text-base font-normal mt-2">4 Products • Order Placed in 17 Jan, 2026 at 7:32 PM</div> </div>
        <div className="text-3xl font-bold mr-8 text-[#447F98]">$3,000.00</div>
        </div>

        <p className="ml-20 mt-4">Order expected arrival<span className="font-semibold"> 23 Jan, 2021</span></p>
        <h2 className="ml-20 mt-10 text-xl font-semibold">Product<span className="text-gray-500"> (02)</span></h2>


            <div className="grid grid-cols-4 p-4 border border-[#E7EAEB] bg-[#F2F4F5] mt-8 text-sm font-semibold">
            <p className="text-[#475156]">PRODUCTS</p>
            <p className="text-[#475156]">PRICE</p>
            <p className="text-[#475156]">QUANTITY</p>
            <p className="text-[#475156]">SUB-TOTAL</p>
            </div>
        
            <div className="grid grid-cols-4 relative p-4 mt-5 after:absolute after:bottom-0 after:left-6 after:right-6 after:border-b after:border-gray-200">
                <div className="flex items-center gap-4">
                    <img
              src="./img-prod/chair1.jpeg"
              alt=""
              className="rounded-xl w-20 h-30"
            />
                
            <div className="text-sm text-[#447F98] font-medium cursor-pointer">Syltherine
            <p className="text-base text-gray-500 font-normal">Stylish comfy chair</p>
            </div>
            </div>
            <p className="text-md font-medium">$1,500</p>
            <p className="text-md text-gray-600">x1</p>
            <p className="text-md font-medium">$1,500</p>
            </div>

            <div className="grid grid-cols-4 p-4 mt-5">
                <div className="flex items-center gap-4">
                    <img
              src="./img-prod/chair1.jpeg"
              alt=""
              className="rounded-xl w-20 h-30"
            />
                
            <div className="text-sm text-[#447F98] font-medium cursor-pointer">Syltherine
            <p className="text-base text-gray-500 font-normal">Stylish comfy chair</p>
            </div>
            </div>
            <p className="text-md font-medium">$1,500</p>
            <p className="text-md text-gray-600">x1</p>
            <p className="text-md font-medium">$1,500</p>
            </div>


            <div className="grid grid-cols-3 relative p-4 mt-10 border-t border-gray-200 font-semibold">
            <div className="text-xl">Billing Address
                <div className="text-base mt-5">Kevin Gilbert</div>
                <div className="text-base text-gray-500">999/9 Rama I Rd,Pathum Wan, Bangkok 10330 Thailand</div>
                <div className="text-base">Phone Number:<span className="text-gray-500"> +66-234-5678</span></div>
                <div className="text-base">Email:<span className="text-gray-500"> kevin.gilbert@gmail.com</span></div>
            </div>
            <div className="text-xl">Shipping Address
                <div className="text-base mt-5">Kevin Gilbert</div>
                <div className="text-base text-gray-500">999/9 Rama I Rd,Pathum Wan, Bangkok 10330 Thailand</div>
                <div className="text-base">Phone Number:<span className="text-gray-500"> +66-234-5678</span></div>
                <div className="text-base">Email:<span className="text-gray-500"> kevin.gilbert@gmail.com</span></div>
            </div>
            
            <div className="text-xl">Order Notes
                <p className="text-base text-gray-500 mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quidem esse illo earum omnis voluptatem dignissimos corporis unde tenetur nesciunt!</p>
            </div>

            </div>

    </div>
  )
}

export default OrderHistoryCard 