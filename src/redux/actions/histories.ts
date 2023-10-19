import { HistoryType } from "../../context/GlobalContext";

export const SET_HISTORIES = "SET_HISTORIES";
export const ADD_HISTORIES = "ADD_HISTORIES";

export type HistoriesAction = {
    type: string;
    payload: HistoryType | HistoryType[];
  };

export const setHistories = (histories: HistoryType[]) => {
  return {
    type: SET_HISTORIES,
    payload: histories,
  };
};

export const addHistory = (history: HistoryType) => {
  return {
    type: ADD_HISTORIES,
    payload: history,
  };
};
