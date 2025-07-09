import styles from './Board.module.css';
import Row from './Row';
import { PieceProps } from '../Piece/Piece';

type BoardTile = PieceProps | null;
interface BoardProps {
  boardState: BoardTile[][];
  selectedPiece: { row: number; col: number } | null;
  possibleMoves: { row: number; col: number }[];
  onTileClick: (row: number, col: number) => void;
}

export default function Board({ boardState, selectedPiece, possibleMoves, onTileClick }: BoardProps) {
  const rows = boardState.map((rowPieces, i) => (
    <Row
      key={i}
      row={i}
      rowPieces={rowPieces}
      isEven={i % 2 === 0}
      selectedPiece={selectedPiece}
      possibleMoves={possibleMoves}
      onTileClick={onTileClick}
    />
  ));

  return (
    <div className={styles.board}>
      {rows}
    </div>
  );
}