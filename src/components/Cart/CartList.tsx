"use client";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms";
import { MoveLeft } from "lucide-react";
import CartItem from "@/components/Cart/CartItem";
import styles from "./CartList.module.css";

export default function CartList() {
  const cart = useRecoilState(cartState);

  return (
    <div className={styles.cartlist}>
      <div className={styles.cartlist__list}>
        {cart[0]
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((course) => (
            <CartItem
              id={course.id}
              dept={course.dept}
              number={course.number}
              title={course.title}
            />
          ))}
      </div>
      <Link href="/courses" className={styles.cartlist__cta}>
        <MoveLeft size={20} />
        <span>Continue shopping</span>
      </Link>
    </div>
  );
}
