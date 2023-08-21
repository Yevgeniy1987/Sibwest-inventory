import { InventoryMainTableRow } from "./InventoryMainTableRow";

export function InventoryMainTable({ items, setItems }) {
  return (
    <table className="text-center w-full">
      <thead className="border text-xl capitalize bg-slate-300">
        <tr>
          <th className="border">Description</th>
          <th className="border">Brand</th>
          <th className="border">Type</th>
          <th className="border">Total</th>
          <th className="border">Lost</th>
          
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <InventoryMainTableRow
            key={item.id}
            item={item}
            setItems={setItems}
            
          />
        ))}
      </tbody>
    </table>
  );
}
