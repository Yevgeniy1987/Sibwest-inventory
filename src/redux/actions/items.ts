import { ItemType } from '../../context/GlobalContext';
import { api } from '../../service/api';

export const SET_ITEMS = 'SET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export type ItemsAction = {
  type: string;
  payload: ItemType | ItemType[];
};

export const setItems = (items: ItemType[]) => {
  return {
    type: SET_ITEMS,
    payload: items
  };
};

export const addItem = (item: ItemType) => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export const updateItem = (item: ItemType) => {
  return {
    type: UPDATE_ITEM,
    payload: item
  };
};

export const setItemsThunk = (queryString: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return async (dispatch) => {
    const [items, itemsError] = await api.get<ItemType[]>(
      `/items?${queryString}`
    );

    if (!itemsError) {
      dispatch(setItems(items));
    }
  };
};
