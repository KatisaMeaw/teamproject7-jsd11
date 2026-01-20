import { useState } from "react";
import ReactDOM from "react-dom";

const CreateItemModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Send data to parent
    setFormData({ name: "", category: "", price: "" }); // Reset form
    onClose(); // Close modal
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm ">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            Add New Product
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              required
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Wireless Headphones"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              required
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              required
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Description"
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all"
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default CreateItemModal;
