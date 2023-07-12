import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./pricecounter.module.scss";

interface Props {
  setCount: Dispatch<SetStateAction<string | number>>;
}

export const PriceCounter: React.FC<Props> = ({ setCount }) => {
  const [countValue, setCountValue] = useState(1);

  useEffect(() => {
    setCount(countValue);
  }, [setCount, countValue]);

  function increaseCount() {
    setCountValue(+countValue + 1);
  }

  function decreaseCount() {
    setCountValue(+countValue - 1);
  }

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCount(+event.target.value);
    },
    [setCount]
  );

  return (
    <div className={styles.price_counter}>
      <div className={styles.price_counter__wrapper}>
        <input
          type='number'
          data-testid='input-price-counter'
          className={styles.price_counter__input}
          value={countValue}
          onChange={handleInput}
          min={1}
          max={42}
        />
        <div className={styles.price_counter__arrows}>
          <button
            className={styles.price_counter__arrow_up}
            onClick={increaseCount}
            disabled={+countValue > 41}
          >
            ▲
          </button>

          <button
            className={styles.price_counter__arrow_down}
            onClick={decreaseCount}
            disabled={+countValue < 2}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};
