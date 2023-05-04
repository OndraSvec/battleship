import Gameboard from "./gameboard";

const Player = (board) => {
  const opponentBoard = board || Gameboard();
  const alreadyHit = [];
  const attack = (position) => {
    if (alreadyHit.includes(position)) return;

    alreadyHit.push(position);
    opponentBoard.receiveAttack(position);
  };
  return { attack };
};

export default Player;
