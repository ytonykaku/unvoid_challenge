import styles from './Piece.module.css';

export type PieceType = 'developer' | 'designer' | 'product-owner';
export type Player = 'player1' | 'player2';

export interface PieceProps {
  type: PieceType;
  player: Player;
}

export default function Piece({ type, player }: PieceProps) {
  const color = player === 'player1' ? 'white' : 'black';

  const imageName = `type=${type}, color=${color}.png`;
  const imageUrl = `/assets/${imageName}`;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageUrl} alt={`${player} ${type}`} />
    </div>
  );
}