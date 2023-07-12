import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Context {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

export const UserContext = React.createContext<Context>({
  username: "",
  setUsername: () => undefined,
});

export function UserProvider({ children }: { children?: ReactNode }) {
   const [username, setUsername] = useState<string>(() => {
     const storedUsername = localStorage.getItem("username");
     return storedUsername || "";
   });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (username && location.pathname === "/signin") {
      navigate("/books");
    }
  }, [username, location, navigate]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("username");
  //   if (!storedUsername) {
  //     localStorage.setItem("username", username);
  //   }
  // }, [username]);

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
