import styles from "./Notice.module.css";

interface CourseNoticeProps {
  header: string;
  description: string;
  children: React.ReactNode;
}

export default function Notice({
  header,
  description,
  children,
}: CourseNoticeProps) {
  return (
    <div className={styles.coursenotice}>
      {children}
      <div className={styles.coursenotice__text}>
        <h1>{header}</h1>
        <h2>{description}</h2>
      </div>
    </div>
  );
}
