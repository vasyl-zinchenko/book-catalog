import type { Book } from "../types/books";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ErrorMessages } from "../types/enums";
const BASE_URL = "https://books-ciklum-default-rtdb.firebaseio.com/books.json";

interface Context {
  books: Book[];
  cartList: Book[];
  filteredBook: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
  setCartList: Dispatch<SetStateAction<Book[]>>;
  setFilteredBook: Dispatch<SetStateAction<Book[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  loadData: () => Promise<void>;
}

export const BookContext = React.createContext<Context>({
  books: [],
  filteredBook: [],
  setFilteredBook: () => undefined,
  cartList: [],
  setBooks: () => undefined,
  setCartList: () => undefined,
  isLoading: true,
  setIsLoading: () => undefined,
  isError: false,
  setIsError: () => undefined,
  errorMessage: "",
  setErrorMessage: () => undefined,
  loadData: async () => {},
});

export function BookProvider({ children }: { children?: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [cartList, setCartList] = useState<Book[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [filteredBook, setFilteredBook] = useState<Book[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cartList");
    if (storedCart) {
      const parsedCartList = JSON.parse(storedCart) as Book[];
      setCartList(parsedCartList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        setErrorMessage(ErrorMessages.LOAD_BOOKS);
        console.log("erg");
        setIsError(true);
      }

      const data = await response.json();

      setBooks(data);
      console.log("ok");
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(ErrorMessages.LOAD_BOOKS);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = useMemo(() => {
    return {
      books,
      setBooks,
      cartList,
      setCartList,
      isLoading,
      setIsLoading,
      isError,
      setIsError,
      filteredBook,
      setFilteredBook,
      errorMessage,
      setErrorMessage,
      loadData,
    };
  }, [books, cartList, isLoading, isError, filteredBook, errorMessage]);

  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
}
