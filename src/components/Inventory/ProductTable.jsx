import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import CreateItemModal from "./CreateItemModal";
import EditProductModal from "./EditProductModal";
import ActionDropdown from "./ActionDropdown";
import axios from "axios";

function ProductTable() {
  const [activeProduct, setActiveProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setItems(response.data.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = (newItem) => {
    // In a real app, you would make an API call here
    const itemWithId = { ...newItem, id: Date.now() };
    setItems([...items, itemWithId]);
  };

  const handleUpdate = (updatedItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  // const dateConvert = (date) => {
  //   const dateObject = new Date(date);

  //   const options = { year: 'numeric', month: "long", day: "numeric" };

  //   const formattedDate = dateObject.toLocaleDateString(undefined, options);

  //   return formattedDate;
  // }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Product Table */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 min-h-[80vh]">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Products
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                All Product lists
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium"
            >
              + New
            </button>
          </div>
        </div>

        {/* Table */}
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Product ID
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Name
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Category
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Description
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-5" key={index}>
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item._id}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.name}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.description}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.price}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <ActionDropdown
                        item={item}
                        isOpen={activeMenuId === item._id}
                        onToggle={() =>
                          setActiveMenuId(
                            activeMenuId === item._id ? null : item._id,
                          )
                        }
                        onEdit={(val) => setEditingItem(val)}
                        onDetail={(val) => setActiveProduct(val)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* The Modal only renders if activeProduct is not null */}
          <Modal
            isOpen={!!activeProduct}
            onClose={() => setActiveProduct(null)}
            title={activeProduct?.name}
          >
            <div className="space-y-3">
              <p className="text-2xl font-bold text-gray-900">
                {activeProduct?.role}
              </p>
              <p className="text-gray-600">{activeProduct?.desc}</p>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                Product ID: {activeProduct?.id}
              </div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                Name: {activeProduct?.name}
              </div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                Category: {activeProduct?.category}
              </div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                Description: {activeProduct?.description}
              </div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                Price: {activeProduct?.price}
              </div>
            </div>
          </Modal>

          <CreateItemModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddItem}
          />

          <EditProductModal
            isOpen={!!editingItem}
            onClose={() => setEditingItem(null)}
            onSubmit={handleUpdate}
            item={editingItem}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
