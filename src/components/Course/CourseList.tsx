"use client";

import Link from "next/link";
import { useRecoilValue } from "recoil";
import { filteredCoursesState } from "@/recoil/selectors";
import CourseItem from "@/components/Course/CourseItem";
import styles from "./CourseList.module.css";
import { cartState } from "@/recoil/atoms";

export default function CourseList() {
  const courses = useRecoilValue(filteredCoursesState);
  const cart = useRecoilValue(cartState);

  return (
    <div className={styles.courseslist}>
      {courses.map((course) => (
        <div key={`${course.id}`}>
          <Link
            key={`${course.id}`}
            href={`/courses/${course.dept.toLowerCase()}-${course.number}`}
          >
            <CourseItem
              dept={course.dept}
              number={course.number}
              title={course.title}
              tags={course.tags}
              courseInCart={cart.some((item) => item.id === course.id)}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
