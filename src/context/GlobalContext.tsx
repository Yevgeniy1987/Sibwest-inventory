import {
  useContext,
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

type ItemLocationType = {
  locationId: number;
  quantity: number;
};

export type ItemType = {
  sku: string;
  description: string;
  brand: string;
  type: string;
  total: number;
  lost: number;
  id: number;
  locations: ItemLocationType[];
};

export type LocationType = {
  id: number;
  name: string;
  address: string;
};

export type HistoryType = {
  itemId: number;
  createdAt: string;
  date: string;
  stockInLocationId: number;
  stockOutLocationId: number;
  quantity: number;
  type: "movement" | "purchase" | "sale" | "discarding" | "lost" | "add";
  id: number;
};

type GlobalStateType = {
  items: ItemType[];
  locations: LocationType[];
  histories: HistoryType[];
};

type ProviderProps = {
  children: ReactNode;
};

const initialState: GlobalStateType = {
  items: [],
  locations: [],
  histories: [],
};

export const GlobalContext = createContext(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [] as [GlobalStateType, Dispatch<SetStateAction<GlobalStateType>>]
);

export const GlobalProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useState(initialState);

  return (
    <GlobalContext.Provider value={[state, setState]}>
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalState = () => {
  return useContext(GlobalContext);
};
