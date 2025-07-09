import styles from './Board.module.css';
import Piece from '../Piece/Piece';

interface TileProps {
  isEven: boolean;
}

export default function Tile({ isEven }: TileProps) {
  const tileColorClass = isEven ? styles.evenTile : styles.oddTile;

  return (
    <div className={`${styles.tile} ${tileColorClass}`}>
      <div className={styles.tileContent}>
        <Piece type="developer" player="player2" />
      </div>
    </div>
  );
}