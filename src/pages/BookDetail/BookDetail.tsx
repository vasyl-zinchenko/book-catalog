import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./bookdetail.module.scss";
import "../../styles/main.scss";
import { useParams } from "react-router-dom";
import { BookContext } from "../../context/BooksContext";
import { BookDetailImage } from "../../components/BookDetail/BookDetailImage";
import { BookDetailInfo } from "../../components/BookDetail/BookDetailInfo";
import { BookDetailActions } from "../../components/BookDetail/BookDetailActions";
import { useMediaQuery } from "react-responsive";
import noImage from "../../images/no_img.jpg";
import { NotFound } from "../NotFound";
import { ModalAddedItem } from "../../components/modals/AddedItem";
import { Loader } from "../../components/Loader";

export const BookDetail = () => {
  const { books, loadData, isLoading } = useContext(BookContext);
  const [count, setCount] = useState<number | string>(1);
  const { bookId } = useParams();
  const isLaptopScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isOpenCartModal, setIsOpenCartModal] = useState<boolean>(false);
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    setIsLocalLoading(true);
    loadData().finally(() => {
      setIsLocalLoading(false);
    });
  }, [loadData]);


	const currentBook = useMemo(() => {
    const book = books.find((book) => book.id === parseInt(bookId!));
    return book
      ? {
          ...book,
          count: count,
          totalPrice: Number((Number(count) * book.price).toFixed(2)),
        }
      : null;
  }, [bookId, books, count]);


  const bookIsExisted = useMemo(() => {
    if (currentBook && Object.keys(currentBook).length !== 0) {
      return true;
    } else {
      return false;
    }
  }, [currentBook]);

  return (
    <>
      {bookIsExisted && !isLocalLoading && (
        <>
          <div className={styles.card}>
            <ModalAddedItem
              setIsOpenCartModal={setIsOpenCartModal}
              isOpenCartModal={isOpenCartModal}
            />
            {isLaptopScreen || (
              <h1 className={styles.card__title}>{currentBook?.title}</h1>
            )}
            <BookDetailImage
              image={currentBook?.image || noImage}
              alt={currentBook?.title}
            />
            <BookDetailInfo
              title={currentBook?.title}
              author={currentBook?.author}
              level={currentBook?.level}
              tags={currentBook?.tags}
              description={currentBook?.description}
            />

            {currentBook && (
              <BookDetailActions
                currentBook={currentBook}
                count={count}
                setCount={setCount}
                setIsOpenCartModal={setIsOpenCartModal}
              />
            )}
          </div>
          {isLaptopScreen && (
            <div className={styles.card__description}>
              <p>Book description</p>
              <p>{currentBook?.description}</p>
            </div>
          )}
        </>
      )}
      {isLoading && <Loader />}
      {!bookIsExisted && !isLocalLoading && <NotFound />}
    </>
  );
};
