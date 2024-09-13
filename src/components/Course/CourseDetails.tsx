"use client";

import TagGroup from "@/components/Course/TagGroup";
import Button from "@/components/common/Button";
import { Course } from "@/utils/types";
import styles from "./CourseDetails.module.css";
import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms";
import { CircleAlert } from "lucide-react";

interface CourseDetailsProps {
  course: Course;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const { dept, number, title, prereqs, crossListed, description, tags } =
    course;

  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = () => {
    setCart([...cart, course]);
  };

  const removeFromCart = () => {
    setCart(cart.filter((c) => course.id !== c.id));
  };

  return (
    <div className={styles.coursedetails}>
      <h1 className={styles.coursedetails__header}>
        {dept} {number}: {title}
      </h1>
      <TagGroup tags={tags} />
      <div>{description}</div>
      <div>
        Prerequisites:&nbsp;
        {prereqs.length !== 0 ? (
          <span>{prereqs.join(", ")}</span>
        ) : (
          <span>none</span>
        )}
      </div>
      <div>
        Cross-listed:&nbsp;
        {crossListed.length !== 0 ? (
          <span>{crossListed.join(", ")}</span>
        ) : (
          <span>none</span>
        )}
      </div>
      <div>
        {cart.some((item) => item.id === course.id) ? (
          <Button
            text="Remove from cart"
            color="warning"
            onClick={removeFromCart}
          />
        ) : (
          <Button
            text="Add to cart"
            onClick={addToCart}
            disabled={cart.length === 7}
          />
        )}
        {!cart.some((item) => item.id === course.id) && cart.length === 7 && (
          <div className={styles.coursedetails__warning}>
            <CircleAlert size={16} />
            <span>Max. courses already in cart</span>
          </div>
        )}
      </div>
    </div>
  );
}
