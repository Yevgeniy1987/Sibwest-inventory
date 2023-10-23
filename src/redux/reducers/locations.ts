import { LocationType } from "../../context/GlobalContext";
import {
  ADD_LOCATION,
  LocationsAction,
  SET_LOCATIONS,
} from "../actions/locations";

const initialState: LocationType[] = [];

export const locationsReducer = (
  state = initialState,
  action: LocationsAction
) => {
  switch (action.type) {
    case SET_LOCATIONS: {
      return action.payload;
    }
    case ADD_LOCATION: {
      const newState = [...state, action.payload];
      return newState;
    }
    default: {
      return state;
    }
  }
};
