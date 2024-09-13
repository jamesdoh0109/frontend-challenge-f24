import { atom } from "recoil";
import { Course } from "@/utils/types";
import courses from "@/data/courses.json";

export const coursesState = atom({
  key: "Course",
  default: courses,
});

export const coursesFilterState = atom({
  key: "CoursesFilter",
  default: {
    query: "" as string,
    tags: [] as string[],
  },
});

export const cartState = atom({
  key: "Cart",
  default: [] as Course[],
});
