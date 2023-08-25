export function HistoryTableRow({ history, setHistories }) {
  const {
    id,
    itemId,
    createdAt,
    date,
    stockInLocationId,
    stockOutLocationId,
    quantity
  } = history;
  return (
    <tr>
      <td className="border">{createdAt}</td>
      <td className="border">{date}</td>
      <td className="border">{itemId}</td>
      <td className="border">{stockInLocationId}</td>
      <td className="border">{stockOutLocationId}</td>
      <td className="border">{quantity}</td>
      <td>
      </td>
    </tr>
  );
}
