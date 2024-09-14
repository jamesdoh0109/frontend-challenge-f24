"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { coursesFilterState } from "@/recoil/atoms";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [localQuery, setLocalQuery] = useState("");

  const [coursesFilter, setQuery] = useRecoilState(coursesFilterState);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery({ ...coursesFilter, query: localQuery });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, coursesFilter, setQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  return (
    <input
      value={localQuery}
      onChange={handleQueryChange}
      type="search"
      placeholder="Search for a course"
      className={styles.searchbar}
    />
  );
}
