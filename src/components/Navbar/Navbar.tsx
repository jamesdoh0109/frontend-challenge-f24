"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import ToggleDarkMode from "@/components/Navbar/ToggleDarkMode";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.navbar__logo}>
        <Image
          src="/logo.png"
          width={35}
          height={35}
          alt="cart"
          unoptimized={true}
        />
        <div className={styles.navbar__logoText}>Penn Course Cart</div>
      </Link>
      <div className={styles.navbar__items}>
        <ToggleDarkMode />
        <Link href="/cart">
          <ShoppingCart />
        </Link>
      </div>
    </div>
  );
}
