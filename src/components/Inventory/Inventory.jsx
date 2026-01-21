import React from "react";
import ProductTable from "../Inventory/ProductTable";

function Inventory() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="xl:col-span-2">
          <ProductTable />
        </div>
      </div>
    </div>
  );
}

export default Inventory;
