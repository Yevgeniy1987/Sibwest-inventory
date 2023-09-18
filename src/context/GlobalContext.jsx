import { useContext, createContext, useState } from "react";

export const GlobalContext = createContext();

const InitialState = {
  items: [],
  locations: [],
  histories: [],
}

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(InitialState);
  return (
    <GlobalContext.Provider value={[state, setState]}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalState = () => {
  return useContext(GlobalContext);
};
