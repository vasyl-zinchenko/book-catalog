import { useContext, useState, useEffect } from "react";
import styles from "./HeaderMobile.module.scss";
import cartIcon from "../../../../icons/cart.svg";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import classNames from "classnames";
import { CartIcon } from "../../../CartIcon";
import { BookContext } from "../../../../context/BooksContext";
import { Router, SHOP } from "../../../../types/enums";

export const HeaderMobile = () => {
  const { username, setUsername } = useContext(UserContext);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { cartList } = useContext(BookContext);

  function removeUsername() {
    localStorage.removeItem("username");
    setUsername("");
  }

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (isOpened) {
      body.style.overflow = "hidden";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [isOpened]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <NavLink to={Router.BOOKS}>
            <section className={styles.navigation__title}>{SHOP.title}</section>
          </NavLink>

          {username && (
            <section className={styles.navigation__menu}>
              <CartIcon />

              <div
                className={styles.menu_toggle}
                onClick={() => setIsOpened(!isOpened)}
              >
                ☰
              </div>

              <div
                className={classNames({ [styles.background]: isOpened })}
                onClick={() => setIsOpened(false)}
              ></div>

              <div
                className={classNames(styles.opened_menu, {
                  [styles.opened]: isOpened,
                  opened: isOpened,
                })}
              >
                <section className={styles.opened_menu__nav}>
                  <NavLink to={Router.BOOKS} onClick={() => setIsOpened(false)}>
                    <section className={styles.navigation__title}>
                      {SHOP.title}
                    </section>
                  </NavLink>

                  <div
                    className={styles.menu_toggle}
                    onClick={() => setIsOpened(!isOpened)}
                  >
                    ✖
                  </div>
                </section>

                <section className={styles.menu_profile}>
                  <div className={styles.menu_profile__info}>
                    <div className={styles.menu_profile__info_picture}>
                      {username[0].toUpperCase()}
                    </div>
                    <div>
                      <p>{SHOP.user}</p>

                      <p>{username}</p>
                    </div>
                  </div>

                  <NavLink to={Router.CART} onClick={() => setIsOpened(false)}>
                    <div className={styles.cart_icon}>
                      <img src={cartIcon} alt='Cart icon' />

                      <span>Cart</span>

                      {cartList.length > 0 && (
                        <div className={styles.cart_icon__length}>
                          {cartList.length}
                        </div>
                      )}
                    </div>
                  </NavLink>
                </section>

                <div
                  style={{
                    height: "1px",
                    background: "grey",
                    margin: "15px 0",
                  }}
                ></div>

                <div
                  className={styles.menu_profile__exit}
                  onClick={removeUsername}
                >
                  Sign-Out
                </div>
              </div>
            </section>
          )}
        </nav>
      </header>
    </>
  );
};
