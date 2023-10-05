import { LocationType } from "../context/GlobalContext";

export function LocationTableRow({ location }: { location: LocationType }) {
  const { name, address } = location || {};

  return (
    <tr className="hover:bg-gray-300 font-medium">
      <td className="text-black border border-solid border-black p-1">
        {name}
      </td>
      <td className="text-black border border-solid border-black p-1">
        {address}
      </td>
    </tr>
  );
}
