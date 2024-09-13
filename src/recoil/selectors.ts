import { selector } from "recoil";
import { coursesFilterState, coursesState } from "@/recoil/atoms";

export const filteredCoursesState = selector({
  key: "FilteredCourses",
  get: ({ get }) => {
    const filters = get(coursesFilterState);
    const courses = get(coursesState);

    // no filters (tags/search), then show all courses
    if (!filters.query && filters.tags.length === 0) {
      return courses;
    }

    const normalizedQuery = filters.query
      .trim()
      .replace(/\s+/g, "")
      .toLowerCase();

    return courses.filter((course) => {
      const courseDept = course.dept?.toLowerCase() || "";
      const courseNumber = course.number?.toString().toLowerCase() || "";
      const courseTitle = course.title?.toLowerCase() || "";
      const courseString = `${courseDept}${courseNumber}`;
      const normalizedTitle = courseTitle.replace(/\s+/g, "");

      const tagsMatch =
        filters.tags.length === 0 ||
        filters.tags.every((tag) => course.tags.includes(tag));

      const queryMatch =
        !filters.query ||
        (!isNaN(Number(normalizedQuery)) &&
          courseNumber.startsWith(normalizedQuery)) ||
        normalizedTitle.includes(normalizedQuery) ||
        courseString.includes(normalizedQuery);

      return queryMatch && tagsMatch;
    });
  },
});
