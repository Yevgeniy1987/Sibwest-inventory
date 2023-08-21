import { LocationTableRow } from "./LocationTableRow";

export function LocationTable({ locations, setLocations }) {
  return (
    <table className="text-center w-full">
      <thead className="border text-xl capitalize bg-slate-300">
        <tr>
          <th className="border">Location</th>
          <th className="border">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <LocationTableRow
            key={location.id}
            location={location}
            setLocations={setLocations}
          />
        ))}
      </tbody>
    </table>

    // <>
    //   <select name="location" id={locationid}>
    //     {name}
    //   </select>
    //   <td className="border">{quantity}</td>
    // </>
  );
}
