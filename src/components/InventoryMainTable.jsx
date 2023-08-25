import { InventoryMainTableRow } from './InventoryMainTableRow';

export function InventoryMainTable({ items, locations, setItems }) {
  return (
    <table className="text-center w-full">
      <thead className="border text-xl capitalize bg-slate-300">
        <tr>
          <th className="border">SKU</th>
          <th className="border">Description</th>
          <th className="border">Brand</th>
          <th className="border">Type</th>
          <th className="border">Total</th>
          <th className="border">Lost</th>
          {locations.map((location) => (
            <th className="border" key={location.id}>
              {location.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <InventoryMainTableRow
            key={item.id}
            item={item}
            setItems={setItems}
            locations={locations}
          />
        ))}
      </tbody>
    </table>
  );
}
