import { ItemType } from "../../context/GlobalContext";
import { State } from "../store";

export const itemsSelector = (state: State): ItemType[] => state.items;