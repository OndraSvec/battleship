const ComputerPlayer = (board) => {
  const opponentBoard = board;
  const alreadyHit = [];
  const nextHit = [];
  let carrierPosArr = [
    0, 5, 14, 19, 23, 28, 32, 37, 41, 46, 50, 55, 64, 69, 73, 78, 82, 87, 91,
    96,
  ];

  const getNextHit = () => nextHit[0];

  const attack = (position) => {
    if (alreadyHit.includes(position)) return;

    alreadyHit.push(position);
    opponentBoard.receiveAttack(position);
    nextHit.pop();
  };

  const findCarrier = () => {
    const randomPos = Math.floor(Math.random() * carrierPosArr.length);
    const position = carrierPosArr[randomPos];
    carrierPosArr = carrierPosArr.filter((pos) => pos !== position);
    nextHit.push(position);
  };

  return { attack, findCarrier, getNextHit };
};

export default ComputerPlayer;
