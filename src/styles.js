import styled from "styled-components";

const Body = styled.div`
  color: #45103e;
  margin: auto;
  width: 60vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  & h1,
  h2,
  p {
    padding: 1rem;
    text-align: center;
  }
  & h1 {
    font-size: 4rem;
  }
  & input {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const InputContainer = styled.div`
  width: 400px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

const Square = styled.div`
  cursor: ${({ canBeClicked }) => canBeClicked && "pointer"};
  position: relative;
  width: 100%;
  height: 100%;
  background: ${({ isDark }) => isDark && "#45103E"};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;

const QueenSquare = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: lightblue;
`;

const AttackedSquare = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: red;
`;

const Queen = styled.img`
  position: absolute;
  width: 80%;
  height: 80%;
  z-index: 2;
`;

const ChessboardBase = styled.div`
  width: 400px;
  height: 400px;
  display: grid;
  grid-template-columns: ${({ size }) => `repeat(${size}, 1fr)`};
  grid-template-rows: ${({ size }) => `repeat(${size}, 1fr)`};
  border: 2px solid #333;
`;

const ChessBoardContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 1rem;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Reset = styled.div`
  cursor: pointer;
  font-weight: bold;
  color: "#45103E";
`;

export {
  Reset,
  Square,
  ChessboardBase,
  Body,
  Queen,
  QueenSquare,
  AttackedSquare,
  ChessBoardContainer,
  Stats,
  InputContainer,
};
