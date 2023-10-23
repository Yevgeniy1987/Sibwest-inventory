import { LocationType } from "../../context/GlobalContext";

export const SET_LOCATIONS = "SET_LOCATIONS";
export const ADD_LOCATION = "ADD_LOCATION";

export type LocationsAction = {
    type: string;
    payload: LocationType | LocationType[];
  };

export const setLocations = (locations: LocationType[]) => {
  return {
    type: SET_LOCATIONS,
    payload: locations,
  };
};

export const addLocation = (location: LocationType) => {
  return {
    type: ADD_LOCATION,
    payload: location,
  };
};
