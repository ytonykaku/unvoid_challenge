'use client';

import { useState } from 'react';
import Board from '@/components/Board/Board';
import { PieceProps, Player } from '@/components/Piece/Piece';
import styles from './page.module.css';

type BoardTile = PieceProps | null;
type Coordinate = { row: number; col: number };

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

interface SelectedPiece {
  row: number;
  col: number;
  piece: PieceProps;
}

export default function Game() {
  const [boardState, setBoardState] = useState<BoardTile[][]>(initialBoardState);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('player1');
  const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Coordinate[]>([]);

  const getPossibleMoves = (piece: PieceProps, row: number, col: number): Coordinate[] => {
    const moves: Coordinate[] = [];
    const playerDirection = piece.player === 'player1' ? -1 : 1;

    const addMove = (r: number, c: number) => {
      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (!boardState[r][c] || boardState[r][c]?.player !== piece.player) {
          moves.push({ row: r, col: c });
        }
      }
    };

    switch (piece.type) {
      case 'developer':
        const l_moves = [
          [row - 2, col - 1], [row - 2, col + 1],
          [row - 1, col - 2], [row - 1, col + 2],
          [row + 1, col - 2], [row + 1, col + 2],
          [row + 2, col - 1], [row + 2, col + 1],
        ];
        l_moves.forEach(([r, c]) => addMove(r, c));
        break;

      case 'designer':
        const diagonalDirections = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        diagonalDirections.forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            const newRow = row + i * dr;
            const newCol = col + i * dc;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
              const target = boardState[newRow][newCol];
              if (!target) {
                moves.push({ row: newRow, col: newCol });
              } else {
                if (target.player !== piece.player) {
                  moves.push({ row: newRow, col: newCol });
                }
                break;
              }
            } else {
              break;
            }
          }
        });
        break;

      case 'product-owner':
        const forwardRow = row + playerDirection;
        if (forwardRow >= 0 && forwardRow < 8) {
          if (!boardState[forwardRow][col]) {
            moves.push({ row: forwardRow, col: col });
          }
        }
        const captureCols = [col - 1, col + 1];
        captureCols.forEach(c => {
          if (c >= 0 && c < 8) {
            const target = boardState[forwardRow][c];
            if (target && target.player !== piece.player) {
              moves.push({ row: forwardRow, col: c });
            }
          }
        });
        break;
    }

    return moves;
  };

  const handleTileClick = (row: number, col: number) => {
    const clickedTile = boardState[row][col];

    if (selectedPiece && possibleMoves.some(move => move.row === row && move.col === col)) {
      const newBoardState = [...boardState];
      newBoardState[selectedPiece.row][selectedPiece.col] = null;
      newBoardState[row][col] = selectedPiece.piece;
      
      setBoardState(newBoardState);
      setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
      setSelectedPiece(null);
      setPossibleMoves([]);
      return;
    }

    if (clickedTile && clickedTile.player === currentPlayer) {
      const moves = getPossibleMoves(clickedTile, row, col);
      setSelectedPiece({ row, col, piece: clickedTile });
      setPossibleMoves(moves);
    } else {
      setSelectedPiece(null);
      setPossibleMoves([]);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Unvoid Chess Game</h1>
      <Board
        boardState={boardState}
        selectedPiece={selectedPiece}
        possibleMoves={possibleMoves}
        onTileClick={handleTileClick}
      />
    </main>
  );
}