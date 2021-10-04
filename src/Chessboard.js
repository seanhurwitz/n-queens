import React, { useState, Fragment, useEffect } from "react";
import {
  ChessboardBase,
  Square,
  Queen,
  QueenSquare,
  AttackedSquare,
  ChessBoardContainer,
  Reset,
  Stats,
} from "./styles";
import { buildBoard, determineAttacked } from "./functions";

const [QUEEN, ATTACKED, EMPTY] = ["Q", "x", undefined];

const Chessboard = ({ passedBoard = buildBoard(), size = 8 }) => {
  const [queensLeft, setQueensLeft] = useState(size);
  const [board, setBoard] = useState(passedBoard);

  const handleSquareClick = ({
    rowIndex,
    colIndex,
    canBeClicked,
    hasQueen,
  }) => {
    if (canBeClicked) {
      setQueensLeft((prev) => prev - (hasQueen ? -1 : 1));
      setBoard((prev) => {
        if (hasQueen) {
          const queenPositions = prev
            .flatMap((prevRow, prevRowIndex) =>
              prevRow.map(
                (prevCol, prevColIndex) =>
                  prevCol === QUEEN && [prevRowIndex, prevColIndex]
              )
            )
            .filter(
              (coord) => coord && coord[0] !== rowIndex && coord[1] !== colIndex
            );
          const emptyBoard = buildBoard(size);
          if (queenPositions.length === 0) {
            return emptyBoard;
          }
          const removedQueenBoard = buildBoard(size).map(
            (newRow, newRowIndex) => {
              return newRow.map((_, newColIndex) => {
                const isAttacked = queenPositions.some((coord) => {
                  const [queenRowIndex, queenColIndex] = coord;
                  return determineAttacked({
                    rowIndex: newRowIndex,
                    colIndex: newColIndex,
                    queenRowIndex,
                    queenColIndex,
                  });
                });
                return isAttacked ? ATTACKED : EMPTY;
              });
            }
          );
          queenPositions.forEach((coord) => {
            removedQueenBoard[coord[0]][coord[1]] = QUEEN;
          });
          return removedQueenBoard;
        }
        const newBoard = prev.map((prevRow, prevRowIndex) => {
          return prevRow.map((prevCol, prevColIndex) => {
            const isAttacked = determineAttacked({
              rowIndex: prevRowIndex,
              colIndex: prevColIndex,
              queenColIndex: colIndex,
              queenRowIndex: rowIndex,
            });
            const isQueenSquare =
              prevRowIndex === rowIndex && prevColIndex === colIndex;
            return isQueenSquare ? QUEEN : isAttacked ? ATTACKED : prevCol;
          });
        });
        return newBoard;
      });
    }
  };

  const passedBoardString = JSON.stringify(passedBoard);

  const resetBoard = () => {
    setQueensLeft(size);
    setBoard(JSON.parse(passedBoardString));
  };

  useEffect(resetBoard, [size, passedBoardString]);

  const isNoMoreAvailableMoves = board.every((r) => r.every(Boolean));
  console.log(`isNoMoreAvailableMoves`, isNoMoreAvailableMoves);

  const statsText =
    queensLeft === 0
      ? `Well Done!`
      : isNoMoreAvailableMoves
      ? `Ouch! only ${size - queensLeft} and you're stuck! Try again!`
      : `${queensLeft} Queens to Place`;

  return (
    <ChessBoardContainer>
      <ChessboardBase size={size}>
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            const hasQueen = col === QUEEN;
            const isAttacked = col === ATTACKED;
            const canBeClicked = !isAttacked;
            const key = `${rowIndex}${colIndex}`;
            const isDark = (rowIndex + colIndex) % 2 !== 0;
            return (
              <Square
                isDark={isDark}
                key={key}
                canBeClicked={canBeClicked}
                onClick={() =>
                  handleSquareClick({
                    rowIndex,
                    colIndex,
                    canBeClicked,
                    hasQueen,
                  })
                }
              >
                {hasQueen && (
                  <Fragment>
                    <QueenSquare />
                    <Queen src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_tile_ql.svg/1200px-Chess_tile_ql.svg.png" />
                  </Fragment>
                )}
                {isAttacked && <AttackedSquare />}
              </Square>
            );
          })
        )}
      </ChessboardBase>
      <Stats>
        <div>{statsText}</div>
        <Reset onClick={resetBoard}>Reset</Reset>
      </Stats>
    </ChessBoardContainer>
  );
};

export default Chessboard;
