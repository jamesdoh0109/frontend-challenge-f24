"use client";

import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms";
import styles from "./Header.module.css";

export default function Header() {
  const cart = useRecoilState(cartState);
  const numCoursesInCart = cart[0].length;

  return (
    <div className={styles.header}>
      <h1>Shopping cart</h1>
      <h2>
        {numCoursesInCart} course{numCoursesInCart === 0 ? "" : "s"}
      </h2>
    </div>
  );
}
