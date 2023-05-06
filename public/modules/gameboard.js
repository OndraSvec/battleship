import pubsub from "./pubsub";

const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 100; i += 1) {
    board.push({
      shipName: null,
      shipMiss: null,
    });
  }
  const getBoard = () => board;

  const placeShip = (ship, locationCoordinates) => {
    locationCoordinates.forEach((position) => {
      board[position].shipName = ship.name;
    });
  };

  const receiveAttack = (position) => {
    if (!board[position].shipName) {
      board[position].shipMiss = true;
    } else {
      board[position].shipMiss = false;
      pubsub.publish("SHIP HIT", board[position].shipName);
    }
  };

  return {
    getBoard,
    placeShip,
    receiveAttack,
  };
};

export default Gameboard;
