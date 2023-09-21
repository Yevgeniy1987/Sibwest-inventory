import { useContext, createContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

export const AuthContext = createContext();

const accessToken = window.localStorage.getItem('token');

const initialState = {
  isLogged: !!accessToken,
  accessToken,
  user: {}
}

export const AuthProvider = ({ children }) => {
  const [location, setLocation] = useLocation();
  const [state, setState] = useState(initialState);

  if (location !== '/login' && !state.isLogged) {
    setLocation('/login');
  }

  if (location === '/login' && state.isLogged) {
    setLocation('/main');
  }
  
  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  return useContext(AuthContext);
};
