import styles from "./signin.module.scss";
import { UserContext } from "../../context/UserContext";
import { useContext, useState, useCallback, useMemo } from "react";
import { BaseButton } from "../../components/ui/BaseButton";

export const SignIn = () => {
  const { username, setUsername } = useContext(UserContext);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState(true);

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
      <span className={styles.authorization__text}> Username </span>
      <form className={styles.authorization__form} onSubmit={handleSubmit}>
        <input
          className={styles.authorization__form_input}
          onChange={handleInput}
          placeholder='type Username'
          value={inputValue}
        />
        <BaseButton isDisabledButton={isDisabledButton} text='Sign-In' />
      </form>
    </div>
  );
};
