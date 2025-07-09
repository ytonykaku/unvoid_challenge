import styles from './Board.module.css';
import Piece, { PieceProps } from '../Piece/Piece';

interface TileProps {
  isEven: boolean;
  piece: PieceProps | null;
  isSelected: boolean;
  isPossibleMove: boolean;
  onClick: () => void;
}

export default function Tile({ isEven, piece, isSelected, isPossibleMove, onClick }: TileProps) {
  const classNames = [
    styles.tile,
    isEven ? styles.evenTile : styles.oddTile,
    isSelected ? styles.selectedTile : '',
    isPossibleMove ? styles.possibleMove : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      onClick={onClick}
    >
      <div className={styles.tileContent}>
        {piece && <Piece type={piece.type} player={piece.player} />}
      </div>
    </div>
  );
}