"use client";

import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms";
import Notice from "@/components/common/Notice";
import Header from "@/components/Cart/Header";
import CartList from "@/components/Cart/CartList";
import Summary from "@/components/Cart/Summary";
import styles from "./page.module.css";
import Button from "@/components/common/Button";

export default function Page() {
  const cart = useRecoilState(cartState);
  const numCoursesInCart = cart[0].length;

  return numCoursesInCart === 0 ? (
    <div className={styles.cart__empty}>
      <Notice
        header="Your cart is empty!"
        description="Add a course to make you happy(?)"
      >
        <svg
          width="150"
          height="150"
          version="1.1"
          viewBox="0 0 1200 1200"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.cart__svg}
        >
          <path
            d="m254.36 963.84c-46.801 0-84.824 38.023-84.824 84.824s38.023 84.824 84.824 84.824c46.836 0 84.824-38.023 84.824-84.824s-37.988-84.824-84.824-84.824zm427.5 0c-46.801 0-84.824 38.023-84.824 84.824s38.023 84.824 84.824 84.824c46.836 0 84.824-38.023 84.824-84.824s-37.988-84.824-84.824-84.824zm-427.5 37.5c26.137 0 47.324 21.227 47.324 47.324 0 26.137-21.188 47.324-47.324 47.324-26.102 0-47.324-21.188-47.324-47.324 0-26.098 21.223-47.324 47.324-47.324zm427.5 0c26.137 0 47.324 21.227 47.324 47.324 0 26.137-21.188 47.324-47.324 47.324-26.102 0-47.324-21.188-47.324-47.324 0-26.098 21.223-47.324 47.324-47.324zm96.223-191.06v63.375c0 8.1016-6.5625 14.625-14.625 14.625h-624.04c-10.352 0-18.75 8.4375-18.75 18.75 0 10.352 8.3984 18.75 18.75 18.75h624.04c28.766 0 52.125-23.324 52.125-52.125v-77.062c0.078124-0.26172 0.11328-0.52344 0.1875-0.75l135.79-577.12h173.44c10.352 0 18.75-8.3984 18.75-18.75s-8.3984-18.75-18.75-18.75h-188.29c-8.6992 0-16.273 6-18.262 14.438l-39.598 168.38h-803.85c-5.5117 0-10.762 2.4375-14.324 6.6758-3.5625 4.1992-5.0625 9.7852-4.1641 15.223l69.863 408.75c1.5391 9 9.3359 15.602 18.488 15.602zm91.953-408.75h-772.8l63.41 371.25h622.02zm-245.59-139.12 84.375-137.21c5.4023-8.8125 2.6641-20.363-6.1484-25.801-8.8125-5.4023-20.363-2.6641-25.801 6.1484l-84.375 137.21c-5.4375 8.8125-2.6641 20.359 6.1484 25.797 8.8125 5.4023 20.363 2.6641 25.801-6.1484zm-280.69-19.648-84.375-137.21c-5.4375-8.8125-16.988-11.551-25.801-6.1484-8.8125 5.4375-11.586 16.988-6.1484 25.801l84.375 137.21c5.4375 8.8125 16.988 11.551 25.801 6.1484 8.8125-5.4375 11.551-16.984 6.1484-25.797zm143.1-20.289v-137.21c0-10.352-8.4023-18.75-18.75-18.75-10.352 0-18.75 8.3984-18.75 18.75v137.21c0 10.352 8.3984 18.75 18.75 18.75 10.348 0 18.75-8.3984 18.75-18.75z"
            fillRule="evenodd"
          />
        </svg>
      </Notice>
      <Button text="Continue shopping" href="/courses" />
    </div>
  ) : (
    <div className={styles.cart}>
      <Header />
      <hr />
      <div className={styles.cart_details}>
        <CartList />
        <Summary />
      </div>
    </div>
  );
}
