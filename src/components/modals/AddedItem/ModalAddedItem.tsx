import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./AddedItem.module.scss";
import { CSSTransition } from "react-transition-group";
import { BaseButton } from "../../ui/BaseButton";
import { useNavigate } from "react-router-dom";
import { Buttons, Router } from "../../../types/enums";

interface Props {
  setIsOpenCartModal: Dispatch<SetStateAction<boolean>>;
  isOpenCartModal: boolean;
}

export const ModalAddedItem: React.FC<Props> = ({
  setIsOpenCartModal,
  isOpenCartModal,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpenCartModal) {
      const timeoutID = setTimeout(() => {
        setIsOpenCartModal(false);
      }, 3000);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  });

  const handleProceedToCheckout = () => {
    navigate(Router.CART);
  };

  return (
    <CSSTransition
      in={isOpenCartModal}
      timeout={300}
      classNames='alert'
      unmountOnExit
    >
      <div className={styles.cart_icon__modal}>
        <div className={styles.cart_icon__modal_content}>
          <p>Item added to your cart</p>

          <span onClick={() => setIsOpenCartModal(false)}>✖</span>
        </div>

        <div className={styles.cart_icon__modal_actions}>
          <BaseButton
            onClick={handleProceedToCheckout}
            text={Buttons.PROCEED.text}
            backgroundColor={Buttons.PROCEED.backgroundColor}
            textColor={Buttons.PROCEED.textColor}
          />
        </div>
      </div>
    </CSSTransition>
  );
};
