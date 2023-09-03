export function LocationTableRow({ location }) {
  const { name, locationId, address } = location || {};
  return (
    <tr  className= "hover:bg-gray-300 font-medium">
      <td className="text-black border border-solid border-black p-1">
        {name}
      </td>
      <td className="text-black border border-solid border-black p-1">
        {address}
      </td>
    </tr>
  );
}
