const buildBoard = (n = 8) => [...Array(n)].map(() => [...Array(n)]);

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

export { buildBoard, determineAttacked };
