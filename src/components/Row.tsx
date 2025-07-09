import Tile from './Tile';

interface RowProps {
  isEven: boolean;
}

export default function Row({ isEven }: RowProps) {
  const tiles = [];
  for (let i = 0; i < 8; i++) {
    tiles.push(<Tile key={i} isEven={(i % 2 === 0) === isEven} />);
  }
  return <>{tiles}</>;
}