import { HistoryTableRow } from "./HistoryTableRow";

export function HistoryTable({ histories, setHistories, item, setItems }) {
  return (
    <table className="text-center w-full">
      <thead className="border text-xl font-bold capitalize bg-slate-400">
        <tr>
          <th className="border border-solid border-white p-1">createdAt</th>
          <th className="border border-solid border-white p-1">date</th>
          <th className="border border-solid border-white p-1">SKU</th>
          <th className="border border-solid border-white p-1">Action Type</th>
          <th className="border border-solid border-white p-1">stockInLocationId</th>
          <th className="border border-solid border-white p-1">stockOutLocationId</th>
          <th className="border border-solid border-white p-1">quantity</th>
        </tr>
      </thead>
      <tbody>
        {histories.map((history) => (
          <HistoryTableRow
            key={history.id}
            history={history}
            setHistories={setHistories}
           
          />
        ))}
      </tbody>
    </table>
  );
}
