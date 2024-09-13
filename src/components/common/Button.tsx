import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  text: string;
  color?: "primary" | "secondary" | "warning";
  disabled?: boolean;
}

export default function Button({
  onClick,
  href,
  text,
  color = "primary",
  disabled = false,
}: ButtonProps) {
  if (!href && !onClick) {
    throw new Error("You must provide either href or onClick prop.");
  }

  return href ? (
    <Link href={href} className={`${styles.btn} ${styles[`btn__${color}`]}`}>
      {text}
    </Link>
  ) : (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${styles[`btn__${color}`]}`}
    >
      {text}
    </button>
  );
}
