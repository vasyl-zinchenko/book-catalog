import React, { MouseEventHandler, useMemo } from "react";
import { Link } from "react-router-dom"; // додано імпорт напряму
import styles from "./basebutton.module.scss";

interface Props {
  text: string;
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabledButton?: boolean;
  textColor?: string;
  backgroundColor?: string;
}

export const BaseButton: React.FC<Props> = ({
  text,
  link = "",
  isDisabledButton,
  onClick,
  textColor,
  backgroundColor,
}) => {
  const buttonStyles = useMemo(
    () =>
      isDisabledButton
        ? { cursor: "not-allowed" }
        : { color: textColor, backgroundColor },
    [backgroundColor, isDisabledButton, textColor]
  );

  return link?.length !== 0 ? (
    <Link to={link} className={styles.button}>
      {text}
    </Link>
  ) : (
    <div>
      <button
        className={styles.button}
        onClick={onClick}
        disabled={isDisabledButton}
        style={buttonStyles}
      >
        {text}
      </button>
    </div>
  );
};
