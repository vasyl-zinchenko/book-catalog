import { useContext } from "react";
import { BaseButton } from "../../ui/BaseButton";
import styles from "./headerdesktop.module.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { CartIcon } from "../../CartIcon";
import { Router } from "../../../types/enums";

export const HeaderDesktop = () => {
  const { username, setUsername } = useContext(UserContext);

  function removeUsername() {
    localStorage.removeItem("username");
    setUsername("");
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link to={Router.BOOKS}>
          <section className={styles.navigation__title}>JS BAND STORE</section>
        </Link>
        {username && (
          <section className={styles.navigation__menu}>
            <CartIcon />
            <div className={styles.navigation__exit}>
              <BaseButton onClick={removeUsername} text='Sign-Out' />
            </div>
            <div className={styles.navigation__profile_img}>
              {username[0].toUpperCase()}
            </div>
            <span className={styles.navigation__username}>{username}</span>
          </section>
        )}
      </nav>
    </header>
  );
};
