'use client';

import { useState } from 'react';
import Board from '@/components/Board/Board';
import SizeSelector from '@/components/Board/SizeSelector';
import { PieceProps, Player } from '@/components/Piece/Piece';
import styles from './page.module.css';

type BoardTile = PieceProps | null;
type Coordinate = { row: number; col: number };

const createEmptyBoard = (width: number, height: number): BoardTile[][] => {
  return Array.from({ length: height }, () => Array(width).fill(null));
};

const populateBoard = (width: number, height: number): BoardTile[][] => {
  const newBoard = createEmptyBoard(width, height);

  if (width >= 3 && height >= 1) {
    newBoard[0][width - 1] = { type: 'product-owner', player: 'player2' };
    newBoard[0][width - 2] = { type: 'developer', player: 'player2' };
    newBoard[0][width - 3] = { type: 'designer', player: 'player2' };

    newBoard[height - 1][0] = { type: 'product-owner', player: 'player1' };
    newBoard[height - 1][1] = { type: 'developer', player: 'player1' };
    newBoard[height - 1][2] = { type: 'designer', player: 'player1' };
  }

  return newBoard;
};

interface SelectedPiece {
  row: number;
  col: number;
  piece: PieceProps;
}

export default function Game() {
  const [boardSize, setBoardSize] = useState({ width: 8, height: 8 });
  const [boardState, setBoardState] = useState<BoardTile[][]>(() => populateBoard(boardSize.width, boardSize.height));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('player1');
  const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Coordinate[]>([]);

  const handleSizeChange = (newWidth: number, newHeight: number) => {
    setBoardSize({ width: newWidth, height: newHeight });
    setBoardState(populateBoard(newWidth, newHeight));
    setSelectedPiece(null);
    setPossibleMoves([]);
    setCurrentPlayer('player1');
  };

  const getPossibleMoves = (piece: PieceProps, row: number, col: number): Coordinate[] => {
    const moves: Coordinate[] = [];
    const playerDirection = piece.player === 'player1' ? -1 : 1;

    const addMove = (r: number, c: number) => {
      if (r >= 0 && r < boardSize.height && c >= 0 && c < boardSize.width) {
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
                const maxDist = Math.max(boardSize.width, boardSize.height);
                for (let i = 1; i < maxDist; i++) {
                    const newRow = row + i * dr;
                    const newCol = col + i * dc;
                    if (newRow >= 0 && newRow < boardSize.height && newCol >= 0 && newCol < boardSize.width) {
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
            if (forwardRow >= 0 && forwardRow < boardSize.height) {
                if (col >= 0 && col < boardSize.width && !boardState[forwardRow][col]) {
                    moves.push({ row: forwardRow, col: col });
                }
            }
            const captureCols = [col - 1, col + 1];
            captureCols.forEach(c => {
                if (c >= 0 && c < boardSize.width && forwardRow >= 0 && forwardRow < boardSize.height) {
                    const target = boardState[forwardRow]?.[c];
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
    const clickedTile = boardState[row]?.[col];

    if (selectedPiece && possibleMoves.some(move => move.row === row && move.col === col)) {
        const newBoardState = boardState.map(r => [...r]);
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
      <SizeSelector onSizeChange={handleSizeChange} />
    </main>
  );
}