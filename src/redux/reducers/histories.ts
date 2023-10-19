import { HistoryType } from "../../context/GlobalContext";

const initialState: HistoryType[] = [];

export const historiesReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
