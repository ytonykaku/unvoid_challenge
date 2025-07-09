'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.css';

const Game = dynamic(() => import('./Game'), { ssr: false });

export default function Page() {
  return (
    <div className={styles.page}>
      <Game />
    </div>
  );
}