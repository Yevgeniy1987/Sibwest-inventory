export function InventoryMainTableRow({ item, locations, setItems }) {
  const { sku, description, brand, type, total, lost, locations: itemLocations } = item;

  const itemLocationObject = Object.fromEntries(itemLocations.map(itemLocation => [itemLocation.locationId, itemLocation.quantity]));

  return (
      <tr className="hover:bg-amber-200 font-medium">
        <td className="border">{sku}</td>
        <td className="border">{description}</td>
        <td className="border">{brand}</td>
        <td className="border">{type}</td>
        <td className="border">{total}</td>
        <td className="border">{lost}</td>
        {locations.map((location) => (
          <td className="border" key={location.id}>
            {itemLocationObject[location.id] ?? "???"}
          </td>
        ))}
      </tr>
    
  );
}
