import Board from "@/components/Board/Board";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Unvoid Chess Game</h1>
        <Board />
      </main>
    </div>
  );
}