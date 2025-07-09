import styles from './Board.module.css';
import Piece, { PieceProps } from '../Piece/Piece';

interface TileProps {
  isEven: boolean;
  piece: PieceProps | null;
}

export default function Tile({ isEven, piece }: TileProps) {
  const tileColorClass = isEven ? styles.evenTile : styles.oddTile;

  return (
    <div className={`${styles.tile} ${tileColorClass}`}>
      <div className={styles.tileContent}>
        {piece && <Piece type={piece.type} player={piece.player} />}
      </div>
    </div>
  );
}