import SearchBar from "@/components/Course/SearchBar";
import Filter from "@/components/Course/Filter";
import CourseList from "@/components/Course/CourseList";
import styles from "./layout.module.css";

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.courses}>
      <div className={styles.courses__container}>
        <div className={styles.courses__searchtools}>
          <SearchBar />
          <Filter />
        </div>
        <div className={styles.courses__list}>
          <CourseList />
        </div>
      </div>
      <hr className={styles.courses__separator} />
      <div className={styles.courses__details}>{children}</div>
    </div>
  );
}
