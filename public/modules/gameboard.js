const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 100; i += 1) {
    board.push({ shipName: null, shipLength: null, isHit: false });
  }
  const getBoard = () => board;

  const placeShip = (ship, coordinates) => {
    coordinates.forEach((position) => {
      board[position].shipName = ship.name;
      board[position].shipLength = ship.length;
    });
  };
  return {
    getBoard,
    placeShip,
  };
};

export default Gameboard;
