import { LocationTableRow } from "./LocationTableRow";
import { useGlobalState } from "../context/GlobalContext";

export function LocationTable() {
const [state] = useGlobalState();
const locations = state.locations;

  return (
    <table className="text-center w-full container">
      <thead className="border text-xl font-bold capitalize bg-slate-400">
        <tr>
          <th className="border border-solid border-black text-xl font-bold capitalize bg-slate-400">
            Location
          </th>
          <th className="border border-solid border-black text-xl font-bold capitalize bg-slate-400">
            Address
          </th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <LocationTableRow
            key={location.id}
            location={location}
            
          />
        ))}
      </tbody>
    </table>

  );
}
