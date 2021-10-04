const [QUEEN, ATTACKED, EMPTY] = ["Q", "x", ""];

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
  const board = [...Array(n)].map(() => [...Array(n)]);
  return placeQueensOnBoard({ board, queenPositions });
};

export { buildBoard, determineAttacked, QUEEN, ATTACKED, EMPTY };
