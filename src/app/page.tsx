import Button from "@/components/common/Button";
import styles from "./page.module.css";

export default function Home() {
  const title = "Penn Course Cart";

  return (
    <div className={styles.home}>
      <div className={styles.home__main}>
        <div className={styles.home__text}>
          <h1>
            {title.split("").map((ch, index) => {
              const style = { animationDelay: 0.5 + index / 10 + "s" };
              return (
                <span aria-hidden="true" key={index} style={style}>
                  {ch}
                </span>
              );
            })}
          </h1>
          <h2>Quick and easy course browsing and registration.</h2>
        </div>
        <div className={styles.home__button}>
          <Button href="/courses" text="View all courses" />
        </div>
        <div></div>
      </div>
    </div>
  );
}
