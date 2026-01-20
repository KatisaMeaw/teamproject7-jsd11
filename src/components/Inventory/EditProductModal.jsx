import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const EditProductModal = ({ isOpen, onClose, onSubmit, item }) => {
  // Initialize state with empty values
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    desc: "",
  });

  // Update internal state whenever the 'item' prop changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        category: item.category || "",
        price: item.price || "",
        desc: item.desc || "",
      });
    }
  }, [item]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...item, ...formData }); // Merge ID/existing data with new edits
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Edit {item?.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              required
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
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
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
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
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
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
              placeholder="Enter Description"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default EditProductModal;
