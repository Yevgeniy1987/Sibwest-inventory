import { useState } from "react";

useState;
export function HistoryTableRow({ history, locations, items }) {
  const {
    type,
    itemId,
    createdAt,
    date,
    stockInLocationId,
    stockOutLocationId,
    quantity,
  } = history;

  const item = items.find((item) => item.id === itemId);

  const stockInLocation = locations.find(
    (location) => location.id === stockInLocationId
  );
  const stockOutLocation = locations.find(
    (location) => location.id === stockOutLocationId
  );

  return (
    <tr className="text-white border border-solid border-white p-1 hover:bg-amber-200 font-medium">
      <td className="border border-solid border-white p-1">{new Date(createdAt).toLocaleString()}</td>
      <td className="border border-solid border-white p-1">{new Date(date).toLocaleString()}</td>
      <td className="border border-solid border-white p-1">
        {item?.sku || "N/A"}
      </td>
      <td className="border border-solid border-white p-1">
        {item?.description || "N/A"}
      </td>
      <td className="border border-solid border-white p-1">{type}</td>
      <td className="border border-solid border-white p-1">
        {stockInLocation?.name || "N/A"}
      </td>
      <td className="border border-solid border-white p-1">
        {stockOutLocation?.name || "N/A"}
      </td>
      <td className="border border-solid border-white p-1">{quantity}</td>
    </tr>
  );
}
