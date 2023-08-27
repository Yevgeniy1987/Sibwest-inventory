export function LocationTableRow({ location }) {
  const { name, locationId, address } = location || {};
  return (
    <tr>
      <td className="text-white border border-solid border-white p-1 hover:bg-amber-400 font-medium">
        {name}
      </td>
      <td className="text-white border border-solid border-white p-1 hover:bg-amber-400 font-medium">
        {address}
      </td>
    </tr>
  );
}
