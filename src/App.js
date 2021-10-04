import { useState } from "react";
import Chessboard from "./Chessboard";
import { Body, InputContainer } from "./styles";
import { buildBoard } from "./functions";

function App() {
  const [initialBoardSize, setInitialBoardSize] = useState(8);
  return (
    <Body>
      <h1>N-Queens Problem</h1>
      <h2>Because Chess, React and Recursion are all cool things</h2>
      <p>
        The n-queens problem involves placing N queens on an NxN chessboard in
        such a way that no queen is attacking any other queen.
      </p>
      <p>
        You can try here on this board! Click a square to place a queen. Click a
        queen to remove. Generally, we start with the standard 8x8 board, but
        you can go with any size you wish! Notice, however, that 2x2 and 3x3
        don't have any solutions!
      </p>
      <InputContainer>
        <p>Size:</p>
        <input
          type="number"
          value={initialBoardSize}
          onChange={(e) => setInitialBoardSize(+e.target.value)}
        />
      </InputContainer>
      <Chessboard
        size={initialBoardSize}
        passedBoard={buildBoard(initialBoardSize)}
      />
    </Body>
  );
}

export default App;
