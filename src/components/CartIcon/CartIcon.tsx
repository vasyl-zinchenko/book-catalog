import { BookContext } from "../../context/BooksContext";
import { useContext, useMemo } from "react";
import styles from "./carticon.module.scss";
import { Link, useParams } from "react-router-dom";
import cartIcon from "../../icons/cart.svg";
import { BaseButton } from "../ui/BaseButton";

export const CartIcon = () => {
  const { cartList } = useContext(BookContext);

  const { bookId } = useParams();

  const cartListLength = useMemo(() => {
    return cartList.length;
  }, [cartList.length]);

  return (
    <div className={styles.cart_icon}>
      <Link to={"../cart"}>
        <img src={cartIcon} alt='Cart icon' />
      </Link>

      {cartList.length > 0 && (
        <div className={styles.cart_icon__length}>{cartListLength}</div>
      )}
    </div>
  );
};
