import Tile from './Tile';
import { PieceProps } from '../Piece/Piece';

interface RowProps {
  isEven: boolean;
  row: number;
  rowPieces: (PieceProps | null)[];
  selectedPiece: { row: number; col: number } | null;
  possibleMoves: { row: number, col: number }[];
  onTileClick: (row: number, col: number) => void;
}

export default function Row({ isEven, row, rowPieces, selectedPiece, possibleMoves, onTileClick }: RowProps) {
  const tiles = rowPieces.map((piece, col) => {
    const isSelected = selectedPiece?.row === row && selectedPiece?.col === col;
    const isPossibleMove = possibleMoves.some(move => move.row === row && move.col === col);
    
    return (
      <Tile
        key={col}
        piece={piece}
        isEven={(col % 2 === 0) === isEven}
        isSelected={isSelected}
        isPossibleMove={isPossibleMove}
        onClick={() => onTileClick(row, col)}
      />
    );
  });

  return <>{tiles}</>;
}