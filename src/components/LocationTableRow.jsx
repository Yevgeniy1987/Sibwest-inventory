export function LocationTableRow({ location }) {
  const { name, locationId, address } = location || {};
  return (
    <tr className="hover:bg-amber-200 font-medium">
      <td className="border">{name}</td>
      <td className="border">{address}</td>
    </tr>
  );
}
