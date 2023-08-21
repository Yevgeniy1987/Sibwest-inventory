import { useState } from "react";

export function InventoryMainTableRow({ item, setItems }) {
  const { id, description, brand, type, total, lost, location } = item;
  const { name, locationId, quantity } = location || {};

  const [locationValue, setLocationValue] = useState([]);

  return (
   
      <tr className="hover:bg-amber-200 font-medium">
        <td className="border">{description}</td>
        <td className="border">{brand}</td>
        <td className="border">{type}</td>
        <td className="border">{total}</td>
        <td className="border">{lost}</td>
        <td className="border">{quantity}</td>
        <select name="location">
          <option value="">Oakville</option>
          <option value="">Scarborough</option>
          <option value="">Kingston</option>
        </select>
      </tr>
    
  );
}
