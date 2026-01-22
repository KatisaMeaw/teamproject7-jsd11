import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import CreateItemModal from "./CreateItemModal";
import EditProductModal from "./EditProductModal";
import DeleteItemModal from "./DeleteItemModal";
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
  const [itemToDelete, setItemToDelete] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "An error occurred while saving the data.",
        );
      }

      fetchData();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert(`Can not fill up the product: ${error.message}`);
    }
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const response = await fetch(`${API_URL}/products/${updatedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) throw new Error("Update failed");

      fetchData();
      alert("Data updated successfully!");
    } catch (error) {
      console.error(error);
      alert("The information cannot be edited.");
    }
  };

  const removeDeletedItemFromState = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

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
              {items.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-5">
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
                    <td className="p-5 text-right">
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
                        onDelete={(val) => setItemToDelete(val)}
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
            title="Product Details"
            showFooter={false}
          >
            <div className="space-y-4">
              {activeProduct?.image && (
                <div className="relative w-full overflow-hidden rounded-xl bg-gray-100 group">
                  <div className="aspect-video w-full sm:aspect-square md:h-72 lg:h-80">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {activeProduct?.name}
                </h3>
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-blue-100 text-blue-800 rounded-full">
                  {activeProduct?.category}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Description
                  </p>
                  <p className="text-gray-700">
                    {activeProduct?.description || "No description provided."}
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">
                      Current Price
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      ${activeProduct?.price}
                    </p>
                  </div>
                  {activeProduct?.originalPrice && (
                    <div className="border-l border-blue-200 pl-4">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Original
                      </p>
                      <p className="text-lg text-gray-400 line-through">
                        ${activeProduct?.originalPrice}
                      </p>
                    </div>
                  )}
                  {activeProduct?.discount > 0 && (
                    <div className="ml-auto">
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                        -{activeProduct.discount}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-3 bg-gray-100 rounded-lg text-[10px] text-gray-500">
                    <span className="block font-bold uppercase">
                      Database ID:
                    </span>
                    <span className="font-mono">
                      {activeProduct?._id || activeProduct?.id}
                    </span>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg text-[10px] text-gray-500">
                    <span className="block font-bold uppercase">Added On:</span>
                    <span>
                      {activeProduct?.createdAt
                        ? new Date(activeProduct.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveProduct(null)}
                className="w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200"
              >
                Close
              </button>
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

          {/* Delete Confirmation Modal */}
          <DeleteItemModal
            isOpen={!!itemToDelete}
            onClose={() => setItemToDelete(null)}
            item={itemToDelete}
            onDeleteSuccess={removeDeletedItemFromState}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
