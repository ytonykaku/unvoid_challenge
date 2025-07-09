import styles from './Board.module.css';
import Row from './Row';
import { PieceProps } from '../Piece/Piece';

type BoardTile = PieceProps | null;

const initialBoardState: BoardTile[][] = [
  [
    { type: 'designer', player: 'player2' }, { type: 'developer', player: 'player2' },
    { type: 'developer', player: 'player2' }, { type: 'designer', player: 'player2' },
    null, null, null, null
  ],
  [
    { type: 'product-owner', player: 'player2' }, { type: 'product-owner', player: 'player2' },
    null, null, null, null, null, null
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    null, null, null, null, null, null,
    { type: 'product-owner', player: 'player1' }, { type: 'product-owner', player: 'player1' }
  ],
  [
    null, null, null, null,
    { type: 'designer', player: 'player1' }, { type: 'developer', player: 'player1' },
    { type: 'developer', player: 'player1' }, { type: 'designer', player: 'player1' }
  ],
];

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