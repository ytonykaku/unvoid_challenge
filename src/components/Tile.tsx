import styles from './Board.module.css';

interface TileProps {
  isEven: boolean;
}

export default function Tile({ isEven }: TileProps) {
  const tileColorClass = isEven ? styles.evenTile : styles.oddTile;
  return <div className={`${styles.tile} ${tileColorClass}`}></div>;
}