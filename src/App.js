import { useState, Fragment, useEffect } from "react";
import Chessboard from "./Chessboard";
import { Body, InputContainer, Bottom, Button } from "./styles";
import { buildBoard } from "./functions";
import CodeBlock from "./CodeBlock";
import getUniqueSolutions from "./algorithm";

function App() {
  const [initialBoardSize, setInitialBoardSize] = useState(8);
  const [algorithmBoardSize, setAlgorithmBoardSize] = useState(6);
  const [algorithmResults, setAlgorithmResults] = useState();
  const [loading, setLoading] = useState(false);
  console.log(`loading`, loading);
  const runAlgorithm = async (size) => {
    await setLoading(true);
    setTimeout(
      () =>
        getUniqueSolutions(size).then(
          ({ timeStart, timeEnd, timeBeforeUniq, uniqueSolutions }) => {
            setAlgorithmResults({
              timeStart,
              timeBeforeUniq,
              timeEnd,
              uniqueSolutions,
            });
            setLoading(false);
          }
        ),
      1000
    );
  };

  useEffect(() => {
    setAlgorithmResults();
  }, [algorithmBoardSize]);
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
      <h2>Hold up... let's review recursion first!</h2>
      <p>Why do we need recursion? Wait. What IS recursion?</p>
      <p>Wait. What IS recursion?</p>
      <p>Wait. What IS recursion?</p>
      <p>Wait. What IS recursion?</p>
      <p>Wait. What IS recursion?</p>
      <p>Wait. What IS recursion?</p>
      <p>
        In computer science, recursion is a method of solving a problem where
        the solution depends on solutions to smaller instances of the same
        problem (Wikipedia)
      </p>
      <p>
        I first encountered Recusion during a Maths Paper 3 lesson in Matric
        when I wasn't listening. But somehow the idea stuck, as subtle as could
        be. I then encountered it when doing a graph data structure on
        Codecademy's computer science course. It was a maze challenge where you
        had to go traverse the graph on a specific path that was the least
        expensive path. But it was manually done. I thought to myself, well, how
        could I create an algorithm that will determine what's the best path to
        go down?
      </p>
      <p>
        Using my limited knowledge at the time, I hacked away at this and
        eventually gave up. I looked up a few ideas and I saw weird instances of
        functions calling themselves. I wasn't sure what was going on there, and
        I kinda filed away the idea, but a few courses later, the concept of
        recursion was explained to me and it all clicked!
      </p>
      <h2>
        So, how do we use recursion? All you've spoken about so far is
        sentimental backstory to try and fill up your half hour presentation
        time.
      </h2>
      <p>Essentially a recursive function has 2 outcomes:</p>
      <ol>
        <li>
          A <strong>Base Case</strong>
        </li>
        <li>
          A <strong>call to itself</strong>
        </li>
      </ol>
      <p>
        Since recursive functions call themselves, you can easily encounter an
        infinite loop, as such:
      </p>
      <CodeBlock>
        {`
        const doNothingButCrashYourComputerToo = () => {
        doNothingButCrashYourComputerToo()
        };
        
        doNothingButCrashYourComputerToo();
        `}
      </CodeBlock>
      <p>
        By introducing a Base Case, we tell the function that it's time to STOP.
        Here's some pseudocode:
      </p>
      <CodeBlock>
        {`
      const doRecursiveStuff = (args) => {
      if( Base Case is Met ){
        return some result based on args
      }
      return doRecursiveStuff(modified agrs)
      };
      
      doRecursiveStuff();
      `}
      </CodeBlock>
      <p>
        Line 4 there does NOT call the function again and thus breaks the cycle
      </p>
      <p>
        The simplest example is that of finding the Factorial of a number. If
        you don't remember from school, the factorial of a number, represented
        by 'x!', is the product of all the numbers up to and including that
        number.
      </p>
      <p>
        For example, 4 Factorial, or 4!, is equal to 4 * 3 * 2 * 1 = 24. 5! =
        120, 6! = 720 and you can see how this gets out of hand pretty quickly.
      </p>
      <p>
        So let's design a function that will determine the factorial of a given
        input
      </p>
      <CodeBlock>
        {`
    const getFactorial = (num) => {
      // return something I hope
    }
    `}
      </CodeBlock>
      <p>
        Our first question should always be:&nbsp;
        <strong>What's the Base Case?</strong> ie What's the situation where I
        don't need to call the function anymore?
      </p>
      <p>
        Let's think. What's the result of 1! ? Well, it's 1 * 1 which is 1. So
        if the argument passed to the function is 1, then let it return 1!
      </p>
      <CodeBlock>
        {`
  const getFactorial = (num) => {
    if (num <=1) {
      return num;
      // I actually made it better, because 0! is also 1.
    }
  }
  `}
      </CodeBlock>
      <p>
        Ok, so that's half the problem solved. I have a base case. Currently, if
        I pass in any number higher than 1, it will return nothing. Therefore,
        we complete the function as such:
      </p>
      <CodeBlock>
        {`
const getFactorial = (num) => {
  if (num <=1) {
    return num;
  }
  return num * getFactorial(num-1);
}

`}
      </CodeBlock>
      <p>
        Line 6 is where the magic happens. I am returning the current number
        with the result of calling itself recursively, with a new argument: the
        original number less 1. Eventually it will hit the Base Case and the
        function will stop. Some pseudocode of the process:
      </p>
      <CodeBlock>
        {`
getFactorial(4)
/*

is 4 <= 1 ?
    - NO
      return 4 * getFactorial(3)    ========>>   return 4 * 6 = 24
          is 3 <= 1 ?                                     ^^^
          - NO                                              ^^^
            return 3 * getFactorial(2)    ========>>   return 3 * 2 = 6
                is 2 <= 1 ?                                     ^^^
                - NO                                              ^^^
                  return 2 * getFactorial(1)    ========>>   return 2 * 1 = 2
                      is 1 <= 1 ?                                      ^^^
                    - YES!                                             ^^^
                      return 1    ========>>                  return 1
  
*/

`}
      </CodeBlock>
      <p>
        The function goes one level deeper each time it is called until it hits
        the base case, and then cascades back to the top with its returning
        values
      </p>
      <h2>
        It's so beautiful and elegant. But what does this have to do with Chess?
      </h2>
      <p>
        Simple enough. We can create a recursive searching algorithm to get all
        the unique solutions to the N-Queens problem
      </p>
      <img
        src="https://i.kym-cdn.com/photos/images/newsfeed/001/561/446/27d.jpg"
        alt="kronk"
      />
      <h2>
        So, now that we're all on the same page, let's see the data structure of
        the chessboard from above
      </h2>
      <CodeBlock>
        {`
const board = [...Array(n)].map(() => [...Array(n)]);

`}
      </CodeBlock>
      <p>
        The board is an array of arrays. Each row is an array, and within each
        row, there is an array of cells that makes up the columns of that row.
        It gives each cell a unique index from the row and column indexes:
      </p>
      <Chessboard size={8} passedBoard={buildBoard(8)} disable showIndexes />
      <p>
        When I place a Queen on [0, 0], it also knocks out the cells I can no
        longer place a Queen:
      </p>
      <Chessboard
        size={8}
        passedBoard={buildBoard(8, [[0, 0]])}
        disable
        showIndexes
      />
      <p>
        The prospective algorithm can then detect the next available square is
        [1, 2] and will place a Queen there:
      </p>
      <Chessboard
        size={8}
        passedBoard={buildBoard(8, [
          [0, 0],
          [1, 2],
        ])}
        disable
        showIndexes
      />
      <p>
        The algorithm can recursively place queens until one of 2 things happens
      </p>
      <ol>
        <li>There are no available squares</li>
        <li>We have reached the optimal number of Queens</li>
      </ol>
      <p>
        Voila! We have found our <strong>Base Case!!</strong>
      </p>
      <h2>The Glory Code</h2>
      <p>
        This code will resursively find all unique fundamental solutions of the
        N queens problem. Beware. Above N=8 takes a bit to compute!
      </p>
      <CodeBlock>
        {`
      
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
      
      `}
      </CodeBlock>
      <p>
        Lines 46 to 52 call the function recursively, with a new set of Queens
        and a passed board to reduce the number of Empty cells. A depth-first
        search of this magnitude will have a time of O(N!)
      </p>
      <h2>Let's see it in action!</h2>
      <InputContainer>
        <p>Size:</p>
        <input
          type="number"
          value={algorithmBoardSize}
          onChange={(e) => setAlgorithmBoardSize(+e.target.value)}
        />
      </InputContainer>
      <Button
        onClick={() => {
          runAlgorithm(algorithmBoardSize);
        }}
      >
        RUN!
      </Button>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        algorithmResults && (
          <Fragment>
            <p>Time begun: {algorithmResults.timeStart.toString()}</p>
            <p>
              Time until fundamental stripping (ie removing symmetrical
              solutions): {algorithmResults.timeBeforeUniq.toString()}
            </p>
            <p>Total Time: {algorithmResults.timeEnd.toString()}</p>
            <p>
              <strong>{algorithmResults.uniqueSolutions.length}</strong>{" "}
              Fundamental Solution(s)
            </p>
            {algorithmResults.uniqueSolutions.map((soln) => (
              <Chessboard
                passedBoard={soln}
                disable
                size={algorithmBoardSize}
              />
            ))}
          </Fragment>
        )
      )}
      <Bottom />
    </Body>
  );
}

export default App;
