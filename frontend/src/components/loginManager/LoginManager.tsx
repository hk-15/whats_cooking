import {
  createContext,
  useEffect,
  useState,
  type JSX,
  type ReactNode,
} from "react";

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

interface LoginManagerProps {
  children: ReactNode;
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
  const [, setToken] = useState("");
  const [, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const username = localStorage.getItem("username") || "";
    setToken(token);
    setUsername(username);
  }, []);

  function logIn(token: string, username: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setToken(token);
    setUsername(username);
  }

  function logOut() {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    setToken("");
    setUsername("");
  }

  function generateContextObject() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    return {
      token: token ? token : "",
      username: username ? username : "",
      logIn: logIn,
      logOut: logOut,
    };
  }

  return (
    <LoginContext.Provider value={generateContextObject()}>
      {props.children}
    </LoginContext.Provider>
  );
}
