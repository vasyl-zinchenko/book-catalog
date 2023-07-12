import styles from "./errormessage.module.scss";

export function WarningMessage(props: any) {
  return <p className={styles.warning_message}>{props.children}</p>;
}
