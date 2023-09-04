import { useState } from 'react';
import { InventoryMainTableRow } from './InventoryMainTableRow';

export function InventoryMainTable({ items, locations, setItems }) {

  // const [isLoading, setIsLoading] = useState(false);

  return (
    <table className="container text-center w-full">
      <thead className="border text-xl font-bold capitalize bg-slate-400">
        <tr>
          <th className="border border-solid  border-black p-1">SKU</th>
          <th className="border border-solid  border-black p-1">Description</th>
          <th className="border border-solid  border-black p-1">Brand</th>
          <th className="border border-solid  border-black p-1">Type</th>
          <th className="border border-solid  border-black p-1">Total</th>
          <th className="border border-solid  border-black p-1">Lost</th>
          {locations.map((location) => (
            <th className="border border-solid  border-black p-1" key={location.id}>
              {location.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {/* {isLoading && (
          <tr>
            <td colSpan={10} className="text-black text-l font-bold py-4">
              Loading...
            </td>
          </tr>
        )} */}
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
