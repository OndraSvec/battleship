import Gameboard from "./gameboard";

const ComputerPlayer = (board) => {
  const opponentBoard = board || Gameboard();
  const alreadyHit = [];
  const attack = (position) => {
    if (alreadyHit.includes(position)) return;

    opponentBoard.receiveAttack(position);
  };
  const getPosition = () => {
    const carrierPosArr = [
      0, 5, 14, 19, 23, 28, 32, 37, 41, 46, 50, 55, 64, 69, 73, 78, 82, 87, 91,
      96,
    ];
    const randomPos = Math.floor(Math.random() * carrierPosArr.length);
    const position = carrierPosArr[randomPos];
    return position;
  };
  return { attack, getPosition };
};

export default ComputerPlayer;
