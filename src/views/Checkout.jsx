import React, { useState } from 'react';

// แยก Component ย่อยเพื่อความสะอาดของ Code
const FormInput = ({ label, id, type = "text", placeholder, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
      placeholder={placeholder}
      {...props}
    />
  </div>
);

const Checkout = () => {
  // 1. จัดการ State ของ Form ทั้งหมดในที่เดียว
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    city: '',
    province: 'Western Province',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
    paymentMethod: 'direct-bank'
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Data Submitted:", formData);
    // ส่งข้อมูลไปที่ API
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">

        {/* Left Side: Billing Details */}
        <div className="lg:w-3/5">
          <h2 className="text-3xl font-medium mb-10">Billing details</h2>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <FormInput label="First Name" id="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <FormInput label="Last Name" id="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>
          </div>

          <FormInput label="Company Name (Optional)" id="companyName" value={formData.companyName} onChange={handleInputChange} />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Country / Region</label>
            <select
              id="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 outline-none"
            >
              <option>Sri Lanka</option>
              <option>Thailand</option>
            </select>
          </div>

          <FormInput label="Street address" id="streetAddress" value={formData.streetAddress} onChange={handleInputChange} />
          <FormInput label="Town / City" id="city" value={formData.city} onChange={handleInputChange} />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Province</label>
            <select
              id="province"
              value={formData.province}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 outline-none"
            >
              <option>Western Province</option>
              <option>Bangkok</option>
            </select>
          </div>

          <FormInput label="ZIP code" id="zipCode" value={formData.zipCode} onChange={handleInputChange} />
          <FormInput label="Phone" id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
          <FormInput label="Email address" id="email" type="email" value={formData.email} onChange={handleInputChange} />

          <div className="mb-4">
            <textarea
              id="additionalInfo"
              placeholder="Additional Information"
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 outline-none resize-none h-24"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-2/5 bg-gray-50 p-8 rounded-lg h-fit border border-gray-100">
          <div className="flex justify-between items-center text-xl font-medium mb-8">
            <span>Product</span>
            <span>Subtotal</span>
          </div>

          <div className="flex justify-between items-center mb-4 text-gray-600 text-sm">
            <span>Kruzo aero <span className="text-xs text-gray-400">x 1</span></span>
            <span>Rs. 250,000.00</span>
          </div>

          <div className="border-t border-gray-300/50 pt-4 mb-4">
            <div className="flex justify-between items-center text-base">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">Rs. 250,000.00</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8 text-xl">
            <span className="font-bold">Total</span>
            <span className="font-bold text-blue-600">Rs. 250,000.00</span>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="direct-bank"
                checked={formData.paymentMethod === 'direct-bank'}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4"
              />
              <div>
                <span className="text-sm font-medium">Direct Bank Transfer</span>
                {formData.paymentMethod === 'direct-bank' && (
                  <p className="text-xs text-gray-500 mt-2">
                    Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                  </p>
                )}
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              <span className="text-sm">Cash On Delivery</span>
            </label>
          </div>

          <p className="text-xs text-gray-500 mt-6 leading-relaxed">
            Your personal data will be used to support your experience throughout this website... 
            <a href="#" className="font-medium text-black underline">privacy policy</a>.
          </p>

          <button type="submit" className="w-full mt-8 border-2 border-black py-3 px-12 rounded-lg hover:bg-black hover:text-white transition-all font-medium">
            Place order
          </button>
        </div>

      </form>
    </main>
  );
};

export default Checkout;