import React, { useState } from "react";
import Modal from "./Modal";
import CreateItemModal from "./CreateItemModal";
import EditProductModal from "./EditProductModal";
import ActionDropdown from "./ActionDropdown";

const products = [
  {
    id: 1,
    name: "MacBook Pro",
    price: "$2,499",
    desc: "M3 Max Chip, 32GB RAM",
  },
  { id: 2, name: "iPad Pro", price: "$999", desc: "Ultra Retina XDR Display" },
  { id: 3, name: "Magic Mouse", price: "$79", desc: "Multi-Touch Surface" },
];

function ProductTable() {
  const [activeProduct, setActiveProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(products);
  const [editingItem, setEditingItem] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const handleAddItem = (newItem) => {
    // In a real app, you would make an API call here
    const itemWithId = { ...newItem, id: Date.now() };
    setItems([...items, itemWithId]);
    console.log("New Item Added:", itemWithId);
  };

  const handleUpdate = (updatedItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
    console.log("Updated database with:", updatedItem);
  };

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
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4" key={index}>
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.id}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.name}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.price}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <ActionDropdown
                        item={item}
                        isOpen={activeMenuId === item.id}
                        onToggle={() =>
                          setActiveMenuId(
                            activeMenuId === item.id ? null : item.id,
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
                {activeProduct?.price}
              </p>
              <p className="text-gray-600">{activeProduct?.desc}</p>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                Product ID: {activeProduct?.id}
              </div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                Name: {activeProduct?.name}
              </div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                Price: {activeProduct?.price}
              </div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                Description: {activeProduct?.desc}
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
