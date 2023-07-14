import { ReactNode } from "react";
import styles from "./errormessage.module.scss";

interface WarningMessageProps {
  children: ReactNode;
}

export function WarningMessage({ children }: WarningMessageProps) {
  return <p className={styles.warning_message}>{children}</p>;
}
