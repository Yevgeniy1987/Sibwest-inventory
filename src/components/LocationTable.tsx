import { useState } from "react";

import { LocationTableRow } from "./LocationTableRow";
// import { useGlobalState } from "../context/GlobalContext";
import { AddLocation } from "./AddLocation";
import { locationsSelector } from "../redux/selectors/locations";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../service/api";
import { LocationType } from "../context/GlobalContext";
import { setLocations } from "../redux/actions/locations";

export function LocationTable() {
  const dispatch = useDispatch();
  const locations = useSelector(locationsSelector);

  // const [state] = useGlobalState();
  // const locations = state.locations;

  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);

  api
    .get<LocationType[]>(`/locations`)
    .then(([locationsData, locationsError]) => {
      if (locationsData) {
        // setState((state) => ({ ...state, items: itemsData }));
        dispatch(setLocations(locationsData));
      }

      if (locationsError) {
        console.log(locationsError);
      }
    });

  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore
  // dispatch(setItemsThunk(queryString));

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
