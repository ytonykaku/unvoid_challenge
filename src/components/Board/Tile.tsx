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
    styles.square,
    isEven ? styles.light : styles.dark,
    isSelected ? styles.selected : '',
    isPossibleMove ? styles.possibleMove : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onClick={onClick}>
      {piece && <Piece type={piece.type} player={piece.player} />}
    </div>
  );
}