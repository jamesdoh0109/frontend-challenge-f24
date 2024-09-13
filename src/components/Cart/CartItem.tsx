import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms";
import { Trash } from "lucide-react";
import styles from "./CartItem.module.css";

interface CartItemProps {
  id: number;
  dept: string;
  number: number;
  title: string;
}

export default function CartItem({ id, dept, number, title }: CartItemProps) {
  const [cart, setCart] = useRecoilState(cartState);

  const removeFromCart = () => {
    setCart(cart.filter((c) => id !== c.id));
  };

  return (
    <div className={styles.cartitem}>
      <div className={styles.cartitem__info}>
        <h1>
          {dept}-{number}
        </h1>
        <h2>{title}</h2>
      </div>
      <div></div>
      <Trash className={styles.icon} onClick={removeFromCart} />
    </div>
  );
}
