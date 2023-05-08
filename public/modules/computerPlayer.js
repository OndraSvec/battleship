import pubsub from "./pubsub";

const ComputerPlayer = (board) => {
  const opponentBoard = board;
  const alreadyHit = [];
  let nextHit = [];
  let availablePositions = [];
  let carrierPosArr = [
    0, 5, 14, 19, 23, 28, 32, 37, 41, 46, 50, 55, 64, 69, 73, 78, 82, 87, 91,
    96,
  ];

  for (let i = 0; i < 100; i += 1) availablePositions.push(i);

  const getNextHit = () => nextHit[nextHit.length - 1];

  const attack = (position) => {
    if (nextHit.length) {
      const nextHitRemaining =
        nextHit[Math.floor(Math.random() * nextHit.length)];
      alreadyHit.push(nextHitRemaining);
      opponentBoard.receiveAttack(nextHitRemaining);
    } else {
      alreadyHit.push(position);
      opponentBoard.receiveAttack(position);
    }
    nextHit = nextHit.filter((num) => !alreadyHit.includes(num));
    availablePositions = availablePositions.filter(
      (num) => !alreadyHit.includes(num)
    );
    carrierPosArr = carrierPosArr.filter((num) => !alreadyHit.includes(num));
    console.log(nextHit);
  };

  const findCarrier = () => {
    if (nextHit.length) return;
    if (carrierPosArr.length) {
      const randomPos = Math.floor(Math.random() * carrierPosArr.length);
      const position = carrierPosArr[randomPos];
      carrierPosArr = carrierPosArr.filter((pos) => pos !== position);
      nextHit.push(position);
    } else {
      const randomPos = Math.floor(Math.random() * availablePositions.length);
      const availablePosition = availablePositions[randomPos];
      nextHit.push(availablePosition);
    }
  };

  const targetModeTurn = (obj) => {
    const position = Number(obj.location);
    let targetArr = [];
    let toHitNext;
    const randomInd = (arrLength) => {
      const randomI = Math.floor(Math.random() * arrLength);
      return randomI;
    };
    switch (true) {
      case position === 0:
        targetArr = [position + 1, position + 10];
        targetArr = targetArr.filter((num) => !alreadyHit.includes(num));
        toHitNext = targetArr[randomInd(targetArr.length)];
        if (toHitNext === undefined) {
          nextHit.push(
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ]
          );
        } else targetArr.forEach((num) => nextHit.push(num));
        break;
      case position < 9:
        targetArr = [position - 1, position + 1, position + 10];
        targetArr = targetArr.filter((num) => !alreadyHit.includes(num));
        toHitNext = targetArr[randomInd(targetArr.length)];
        if (toHitNext === undefined) {
          nextHit.push(
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ]
          );
        } else targetArr.forEach((num) => nextHit.push(num));
        break;
      case position === 9:
        targetArr = [position - 1, position + 10];
        targetArr = targetArr.filter((num) => !alreadyHit.includes(num));
        toHitNext = targetArr[randomInd(targetArr.length)];
        if (toHitNext === undefined) {
          nextHit.push(
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ]
          );
        } else targetArr.forEach((num) => nextHit.push(num));
        break;
      case position === 10:
      case position === 20:
      case position === 30:
      case position === 40:
      case position === 50:
      case position === 60:
      case position === 70:
      case position === 80:
        targetArr = [position - 10, position + 1, position + 10];
        targetArr = targetArr.filter((num) => !alreadyHit.includes(num));
        toHitNext = targetArr[randomInd(targetArr.length)];
        if (toHitNext === undefined) {
          nextHit.push(
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ]
          );
        } else targetArr.forEach((num) => nextHit.push(num));
        break;
      case position === 90:
        targetArr = [position - 10, position + 1];
        targetArr = targetArr.filter((num) => !alreadyHit.includes(num));
        toHitNext = targetArr[randomInd(targetArr.length)];
        if (toHitNext === undefined) {
          nextHit.push(
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ]
          );
        } else targetArr.forEach((num) => nextHit.push(num));
        break;
      case position > 10 && position < 19:
      case position > 20 && position < 29:
      case position > 30 && position < 39:
      case position > 40 && position < 49:
      case position > 50 && position < 59:
      case position > 60 && position < 69:
      case position > 70 && position < 79:
      case position > 80 && position < 89:
        targetArr = [position - 10, position - 1, position + 1, position + 10];
        targetArr = targetArr.filter((num) => !alreadyHit.includes(num));
        toHitNext = targetArr[randomInd(targetArr.length)];
        if (toHitNext === undefined) {
          nextHit.push(
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ]
          );
        } else targetArr.forEach((num) => nextHit.push(num));
        break;
      case position === 19:
      case position === 29:
      case position === 39:
      case position === 49:
      case position === 59:
      case position === 69:
      case position === 79:
      case position === 89:
        targetArr = [position - 10, position - 1, position + 10];
        targetArr = targetArr.filter((num) => !alreadyHit.includes(num));
        toHitNext = targetArr[randomInd(targetArr.length)];
        if (toHitNext === undefined) {
          nextHit.push(
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ]
          );
        } else targetArr.forEach((num) => nextHit.push(num));
        break;
      case position > 90 && position < 99:
        targetArr = [position - 1, position - 10, position + 1];
        targetArr = targetArr.filter((num) => !alreadyHit.includes(num));
        toHitNext = targetArr[randomInd(targetArr.length)];
        if (toHitNext === undefined) {
          nextHit.push(
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ]
          );
        } else targetArr.forEach((num) => nextHit.push(num));
        break;
      case position === 99:
        targetArr = [position - 1, position - 10];
        targetArr = targetArr.filter((num) => !alreadyHit.includes(num));
        toHitNext = targetArr[randomInd(targetArr.length)];
        if (toHitNext === undefined) {
          nextHit.push(
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ]
          );
        } else targetArr.forEach((num) => nextHit.push(num));
        break;
      default:
    }
  };

  pubsub.subscribe("HUMAN BOARD SHIP HIT", targetModeTurn);

  return { attack, findCarrier, getNextHit };
};

export default ComputerPlayer;
