import { NavLink } from "./NavLink";
import { Switch, Route } from "wouter";
import { useRoute } from "wouter";
import { useState, useEffect } from "react";

import { LocationTableRow } from "./LocationTableRow";
import { useGlobalState } from "../context/GlobalContext";
import { AddLocation } from "./AddLocation";

export function LocationTable() {
  
  const [state] = useGlobalState();
  const locations = state.locations;

  return (
    <>
      <nav className="mb-3 flex justify-center gap-3">
        <NavLink  href="/location/addLocation">Add location </NavLink>
      </nav>

      <Switch>
        <Route path="/location/addLocation">
          <AddLocation isOpen/>
        </Route>
      </Switch>
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
