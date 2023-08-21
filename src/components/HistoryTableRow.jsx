export function HistoryTableRow({ history, setHistories }) {
  const [
    id,
    itemId,
    createdAt,
    date,
    stockInLocationId,
    stockOutLocationId,
    quantity,
  ] = history;
  return (
    <table className="text-center w-full">
      <thead className="border text-xl capitalize bg-slate-300">
        <tr>
          <td className="border">{createdAt}</td>
          <td className="border">{date}</td>
          <td className="border">{itemId}</td>
          <td className="border">{stockInLocationId}</td>
          <td className="border">{stockOutLocationId}</td>
          <td className="border">{quantity}</td>
          <select className="border">
            type
            <option value="">movement</option>
            <option value="">purchase</option>
            <option value="">sale</option>
            <option value="">discarding</option>
            <option value="">lost</option>
            <option value="">add</option>
          </select>
        </tr>
      </thead>
    </table>
  );
}
