import styles from "./BookItem.module.scss";
import noImage from "../../images/no_img.jpg";
import { BaseButton } from "../ui/BaseButton";
import type { Book } from "../../types/books";
import { Buttons, Router } from "../../types/enums";
import { BookContext } from '../../context/BooksContext';
import { useContext } from 'react';

interface Props {
  book: Book;
}

export const BookItem: React.FC<Props> = ({ book }) => {
	const { makeFriendlyUrl } = useContext(BookContext);
  const normalizeText = (value: string) => {
    return value.length > 24 ? value.slice(0, 24) + "..." : value;
  };

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.image_wrapper}>
          <img
            className={styles.card__image}
            src={book.image ? book.image : noImage}
            alt={book.title}
          />
        </div>

        <h2 className={styles.card__title}>
          <strong>{normalizeText(book.title)}</strong>
        </h2>

        <span className={styles.card__author}>
          {normalizeText(book.author)}
        </span>

        <br />

        <div className={styles.card__action}>
          <span>
            <strong>${book.price}</strong>
          </span>

          <div>
            <BaseButton
              link={`${Router.BOOKS}/${makeFriendlyUrl(book.title)}`}
              text={Buttons.VIEW.text}
              backgroundColor={Buttons.VIEW.backgroundColor}
              textColor={Buttons.VIEW.textColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
