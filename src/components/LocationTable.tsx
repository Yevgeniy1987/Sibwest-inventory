import { useState } from "react";

import { LocationTableRow } from "./LocationTableRow";
// import { useGlobalState } from "../context/GlobalContext";
import { AddLocation } from "./AddLocation";
import { locationsSelector } from "../redux/selectors/locations";
import { useSelector } from "react-redux";

export function LocationTable() {
  const locations = useSelector(locationsSelector);

  // const [state] = useGlobalState();
  // const locations = state.locations;

  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);

  return (
    <>
      <div className="mb-3 flex justify-center gap-3">
        <button onClick={() => setIsAddLocationOpen((p) => !p)}>
          {isAddLocationOpen ? "Hide" : "Open"} Add location
        </button>
      </div>

      {isAddLocationOpen && <AddLocation />}

      <table className="w-full container">
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
            <LocationTableRow key={location.id} location={location} />
          ))}
        </tbody>
      </table>
    </>
  );
}
