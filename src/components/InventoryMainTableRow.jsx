export function InventoryMainTableRow({ item, locations, setItems }) {
  const { sku, description, brand, type, total, lost, locations: itemLocations } = item;

  const itemLocationObject = Object.fromEntries(itemLocations.map(itemLocation => [itemLocation.locationId, itemLocation.quantity]));

  return (
      <tr className="text-white border border-solid border-white p-1 hover:bg-amber-200 font-medium">
        <td className="border border-solid border-white p-1">{sku}</td>
        <td className="border border-solid border-white p-1">{description}</td>
        <td className="border border-solid border-white p-1">{brand}</td>
        <td className="border border-solid border-white p-1">{type}</td>
        <td className="border border-solid border-white p-1">{total}</td>
        <td className="border border-solid border-white p-1">{lost}</td>
        {locations.map((location) => (
          <td className="border border-solid border-white p-1" key={location.id}>
            {itemLocationObject[location.id] ?? "???"}
          </td>
        ))}
      </tr>
    
  );
}
