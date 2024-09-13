import Card from "@/components/common/Card";
import styles from "@/components/Course/CourseItem.module.css";
import TagGroup from "@/components/Course/TagGroup";
import { ShoppingCart } from "lucide-react";
import React from "react";

interface CourseItemProps {
  dept: string;
  number: number;
  title: string;
  tags: string[];
  courseInCart: boolean;
}

const CourseItem = ({
  dept,
  number,
  title,
  tags,
  courseInCart,
}: CourseItemProps) => {
  return (
    <Card>
      <div>
        <h2 className={styles.courses__code}>
          {dept} {number}
        </h2>
        <h3 className={styles.courses__title}>{title}</h3>
      </div>
      <TagGroup tags={tags} />
      {courseInCart && (
        <div className={styles.courses__cartmessage}>
          <ShoppingCart size={16} />
          <span>In cart</span>
        </div>
      )}
    </Card>
  );
}

export default React.memo(CourseItem);
