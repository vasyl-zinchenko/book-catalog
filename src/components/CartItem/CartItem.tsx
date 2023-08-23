import styles from "./CartItem.module.scss";
import { BookContext } from "../../context/BooksContext";
import { useCallback, useContext, useMemo } from "react";
import type { Book } from "../../types/books";
import { useMediaQuery } from "react-responsive";
import noImage from "../../images/no_img.jpg";
import { Router } from "../../types/enums";
import { Link } from "react-router-dom";

interface Props {
  book: Book;
}

export const CartItem: React.FC<Props> = ({ book }) => {
  const { setCartList, makeFriendlyUrl } = useContext(BookContext);
  const isLaptopScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const removeBook = useCallback(() => {
    setCartList((prevCartList) =>
      prevCartList.filter(({ id }) => id !== book?.id)
    );
  }, [book?.id, setCartList]);

  const cartItemTotalPrice = useMemo(() => {
    return (Number(book.count) * book.price).toFixed(2);
  }, [book.count, book.price]);

  return (
    <div className={styles.cart_item} key={book.id}>
      <div className={styles.cart_item__section_title}>
        <Link to={`${Router.BOOKS}/${makeFriendlyUrl(book.title)}`}>
          <img
            className={styles.cart_item__image}
            src={book.image || noImage}
            alt={book.title}
          />
        </Link>

        <Link
          to={`${Router.BOOKS}/${makeFriendlyUrl(book.title)}`}
          className={styles.cart_item__title}
        >
          {book.title}
        </Link>

        {!isLaptopScreen && (
          <div onClick={removeBook} className={styles.cart_item__delete}>
            ✖
          </div>
        )}
      </div>

      <div className={styles.cart_item__section_price}>
        <div className={styles.cart_item__count}>count: {book.count}</div>

        <div className={styles.cart_item__price} style={{ textAlign: "end" }}>
          Total price: {cartItemTotalPrice}
        </div>
      </div>

      {isLaptopScreen && (
        <div onClick={removeBook} className={styles.cart_item__delete}>
          ✖
        </div>
      )}
    </div>
  );
};
