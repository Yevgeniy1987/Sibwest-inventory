import { useSelector } from "react-redux";
import { HistoryType } from "../context/GlobalContext";
import { locationsSelector } from "../redux/selectors/locations";
import { itemsSelector } from "../redux/selectors/items";

export function HistoryTableRow({ history }: { history: HistoryType }) {
  const locations = useSelector(locationsSelector);
  const items = useSelector(itemsSelector);
  // const [state] = useGlobalState();
 
  // const items = state.items;
  // const locations = state.locations;

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
    <tr className=" text-black border border-solid border-white p-1 hover:bg-gray-300 font-medium">
      <td className="border border-solid border-black p-1">
        {new Date(createdAt).toLocaleString()}
      </td>
      <td className="border border-solid  border-black p-1">
        {date ? new Date(date).toLocaleDateString() : "N/A"}
      </td>
      <td className="border border-solid  border-black p-1">
        {item?.sku || "N/A"}
      </td>
      <td className="border border-solid  border-black p-1">
        {item?.description || "N/A"}
      </td>
      <td className="border border-solid  border-black p-1">{type}</td>
      <td className="border border-solid  border-black p-1">
        {stockInLocation?.name || "N/A"}
      </td>
      <td className="border border-solid  border-black p-1">
        {stockOutLocation?.name || "N/A"}
      </td>
      <td className="border border-solid  border-black p-1">{quantity}</td>
    </tr>
  );
}
