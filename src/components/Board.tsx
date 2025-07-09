import styles from './Board.module.css';
import Row from './Row';

export default function Board() {
  const rows = [];
  for (let i = 0; i < 8; i++) {
    rows.push(<Row key={i} isEven={i % 2 === 0} />);
  }

  return (
    <div className={styles.board}>
      {rows}
    </div>
  );
}