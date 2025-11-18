import { createContext } from "react";

export interface LoginContextType {
  token: string;
  username: string;
  logIn: (token: string, username: string) => void;
  logOut: () => void;
}

export const LoginContext = createContext<LoginContextType>({
  token: "",
  username: "",
  logIn: () => {},
  logOut: () => {},
});