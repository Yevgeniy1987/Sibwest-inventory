import { LocationType } from "../../context/GlobalContext";
import { State } from "../store";

export const locationsSelector = (state: State): LocationType[] => state.locations;