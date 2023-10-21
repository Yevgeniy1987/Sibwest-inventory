import { HistoryType } from "../../context/GlobalContext";
import { HistoriesAction, SET_HISTORIES } from "../actions/histories";

const initialState: HistoryType[] = [];

export const historiesReducer = (
  state = initialState,
  action: HistoriesAction
) => {
  switch (action.type) {
    case SET_HISTORIES: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
