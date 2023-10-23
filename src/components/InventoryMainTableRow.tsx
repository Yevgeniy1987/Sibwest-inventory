import { useSelector } from "react-redux";
import { ItemType } from "../context/GlobalContext";
import { locationsSelector } from "../redux/selectors/locations";

export function InventoryMainTableRow({ item }: { item: ItemType }) {
  // const dispatch = useDispatch();
  const locations = useSelector(locationsSelector);

  // const [state] = useGlobalState();
  // const locations = state.locations;

  const {
    sku,
    description,
    brand,
    type,
    total,
    lost,
    locations: itemLocations,
  } = item;

  const itemLocationObject = Object.fromEntries(
    itemLocations.map((itemLocation) => [
      itemLocation.locationId,
      itemLocation.quantity,
    ])
  );

  return (
    <tr className="text-black border border-solid border-white p-1 hover:bg-gray-300 font-medium">
      <td className="border border-solid  border-black p-1">{sku}</td>
      <td className="border border-solid  border-black p-1">{description}</td>
      <td className="border border-solid  border-black p-1">{brand}</td>
      <td className="border border-solid  border-black p-1">{type}</td>
      <td className="border border-solid  border-black p-1">{total}</td>
      <td className="border border-solid  border-black p-1">{lost}</td>
      {locations.map((location) => (
        <td className="border border-solid  border-black p-1" key={location.id}>
          {itemLocationObject[location.id] ?? "???"}
        </td>
      ))}
    </tr>
  );
}
