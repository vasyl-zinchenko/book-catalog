import { useContext } from "react";
import { BaseButton } from "../../../ui/BaseButton";
import styles from "./HeaderDesktop.module.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { CartIcon } from "../../../CartIcon";
import { Buttons, Router, SHOP } from "../../../../types/enums";

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
          <section
            className={styles.navigation__title}
          >{`${SHOP.title} / ${SHOP.user}`}</section>
        </Link>

        {username && (
          <section className={styles.navigation__menu}>
            <CartIcon />

            <div className={styles.navigation__exit}>
              <BaseButton
                onClick={removeUsername}
                text={Buttons.SIGN_OUT.text}
                backgroundColor={Buttons.SIGN_OUT.backgroundColor}
                textColor={Buttons.SIGN_OUT.textColor}
              />
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
