import pubsub from "./pubsub";

const Gameboard = (name) => {
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
      pubsub.publish(`${name} BOARD SHIP MISS`, position);
    } else {
      board[position].shipMiss = false;
      pubsub.publish(`${name} BOARD SHIP HIT`, {
        name: board[position].shipName,
        location: position,
      });
    }
  };

  return {
    name,
    getBoard,
    placeShip,
    receiveAttack,
  };
};

export default Gameboard;
