import styles from "./cartitem.module.scss";
import { BookContext } from "../../context/BooksContext";
import { useContext } from "react";
import type { Book } from "../../types/books";
import { useMediaQuery } from "react-responsive";
import noImage from "../../images/no_img.jpg";
import { Link } from "react-router-dom";
import { Router } from "../../types/enums";

interface Props {
  book: Book;
}

export const CartItem: React.FC<Props> = ({ book }) => {
  const { cartList, setCartList } = useContext(BookContext);
  const isLaptopScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  function removeBook() {
    const books = cartList.filter(({ id }) => id !== book.id);
    setCartList(books);
  }

  return (
    <div className={styles.cart_item} key={book.id}>
      <div className={styles.cart_item__section_title}>
        <Link to={`${Router.BOOKS}/${book.id}`}>
          <img
            className={styles.cart_item__image}
            src={book.image || noImage}
            alt={book.title}
          />
        </Link>
        <Link
          to={`${Router.BOOKS}/${book.id}`}
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
          Total price: ${(+book.count! * book.price).toFixed(2)}
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
