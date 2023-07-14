import styles from "./bookslist.module.scss";
import { BookContext } from "../../context/BooksContext";
import { useContext, useState, useEffect } from "react";
import { BookItem } from "../../components/BookItem";
import { Filter } from "../../components/Filter";
import { Loader } from "../../components/Loader";
import { WarningMessage } from "../../components/Error";

export const BooksList = () => {
  const { filteredBook, isError, errorMessage, loadData } =
    useContext(BookContext);
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    setIsLocalLoading(true);
    loadData().finally(() => {
      setIsLocalLoading(false);
    });
  }, [loadData]);

  return (
    <>
      {!isLocalLoading && !isError && (
        <>
          <h1 className={styles.books_list__headline}>Programming books</h1>

          <p className={styles.books_list__count}>
            Books: {filteredBook.length}
          </p>
          <Filter />
          <div className={styles.main}>
            {filteredBook.map((book) => (
              <BookItem book={book} key={book.id} />
            ))}
          </div>
          {filteredBook.length === 0 && !isLocalLoading && (
            <p className={styles.books_list__notfound}>
              No books found with the given parameters
            </p>
          )}
        </>
      )}
      {isLocalLoading && <Loader />}

      {isError && !isLocalLoading && (
        <WarningMessage>{errorMessage}</WarningMessage>
      )}
    </>
  );
};
