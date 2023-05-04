const Player = (board) => {
  const opponentBoard = board;
  const alreadyHit = [];
  const attack = (position) => {
    if (alreadyHit.includes(position)) return;

    alreadyHit.push(position);
    opponentBoard.receiveAttack(position);
  };
  return { attack };
};

export default Player;
