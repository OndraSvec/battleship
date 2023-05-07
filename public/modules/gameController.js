/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";
import ComputerPlayer from "./computerPlayer";
import pubsub from "./pubsub";

const GameController = (() => {
  const startGame = () => {
    const humanBoard = Gameboard("HUMAN");
    const compBoard = Gameboard("COMPUTER");
    const humanPlayer = Player(compBoard);
    const compPlayer = ComputerPlayer(humanBoard);

    let activePlayer = humanPlayer;

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

    const carrierLocs = [
      [0, 1, 2, 3, 4],
      [1, 2, 3, 4, 5],
      [3, 4, 5, 6, 7],
      [5, 6, 7, 8, 9],
      [29, 39, 49, 59, 69],
      [49, 59, 69, 79, 89],
      [91, 92, 93, 94, 95],
      [10, 20, 30, 40, 50],
      [30, 40, 50, 60, 70],
      [50, 60, 70, 80, 90],
    ];

    const battleshipLocs = [
      [32, 42, 52, 62],
      [32, 33, 34, 35],
      [33, 34, 35, 36],
      [34, 35, 36, 37],
      [34, 44, 54, 64],
      [35, 45, 55, 65],
      [37, 47, 57, 67],
      [62, 63, 64, 65],
    ];

    const cruiserLocs = [
      [11, 12, 13],
      [12, 13, 14],
      [13, 14, 15],
      [14, 15, 16],
      [23, 24, 25],
      [61, 71, 81],
      [96, 97, 98],
      [97, 98, 99],
    ];

    const submarineLocs = [
      [17, 18, 19],
      [31, 41, 51],
      [48, 58, 68],
      [58, 68, 78],
      [68, 78, 88],
      [73, 74, 75],
      [85, 86, 87],
    ];

    const destroyerLocs = [
      [21, 22],
      [26, 27],
      [28, 38],
      [43, 53],
      [46, 56],
      [72, 82],
      [76, 77],
      [83, 84],
    ];

    const randomLocs = (arr) => {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    };

    humanBoard.placeShip(humanCarrier, randomLocs(carrierLocs));
    humanBoard.placeShip(humanBattleship, randomLocs(battleshipLocs));
    humanBoard.placeShip(humanCruiser, randomLocs(cruiserLocs));
    humanBoard.placeShip(humanSubmarine, randomLocs(submarineLocs));
    humanBoard.placeShip(humanDestroyer, randomLocs(destroyerLocs));

    compBoard.placeShip(compCarrier, randomLocs(carrierLocs));
    compBoard.placeShip(compBattleship, randomLocs(battleshipLocs));
    compBoard.placeShip(compCruiser, randomLocs(cruiserLocs));
    compBoard.placeShip(compSubmarine, randomLocs(submarineLocs));
    compBoard.placeShip(compDestroyer, randomLocs(destroyerLocs));

    pubsub.publish("HUMAN SHIPS PLACED", humanBoard.getBoard());
    pubsub.publish("COMPUTER SHIPS PLACED", compBoard.getBoard());

    const switchPlayers = () => {
      if (activePlayer === humanPlayer) activePlayer = compPlayer;
      else activePlayer = humanPlayer;
    };

    let huntMode = true;
    let targetMode = false;

    const setHuntMode = () => {
      huntMode = true;
      targetMode = false;
    };

    const setTargetMode = () => {
      huntMode = false;
      targetMode = true;
    };

    pubsub.subscribe("HUMAN BOARD SHIP HIT", setTargetMode);
    pubsub.subscribe("HUMAN BOARD SHIP MISS", setHuntMode);

    const compPlayerTurn = () => {
      if (huntMode) {
        compPlayer.findCarrier();
        compPlayer.attack(compPlayer.getNextHit());
      } else {
        compPlayer.attack(compPlayer.getNextHit());
      }
      switchPlayers();
    };

    const compBoardClicked = (position) => {
      humanPlayer.attack(position);
      switchPlayers();
      compPlayerTurn();
    };

    pubsub.subscribe("COMPUTER BOARD CELL CLICKED", compBoardClicked);

    const findHitShip = (obj) => {
      const compShips = [
        compCarrier,
        compBattleship,
        compCruiser,
        compSubmarine,
        compDestroyer,
      ];
      const humanShips = [
        humanCarrier,
        humanBattleship,
        humanCruiser,
        humanSubmarine,
        humanDestroyer,
      ];

      const shipName = obj.name;

      const shipToHit =
        activePlayer === humanPlayer
          ? compShips.find((ship) => Object.values(ship)[0] === shipName)
          : humanShips.find((ship) => Object.values(ship)[0] === shipName);

      shipToHit.hit();
    };
    pubsub.subscribe("COMPUTER BOARD SHIP HIT", findHitShip);
    pubsub.subscribe("HUMAN BOARD SHIP HIT", findHitShip);
  };

  return { startGame };
})();

export default GameController;
