import Gameboard from "./gameboard";

const Player = (board) => {
  const opponentBoard = board || Gameboard();
  const attack = (position) => {
    opponentBoard.receiveAttack(position);
  };
  return { attack };
};

export default Player;
