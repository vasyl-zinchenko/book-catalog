import styles from "./BookDetailInfo.module.scss";
import { useMediaQuery } from "react-responsive";

interface Props {
  title?: string;
  author?: string;
  level?: string;
  tags?: string[];
  description?: string;
}

export const BookDetailInfo: React.FC<Props> = ({
  title,
  author,
  level,
  tags,
  description,
}) => {
  const isLaptopScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className={styles.card_info}>
      {isLaptopScreen && <h1>{title}</h1>}
      <div className={styles.card_info__row}>
        <span>Author:</span> <span>{author}</span>
      </div>

      <div className={styles.card_info__row}>
        <span>Level:</span> <span>{level}</span>
      </div>

      <div className={styles.card_info__row}>
        <span>Tags:</span> <span>{tags?.join(", ")}</span>
      </div>

      {!isLaptopScreen && (
        <div className={styles.card_info__description}>
          <span>Book description</span>

          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
