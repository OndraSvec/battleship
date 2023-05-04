import Gameboard from "./gameboard";

const ComputerPlayer = (board) => {
  const opponentBoard = board || Gameboard();
  const alreadyHit = [];
  let carrierPosArr = [
    0, 5, 14, 19, 23, 28, 32, 37, 41, 46, 50, 55, 64, 69, 73, 78, 82, 87, 91,
    96,
  ];

  const attack = (position) => {
    if (alreadyHit.includes(position)) return;

    alreadyHit.push(position);
    opponentBoard.receiveAttack(position);
  };
  const findCarrier = () => {
    const randomPos = Math.floor(Math.random() * carrierPosArr.length);
    const position = carrierPosArr[randomPos];
    carrierPosArr = carrierPosArr.filter((pos) => pos !== position);
    return position;
  };
  return { attack, findCarrier };
};

export default ComputerPlayer;
