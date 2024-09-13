"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms";
import { useRouter } from "next/navigation";
import Notice from "@/components/common/Notice";
import styles from "./page.module.css";

export default function Page() {
  const router = useRouter();

  const [cart, setCart] = useRecoilState(cartState);

  useEffect(() => {
    if (cart.length == 0) {
      router.push("/courses");
    } else {
      setCart([]);
    }
  }, []);

  return (
    <div className={styles.checkout}>
      <Notice
        header="Checkout successful!"
        description="Thanks for checking out! Hope you have a great semester!"
      >
        <svg
          width="150"
          height="150"
          version="1.1"
          viewBox="0 0 1200 1200"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.checkout__svg}
        >
          <path
            d="m246.64 889.31c-48.898 0-88.613 39.711-88.613 88.613 0 48.898 39.715 88.613 88.613 88.613 48.938 0 88.613-39.715 88.613-88.613 0-48.902-39.676-88.613-88.613-88.613zm452.06 0c-48.898 0-88.613 39.711-88.613 88.613 0 48.898 39.715 88.613 88.613 88.613 48.902 0 88.613-39.715 88.613-88.613 0-48.902-39.711-88.613-88.613-88.613zm-452.06 37.5c28.238 0 51.113 22.914 51.113 51.113s-22.875 51.113-51.113 51.113c-28.199 0-51.113-22.914-51.113-51.113s22.914-51.113 51.113-51.113zm452.06 0c28.199 0 51.113 22.914 51.113 51.113s-22.914 51.113-51.113 51.113c-28.238 0-51.113-22.914-51.113-51.113s22.875-51.113 51.113-51.113zm177.3-610.54h-801c-5.625 0-10.988 2.5508-14.551 6.9375-3.5625 4.3906-4.9492 10.164-3.7852 15.676l101.77 483.75c1.8359 8.6641 9.4883 14.887 18.336 14.887h591.79c8.5859 0 16.086-5.8477 18.188-14.172l164.59-652.39h173.66c10.352 0 18.75-8.3984 18.75-18.75 0-10.348-8.3984-18.75-18.75-18.75h-188.29c-8.5859 0-16.086 5.8516-18.188 14.176zm-9.4883 37.5h-768.41l93.898 446.25h561.94zm-534.6 214.28 97.348 97.348c7.3125 7.3125 19.199 7.3125 26.512 0l186.3-186.3c7.3125-7.3125 7.3125-19.203 0-26.516s-19.199-7.3125-26.512 0l-173.06 173.03-84.074-84.074c-7.3125-7.3125-19.199-7.3125-26.512 0s-7.3125 19.199 0 26.512z"
            fillRule="evenodd"
          />
        </svg>
      </Notice>
    </div>
  );
}
