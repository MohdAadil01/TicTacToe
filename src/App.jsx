import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveState = (turns) => {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].playerName === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

const deriveGameBoard = (turns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of turns) {
    const { square, playerName } = turn;
    const { row, col } = square;

    gameBoard[row][col] = playerName;
  }
  return gameBoard;
};

const deriveWinner = (gameBoard, players) => {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

function App() {
  const [turns, setTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveState(turns);
  const gameBoard = deriveGameBoard(turns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = turns.length === 9 && !winner;

  const handleRestart = () => {
    setTurns([]);
  };

  const nameChangeHandler = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  const changeActivePlayerHandler = (rowIndex, colIndex) => {
    setTurns((prevTurn) => {
      const currentPlayer = deriveState(prevTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, playerName: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onNameChange={nameChangeHandler}
          />
          <Player
            initialName={players.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onNameChange={nameChangeHandler}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} handleRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={changeActivePlayerHandler}
          board={gameBoard}
        />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
