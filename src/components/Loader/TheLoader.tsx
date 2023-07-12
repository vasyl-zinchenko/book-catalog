import styles from "./loader.module.scss";

export const Loader = () => {
  

  return (
    <div className={styles.loader_wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
};
