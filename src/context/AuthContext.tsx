import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLocation } from "wouter";
import { api } from "../service/api";
import { AxiosError, AxiosResponse } from "axios";

export const AuthContext = createContext("");

const accessToken = window.localStorage.getItem("token");

if (accessToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

const userId = window.localStorage.getItem("userId");

type ProviderProps = {
  children: ReactNode;
};

type User = {
  id: number;
  email: string;
  password: string;
};
// type LoggedUser = {
//   user: any;
//   accessToken: any;
//   isLogged?: boolean;
//   userId?: string | null;
//   logIn?: () => void;
//   logOut?: () => void;
// };
const initialState = {
  isLogged: !!accessToken,
  accessToken,
  user: {},
  userId,
  logIn: () => {},
  logOut: () => {},
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const [location, setLocation] = useLocation();
  const [state, setState] = useState(initialState);

  const [initialization, setInitialization] = useState(true);

  useEffect(() => {
    const logIn = (loggedUser: {
      user: any;
      accessToken: any;
      isLogged?: boolean;
      userId?: string | null;
      logIn?: () => void;
      logOut?: () => void;
    }) => {
      setState((state) => ({
        ...state,
        isLogged: true,
        userId: loggedUser.user.id,
        ...loggedUser,
      }));
      window.localStorage.setItem("token", loggedUser.accessToken);
      window.localStorage.setItem("userId", loggedUser.user.id);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${loggedUser.accessToken}`;
    };

    const logOut = () => {
      setState((state) => ({
        ...state,
        isLogged: false,
        accessToken: null,
        userId: null,
        user: {},
      }));
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userId");
      api.defaults.headers.common["Authorization"] = undefined;
    };

    const onResponse = (resp: AxiosResponse): [AxiosResponse["data"], null] => [
      resp.data,
      null,
    ];
    const onError = (error: AxiosError): [null, AxiosError] => {
      if (!error.response || error.response.status === 401) {
        logOut();
      }

      return [null, error];
    };

    api.interceptors.response.use(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onResponse,
      onError
    );

    if (state.userId) {
      api.get<User>(`/users/${userId}`).then(([user]) => {
        if (user) {
          setState((state) => ({ ...state, user }));
        }
      });
    }

    setState((state): LoggedUser => ({ ...state, logIn, logOut }));
    setInitialization(false);
  }, []);

  if (initialization) {
    return <h1>Loading...</h1>;
  }

  if (location !== "/login" && !state.isLogged) {
    setLocation("/login");
  }

  if (location === "/login" && state.isLogged) {
    setLocation("/main");
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

// type User = {
//   name: string;
//   age: number;
// }

// const o: User = {
//   name: 'John',
//   age: 30,
// }

// let age: User['age'];

// age = o.age

// function foo<T>(a: T):T {
//   return a
// }

// const b = foo<string>(1)

// function bar(a:string): string{
//   return a
// }

// let c = bar(1)
