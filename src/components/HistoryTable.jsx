import { HistoryTableRow } from "./HistoryTableRow";

export function HistoryTable({ histories, locations, items, setItems }) {
  return (
    <table className="text-center w-full">
      <thead className="border text-xl font-bold capitalize bg-slate-400">
        <tr>
          <th className="border border-solid border-white p-1">Created Date</th>
          <th className="border border-solid border-white p-1">Date</th>
          <th className="border border-solid border-white p-1">SKU</th>
          <th className="border border-solid border-white p-1">Item Description</th>
          <th className="border border-solid border-white p-1">Action Type</th>
          <th className="border border-solid border-white p-1">Stock In Location</th>
          <th className="border border-solid border-white p-1">Stock Out Location</th>
          <th className="border border-solid border-white p-1">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {histories.map((history) => (
          <HistoryTableRow
            key={history.id}
            history={history}
            locations={locations}
            items={items}
          />
        ))}
      </tbody>
    </table>
  );
}
