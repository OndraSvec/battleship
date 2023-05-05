/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";
import ComputerPlayer from "./computerPlayer";

const GameController = (() => {
  let humanBoard;
  let compBoard;
  let humanPlayer;
  let compPlayer;

  const startGame = () => {
    humanBoard = Gameboard();
    compBoard = Gameboard();
    humanPlayer = Player(compBoard);
    compPlayer = ComputerPlayer(humanBoard);

    const humanCarrier = Ship("Carrier");
    const compCarrier = Ship("Carrier");
    const humanBattleship = Ship("Battleship");
    const compBattleship = Ship("Battleship");
    const humanCruiser = Ship("Cruiser");
    const compCruiser = Ship("Cruiser");
    const humanSubmarine = Ship("Submarine");
    const compSubmarine = Ship("Submarine");
    const humanDestroyer = Ship("Destroyer");
    const compDestroyer = Ship("Destroyer");

    const availablePositionsHumanBrd = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        availablePositionsHumanBrd.push([i, j]);
      }
    }

    const availablePositionsCompBrd = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        availablePositionsCompBrd.push([i, j]);
      }
    }

    const findHorizontalPlacement = (board, shipLength) => {
      let placementArr = [];

      const startPosition = board.filter(
        (coord) => coord[1] <= 9 - (shipLength - 1)
      );
      const randomPos = Math.floor(Math.random() * startPosition.length);

      for (let i = 0; i < 5; i += 1) {
        placementArr.push(startPosition[randomPos]);
      }
      placementArr = placementArr.map(
        (item, index) => (item = [item[0], item[1] + index])
      );
      return placementArr;
    };

    const findVerticalPlacement = (board, shipLength) => {
      let placementArr = [];

      const startPosition = board.filter(
        (coord) => coord[0] <= 9 - (shipLength - 1)
      );
      const randomPos = Math.floor(Math.random() * startPosition.length);

      for (let i = 0; i < shipLength; i += 1) {
        placementArr.push(startPosition[randomPos]);
      }
      placementArr = placementArr.map(
        (item, index) => (item = [item[0] + index, item[1]])
      );
      return placementArr;
    };
  };

  let activePlayer = humanPlayer;

  const switchPlayers = () => {
    if (activePlayer === humanPlayer) activePlayer = compPlayer;
    else activePlayer = humanPlayer;
  };

  const getActivePlayer = () => activePlayer;

  return { startGame, switchPlayers, getActivePlayer };
})();

export default GameController;
