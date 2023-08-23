import type { Book } from "../types/books";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
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
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  loadData: () => Promise<void>;
  makeFriendlyUrl: (title: string) => string;
  totalCartPrice: number;
}

export const BookContext = React.createContext<Context>({
  books: [],
  filteredBook: [],
  setFilteredBook: () => undefined,
  cartList: [],
  setBooks: () => undefined,
  setCartList: () => undefined,
  isError: false,
  setIsError: () => undefined,
  errorMessage: "",
  setErrorMessage: () => undefined,
  loadData: () => Promise.resolve(),
  makeFriendlyUrl: (title: string) => title,
  totalCartPrice: 0,
});

export function BookProvider({ children }: { children?: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("cartList") || "[]") as Book[]
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [filteredBook, setFilteredBook] = useState<Book[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  const loadData = useCallback(async () => {
    try {
      setIsError(false);
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        setErrorMessage(ErrorMessages.LOAD_BOOKS);
        setIsError(true);
      }
      const data = (await response.json()) as Book[];
      setBooks(data);
    } catch (error: unknown) {
      setIsError(true);
      setErrorMessage(ErrorMessages.LOAD_BOOKS);
    }
  }, []);

  const makeFriendlyUrl = useMemo(() => {
    return (title: string) => {
      return title.replace(/[:\s,]+/g, "-").toLowerCase();
    };
  }, []);

  const totalCartPrice = useMemo(() => {
    return Number(cartList
      .reduce((total, book) => total + (book.totalPrice || 0), 0)
      .toFixed(2));
  }, [cartList]);

  const contextValue = useMemo(() => {
    return {
      books,
      setBooks,
      cartList,
      setCartList,
      isError,
      setIsError,
      filteredBook,
      setFilteredBook,
      errorMessage,
      setErrorMessage,
      loadData,
      makeFriendlyUrl,
      totalCartPrice,
    };
  }, [
    books,
    cartList,
    isError,
    filteredBook,
    errorMessage,
    loadData,
    makeFriendlyUrl,
    totalCartPrice,
  ]);

  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
}
