import styles from "./bookdetailimage.module.scss";

interface Props {
  image?: string;
  alt?: string;
}

export const BookDetailImage: React.FC<Props> = ({ image, alt }) => {
  return (
    <div className={styles.image_wrapper}>
      <img
        className={styles.card_image}
        src={image}
        alt={alt}
      />
    </div>
  );
};
