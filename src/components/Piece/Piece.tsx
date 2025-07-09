import styles from './Piece.module.css';

export type PieceType = 'developer' | 'designer' | 'product-owner';
export type Player = 'player1' | 'player2';
export interface PieceProps {
  type: PieceType;
  player: Player;
}

export interface PieceProps {
  type: PieceType;
  player: Player;
}

const pieceAbbreviation: Record<PieceType, string> = {
  'product-owner': 'PO',
  'developer': 'Dev',
  'designer': 'Des',
};

export default function Piece({ type, player }: PieceProps) {
  const playerClass = player === 'player1' ? styles.player1 : styles.player2;

  return (
    <div className={`${styles.piece} ${playerClass}`}>
      <div className={styles.pieceIcon}>{pieceAbbreviation[type]}</div>
    </div>
  );
}