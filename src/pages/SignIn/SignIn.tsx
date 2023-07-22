import styles from "./SignIn.module.scss";
import { UserContext } from "../../context/UserContext";
import { useContext, useState, useCallback } from "react";
import { BaseButton } from "../../components/ui/BaseButton";
import { Buttons, WarningMessages } from "../../types/enums";
import { CSSTransition } from "react-transition-group";

export const SignIn = () => {
  const { setUsername } = useContext(UserContext);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      setUsername(inputValue);
    },
    [setUsername, inputValue]
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.replace(/^(\s)*/g, "");
      setInputValue(value);
      if (value.length < 4 || value.length > 16) {
        setIsDisabledButton(true);
      } else {
        setIsDisabledButton(false);
      }
    },
    []
  );

  return (
    <div className={styles.authorization}>
      <div className={styles.authorization__avatar}></div>

      <CSSTransition
        in={isHovered}
        timeout={100}
        classNames='alert'
        unmountOnExit
      >
        <p className={styles.authorization__form_warning}>
          {WarningMessages.LOGIN_SIZE}
        </p>
      </CSSTransition>

      <span className={styles.authorization__text}>
        Username
        <span
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className={styles.authorization__text_info}
        >
          ℹ
        </span>
      </span>

      <form className={styles.authorization__form} onSubmit={handleSubmit}>
        <input
          className={styles.authorization__form_input}
          onChange={handleInput}
          placeholder='type Username'
          value={inputValue}
        />

        <BaseButton
          isDisabledButton={isDisabledButton}
          text={Buttons.SIGN_IN.text}
          backgroundColor={Buttons.SIGN_IN.backgroundColor}
          textColor={Buttons.SIGN_IN.textColor}
        />
      </form>
    </div>
  );
};
