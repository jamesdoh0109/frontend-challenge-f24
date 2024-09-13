import styles from "./Tag.module.css";

interface TagProps {
  text: string;
  onClick?: () => void;
  color?: "primary" | "secondary";
}

export default function Tag({ text, onClick, color = "primary" }: TagProps) {
  return (
    <div
      onClick={onClick}
      className={`${styles.tag} ${styles[`tag__${color}`]}`}
    >
      <div className={styles.tag__text}>{text}</div>
    </div>
  );
}
