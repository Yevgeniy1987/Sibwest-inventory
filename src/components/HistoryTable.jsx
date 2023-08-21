import { HistoryTableRow } from "./HistoryTableRow";

export function HistoryTable({ histories, setHistories }) {
  return (
    <table className="text-center w-full">
      <thead className="border text-xl capitalize bg-slate-300">
        <tr>
          <th className="border">createdAt</th>
          <th className="border">date</th>
          <th className="border">itemId</th>
          <th className="border">stockInLocationId</th>
          <th className="border">stockOutLocationId</th>
          <th className="border">quantity</th>
          
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
