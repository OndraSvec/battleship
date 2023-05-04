import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";
import ComputerPlayer from "./computerPlayer";

const GameController = () => {
  const humanBoard = Gameboard();
  const compBoard = Gameboard();
  const humanPlayer = Player(compBoard);
  const compPlayer = ComputerPlayer(humanBoard);

  let activePlayer = humanPlayer;

  const switchPlayers = () => {
    if (activePlayer === humanPlayer) activePlayer = compPlayer;
    else activePlayer = humanPlayer;
  };

  const getActivePlayer = () => activePlayer;

  return { switchPlayers, getActivePlayer };
};

export default GameController;
