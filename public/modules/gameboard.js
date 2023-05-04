const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 100; i += 1) {
    board.push({
      shipName: null,
      shipLength: null,
      shipHit: null,
      shipMiss: null,
    });
  }
  const getBoard = () => board;

  const placeShip = (ship, locationCoordinates) => {
    locationCoordinates.forEach((position) => {
      board[position].shipName = ship.name;
      board[position].shipLength = ship.length;
    });
  };

  const receiveAttack = (position) => {
    if (!board[position].shipName) {
      board[position].shipMiss = true;
      board[position].shipHit = false;
    } else {
      board[position].shipHit = true;
      board[position].shipMiss = false;
    }
  };

  return {
    getBoard,
    placeShip,
    receiveAttack,
  };
};

export default Gameboard;
