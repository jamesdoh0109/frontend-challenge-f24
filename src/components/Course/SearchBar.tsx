"use client";

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { coursesFilterState } from "@/recoil/atoms";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [localQuery, setLocalQuery] = useState("");

  const setQuery = useSetRecoilState(coursesFilterState);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery((prevFilter) => ({
        ...prevFilter,
        query: localQuery,
      }));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, setQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  return (
    <input
      value={localQuery}
      onChange={handleQueryChange}
      type="search"
      placeholder="Search by number, title, description"
      className={styles.searchbar}
    />
  );
}
