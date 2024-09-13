"use client";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { coursesFilterState } from "@/recoil/atoms";
import { X, Tags } from "lucide-react";
import { TAGS } from "@/utils/constant";
import Tag from "@/components/Course/Tag";
import styles from "./Filter.module.css";

export default function Filter() {
  const [popupOpen, setPopupOpen] = useState(false);

  const [coursesFilter, setTags] = useRecoilState(coursesFilterState);

  function toggleTagSelection(tag: string) {
    setTags((prevState) => {
      const isTagSelected = prevState.tags.includes(tag);

      const updatedTags = isTagSelected
        ? prevState.tags.filter((t) => t !== tag)
        : [...prevState.tags, tag];

      return {
        ...prevState,
        tags: updatedTags,
      };
    });
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filter__open}>
        <Tags onClick={() => setPopupOpen(!popupOpen)} />
      </div>
      {popupOpen && (
        <div className={styles.filter__popup}>
          <div className={styles.filter__header}>
            <div>{coursesFilter.tags.length} tags selected</div>
            <div className={styles.filter__close}>
              <X size={16} onClick={() => setPopupOpen(false)} />
            </div>
          </div>
          <div className={styles.filter__tags}>
            {TAGS.map((tag) => (
              <Tag
                key={tag}
                text={tag}
                color={
                  coursesFilter.tags.includes(tag) ? "primary" : "secondary"
                }
                onClick={() => toggleTagSelection(tag)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
