import { reverse, uniq } from "ramda";

const [QUEEN, ATTACKED, EMPTY] = ["Q", "x", " "];

const determineAttacked = ({
  rowIndex,
  colIndex,
  queenRowIndex,
  queenColIndex,
}) => {
  const isOnRow = rowIndex === queenRowIndex;
  const isOnCol = colIndex === queenColIndex;
  const isOnDiagonal =
    Math.abs(queenRowIndex - rowIndex) === Math.abs(queenColIndex - colIndex);
  return isOnRow || isOnCol || isOnDiagonal;
};

const placeQueensOnBoard = ({ board, queenPositions }) => {
  if (queenPositions.length === 0) {
    return board;
  }
  const removedQueenBoard = board.map((row, rowIndex) => {
    return row.map((_, colIndex) => {
      const isAttacked = queenPositions.some((coord) => {
        const [queenRowIndex, queenColIndex] = coord;
        return determineAttacked({
          rowIndex,
          colIndex,
          queenRowIndex,
          queenColIndex,
        });
      });
      return isAttacked ? ATTACKED : EMPTY;
    });
  });
  queenPositions.forEach((coord) => {
    removedQueenBoard[coord[0]][coord[1]] = QUEEN;
  });
  return removedQueenBoard;
};

const buildBoard = (n = 8, queenPositions = []) => {
  const board = [...Array(n)].map(() => [...Array(n).fill(EMPTY)]);
  return placeQueensOnBoard({ board, queenPositions });
};

const buildFlatBoard = (n = 8) => {
  return EMPTY.repeat(n ** 2);
};

const flipBoardHorizontally = (board) => board.map((row) => reverse(row));
const flipBoardVertically = (board) => reverse(board);
const flipBoardDiagonally = (board) =>
  board.map((_, rowIndex) =>
    _.map((__, colIndex) => board[colIndex][rowIndex])
  );

const transformFlatBoard = (board = "") => {
  const size = Math.sqrt(board.length);
  return [...Array(size)].map((row, rowIndex) =>
    [...Array(size)].map((col, colIndex) => {
      const boardPosition = size * rowIndex + colIndex;
      return board[boardPosition];
    })
  );
};

const getAllTranslationsOfBoard = (board) => {
  const horizFlip = flipBoardHorizontally(board);
  const vertFlip = flipBoardVertically(board);
  const fullFlip = flipBoardHorizontally(vertFlip);
  return uniq([
    board,
    horizFlip,
    vertFlip,
    fullFlip,
    ...[horizFlip, vertFlip, fullFlip].map((brd) => flipBoardDiagonally(brd)),
  ]);
};

export {
  buildBoard,
  determineAttacked,
  transformFlatBoard,
  placeQueensOnBoard,
  QUEEN,
  ATTACKED,
  EMPTY,
  flipBoardVertically,
  flipBoardHorizontally,
  flipBoardDiagonally,
  getAllTranslationsOfBoard,
  buildFlatBoard,
};
