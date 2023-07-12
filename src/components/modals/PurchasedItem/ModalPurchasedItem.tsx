import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./purchasesitem.module.scss";
import { CSSTransition } from "react-transition-group";
import { BaseButton } from "../../ui/BaseButton";
import { useNavigate } from "react-router-dom";
import successIcon from "../../../images/success-icon.png";
import { SuccesMessages } from '../../../types/enums';


interface Props {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  isOpenModal: boolean;
}

export const ModalPurchasedItem: React.FC<Props> = ({
  setIsOpenModal,
  isOpenModal,
}) => {

  useEffect(() => {
    if (isOpenModal) {
      const timeoutID = setTimeout(() => {
        setIsOpenModal(false);
      }, 3000);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  });


  return (
    <CSSTransition
      in={isOpenModal}
      timeout={300}
      classNames='alert'
      unmountOnExit
    >
      <div className={styles.modal}>
        <div className={styles.modal__content}>
          <img
            className={styles.modal__content_icon}
            src={successIcon}
            alt='success'
          />
          <div>{SuccesMessages.PURCHASE_BOOKS}</div>
          <div className={styles.modal__button_wrapper}>
            <BaseButton
              text='Ok'
              textColor='white'
              backgroundColor='#43b02a'
              onClick={() => {
                setIsOpenModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
