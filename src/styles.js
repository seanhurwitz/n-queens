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
    padding: 2rem 1rem;
    text-align: center;
    font-size: 1.5rem;
  }
  & h2 {
    font-size: 2.5rem;
  }
  & h1 {
    font-size: 6rem;
  }
  & ol,
  li {
    font-size: 1.5rem;
    text-align: left;
  }
  & p {
    line-height: 2.2rem;
    text-align: justify;
    text-justify: justify;
  }
  & input {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const InputContainer = styled.div`
  width: 500px;
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
  width: 500px;
  height: 500px;
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
  color: #45103e;
`;

const Bottom = styled.div`
  height: 500px;
`;

const IndexContext = styled.div`
  color: black;
  background: white;
  padding: 0.2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 3px;
  color: white;
  background: #45103e;
  border: none;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
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
  Button,
  InputContainer,
  Bottom,
  IndexContext,
};
