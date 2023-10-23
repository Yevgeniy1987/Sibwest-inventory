import { HistoryType } from "../../context/GlobalContext";
import {
  ADD_HISTORIES,
  HistoriesAction,
  SET_HISTORIES,
} from "../actions/histories";

const initialState: HistoryType[] = [];

export const historiesReducer = (
  state = initialState,
  action: HistoriesAction
) => {
  switch (action.type) {
    case SET_HISTORIES: {
      return action.payload;
    }
    case ADD_HISTORIES: {
      const newState = [...state, action.payload];
      return newState;
    }

    default: {
      return state;
    }
  }
};
