import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Router } from '../types/enums';

interface Context {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

export const UserContext = React.createContext<Context>({
  username: "",
  setUsername: () => undefined,
});

export function UserProvider({ children }: { children?: ReactNode }) {

  const [username, setUsername] = useState<string>(localStorage.getItem("username") || "")
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (username && location.pathname === Router.SIGNIN) {
      navigate(Router.BOOKS);
    }
  }, [username, location, navigate]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  const contextValue = useMemo(() => {
    return {
      username,
      setUsername,
    };
  }, [username]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
