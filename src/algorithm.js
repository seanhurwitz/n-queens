import { append, intersection, uniq } from "ramda";
import {
  ATTACKED,
  buildFlatBoard,
  determineAttacked,
  EMPTY,
  getAllTranslationsOfBoard,
  QUEEN,
  transformFlatBoard,
} from "./functions";

const getCoordinate = ({ size, index }) => {
  return [Math.floor(index / size), index % size];
};

const replaceAt = (str = "", index = 0, replacement = EMPTY) => {
  return `${str.substr(0, index)}${replacement}${str.substr(index + 1)}`;
};

const getFundamentalSolutions = (solns = [""]) => {
  const fundamentalSolutions = [transformFlatBoard(solns[0])];
  solns.forEach((soln) => {
    const board = transformFlatBoard(soln);
    const translations = getAllTranslationsOfBoard(board);
    const isUnique =
      intersection(fundamentalSolutions, translations).length === 0;
    isUnique && fundamentalSolutions.push(board);
  });
  return fundamentalSolutions;
};

const getUniqueSolutions = async (
  n = 8,
  queenPositions = [],
  uniqueSolutions = [],
  prevBoard = ""
) => {
  const timeStart = new Date();
  const placedQueens = queenPositions.length;
  let board = prevBoard.length === 0 ? buildFlatBoard(n) : prevBoard;
  const emptyCells = [];
  for (let index = 0; index < board.length; index++) {
    const [rowIndex, colIndex] = getCoordinate({ size: n, index });
    const cell = board[index];
    if (placedQueens === 0) {
      emptyCells.push([rowIndex, colIndex]);
    } else {
      const [queenRowIndex, queenColIndex] = queenPositions[placedQueens - 1];
      const isQueen = rowIndex === queenRowIndex && colIndex === queenColIndex;
      const isAttacked =
        !isQueen &&
        determineAttacked({
          rowIndex,
          colIndex,
          queenColIndex,
          queenRowIndex,
        });
      const isEmpty = !isQueen && !isAttacked && cell === EMPTY;
      if (isEmpty) {
        emptyCells.push([rowIndex, colIndex]);
      }
      if (cell === EMPTY && !isEmpty) {
        board = replaceAt(
          board,
          index,
          isQueen ? QUEEN : isAttacked ? ATTACKED : EMPTY
        );
      }
    }
  }
  if (placedQueens === n) {
    uniqueSolutions.push(board);
    return;
  }
  while (emptyCells.length > 0) {
    getUniqueSolutions(
      n,
      append(emptyCells.pop(), queenPositions),
      uniqueSolutions,
      board
    );
  }
  if (placedQueens === 0) {
    const timeBeforeUniq = new Date();
    const un = getFundamentalSolutions(uniq(uniqueSolutions));
    const timeEnd = new Date();
    return { timeStart, timeEnd, uniqueSolutions: un, timeBeforeUniq };
  }
};

export default getUniqueSolutions;
