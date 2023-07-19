import "../../styles/main.scss";
import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <div className={styles.notfound}>
        <h1>Page not found</h1>
        <br />
        <p style={{ fontSize: "18px" }}>
          This page could not be found - maybe check out all our
          <Link to='/books' style={{ color: "#0064cc" }}>
            {` books`}
          </Link>
        </p>
      </div>
    </>
  );
};
