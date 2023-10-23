import { HistoryType } from "../../context/GlobalContext";
import { State } from "../store";

export const historiesSelector = (state: State): HistoryType[] => state.histories;
