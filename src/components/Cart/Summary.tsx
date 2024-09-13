import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms";
import { TAXES } from "@/utils/constant";
import Button from "@/components/common/Button";
import styles from "./Summary.module.css";

export default function Summary() {
  const cart = useRecoilState(cartState);
  const numCoursesInCart = cart[0].length;

  return (
    <div className={styles.summary}>
      <h1>Order summary</h1>
      <div>
        <div className={styles.summary__row}>
          <span>Subtotal</span>
          <span>{numCoursesInCart} C.U.</span>
        </div>
        <div className={styles.summary__row}>
          <span>Taxes</span>
          <span>{TAXES[numCoursesInCart]}</span>
        </div>
      </div>
      <div className={`${styles.summary__row} ${styles.summary__total}`}>
        <span>Estimated total</span>
        <span>{numCoursesInCart} C.U.</span>
      </div>
      <Button href="/checkout" text="Checkout" />
    </div>
  );
}
