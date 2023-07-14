import styles from "./bookdetailactions.module.scss";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import type { Book } from "../../../types/books";
import { BookContext } from "../../../context/BooksContext";
import { BaseButton } from "../../ui/BaseButton";
import { WarningMessages } from "../../../types/enums";

interface Props {
  currentBook: Book;
  count: number | string;
  setCount: Dispatch<SetStateAction<number | string>>;
  setIsOpenCartModal: Dispatch<SetStateAction<boolean>>;
}

export const BookDetailActions: React.FC<Props> = ({
  currentBook,
  count,
  setCount,
  setIsOpenCartModal,
}) => {
  const { cartList, setCartList } = useContext(BookContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentBookIndex, setCurrentBookIndex] = useState<number>(0);
  const [currentItem, setCurrentItem] = useState<Book | null>(null);
  const [countValue, setCountValue] = useState<number | string>(1);
  const [isCountValueSet, setIsCountValueSet] = useState<boolean>(false);

  useEffect(() => {
    if (currentBook && typeof currentBook.id === "number") {
      setCurrentItem({ ...currentBook });
    }
  }, [currentBook]);
  useEffect(() => {
    if (cartList[currentBookIndex]?.count) {
      setIsCountValueSet(true);
    }
  }, [cartList, currentBookIndex]);

  useEffect(() => {
    if (!isCountValueSet) {
      setCountValue(1);
    }
  }, [isCountValueSet]);

  const totalPrice = useMemo(() => {
    if (typeof currentBook?.price === "number") {
      return Number(Number(countValue) * currentBook.price).toFixed(2);
    }
    return 0;
  }, [countValue, currentBook?.price]);

  useEffect(() => {
    setCount(countValue);
  }, [setCount, countValue]);

  useEffect(() => {
    setCurrentBookIndex(
      cartList.findIndex((book) => book.id === currentBook?.id)
    );
  }, [cartList, currentBook?.id]);

  useEffect(() => {
    if (currentBook && typeof currentBook.id === "number") {
      setCurrentItem({ ...currentBook });
    }
  }, [currentBook]);

  useEffect(() => {
    if (currentItem) {
      currentItem.isVisibleMessage = false;
    }
  }, [currentItem]);

  function increaseCount() {
    setCountValue((prevCount) => Number(prevCount) + 1);
  }

  function decreaseCount() {
    setCountValue((prevCount) => Number(prevCount) - 1);
  }

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCountValue(event.target.value);
    },
    []
  );

  const existingBookIndex = useMemo(() => {
    return cartList.findIndex((book) => book.id === currentItem?.id);
  }, [cartList, currentItem?.id]);

  const addBookToCart = useCallback(() => {
    if (currentItem) {
      currentItem.isVisibleMessage = true;

      if (existingBookIndex !== -1) {
        const updatedCartList = [...cartList];
        updatedCartList[existingBookIndex].count =
          Number(updatedCartList[existingBookIndex].count) + Number(countValue);
        setCartList(updatedCartList);
      } else {
        currentItem.count = countValue;
        setCartList((prevCartList: Book[]) => [...prevCartList, currentItem]);
      }
    }
    setCountValue(1);
    setIsOpenCartModal(true);
  }, [
    currentItem,
    setIsOpenCartModal,
    existingBookIndex,
    cartList,
    countValue,
    setCartList,
  ]);

  const showCountInStock = useMemo(() => {
    if (cartList[currentBookIndex]?.amount === 0) {
      return 0;
    } else if (!cartList[currentBookIndex]?.amount) {
      return currentBook?.amount;
    }
    return (
      +cartList[currentBookIndex].amount! - +cartList[currentBookIndex]?.count
    );
  }, [cartList, currentBook?.amount, currentBookIndex]);

  useEffect(() => {
    if (currentBook && currentBook.totalPrice! < 1) {
      setErrorMessage(WarningMessages.LESS_THAN_ALLOWED);
    } else if (
      Number(countValue) > showCountInStock! &&
      showCountInStock !== 0
    ) {
      setErrorMessage(WarningMessages.MORE_THAN_ALLOWED);
    } else if (showCountInStock === 0) {
      setErrorMessage(WarningMessages.NO_MORE);
    } else setErrorMessage("");
  }, [
    count,
    countValue,
    currentBook,
    currentBook?.totalPrice,
    showCountInStock,
  ]);

  const isDisabledButton = useMemo(
    () => Number(countValue) > showCountInStock! || Number(countValue) < 1,
    [countValue, showCountInStock]
  );

  return (
    <div className={styles.card_action}>
      <div className={styles.card_action__wrapper}>
        <span className={styles.card_action__stock}>
          In stock: <span data-testid='stock'>{showCountInStock}</span>
        </span>
        <div className={styles.card_action__char}>
          <span>Price, $</span>
          <span data-testid='price'>{currentBook?.price}</span>
        </div>
        <div className={styles.card_action__char}>
          <span>Count</span>
          <div className={styles.price_counter}>
            <div className={styles.price_counter__wrapper}>
              <input
                type='number'
                data-testid='input-price-counter'
                className={styles.price_counter__input}
                value={countValue}
                onChange={handleInput}
                min={1}
                max={showCountInStock}
              />
              <div className={styles.price_counter__arrows}>
                <button
                  className={styles.price_counter__arrow_up}
                  onClick={increaseCount}
                  disabled={Number(countValue) >= showCountInStock!}
                >
                  ▲
                </button>
                <button
                  className={styles.price_counter__arrow_down}
                  onClick={decreaseCount}
                  disabled={Number(countValue) < 2}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.card_action__char}>
          <span>Total price</span>
          <span data-testid='total-price-element'>{totalPrice}</span>
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
      <div className={styles.card_action__button}>
        {currentBookIndex !== -1 && (
          <span
            className={`${styles.added} ${
              cartList[currentBookIndex]?.isVisibleMessage ? styles.isAdded : ""
            }`}
          >
            {`${cartList[currentBookIndex]?.count} ${
              cartList[currentBookIndex]?.count === 1 ? "book" : "books"
            } in the cart`}
          </span>
        )}
        <BaseButton
          onClick={addBookToCart}
          text='Add to cart'
          isDisabledButton={isDisabledButton}
          backgroundColor='#43b02a'
          textColor='white'
        />
      </div>
    </div>
  );
};
