import styles from "./cartlist.module.scss";
import "../../styles/main.scss";
import { BookContext } from "../../context/BooksContext";
import { useContext, useState } from "react";
import { CartItem } from "../../components/CartItem";
import { BaseButton } from "../../components/ui/BaseButton";
import emptyShopCart from "../../images/empty_shopping_cart.jpg";
import { useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ModalPurchasedItem } from "../../components/modals/PurchasedItem";
import { Router } from '../../types/enums';

export const Cart = () => {
  const { cartList, setCartList } = useContext(BookContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  function handlePurchase() {
    setIsOpenModal(true);
    localStorage.removeItem("cartList");
    setCartList([]);
  }

  return (
    <>
      {cartList.length > 0 && <h1 className={styles.cart__headline}>Cart</h1>}
      <ModalPurchasedItem
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      {cartList.length > 0 && (
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__button_wrapper}>
            <BaseButton
              text='Purchase'
              textColor='white'
              backgroundColor='#43b02a'
              onClick={handlePurchase}
            />
          </div>
          <TransitionGroup component={null}>
            {cartList.map((book) => (
              <CSSTransition key={book.id} timeout={500} classNames='item'>
                <CartItem book={book} key={book.id} />
              </CSSTransition>
            ))}
          </TransitionGroup>
          <span className={styles.cart__total}>
            <strong>
              Total price: $
              {cartList
                .reduce((total, book) => total + (book.totalPrice || 0), 0)
                .toFixed(2)}
            </strong>
          </span>
        </div>
      )}
      {cartList.length < 1 && !isOpenModal && (
        <section className={styles.empty_cart}>
          <BaseButton
            text='Put some books'
            textColor='white'
            backgroundColor='#4895ff'
            onClick={() => {
              navigate(Router.BOOKS);
            }}
          />
          <div className={styles.empty_cart__down_arrow}>⇪</div>
          <img
            className={styles.empty_cart__img}
            src={emptyShopCart}
            alt='empty cart'
          />
          <p className={styles.empty_cart__text}>Your cart is empty</p>
        </section>
      )}
    </>
  );
};
