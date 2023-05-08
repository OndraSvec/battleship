import "../styles/style.css";
import pubsub from "./pubsub";

const gameboards = document.getElementById("Gameboards");
const firstBoard = document.querySelector(".Humanboard");
const secondBoard = document.querySelector(".Computerboard");

const removeChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
};

const renderBoard = (parent, abbr) => {
  for (let i = 0; i < 100; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("board-cell");
    cell.setAttribute("id", `${abbr}-cell-${i}`);
    parent.appendChild(cell);
  }
};
const renderHumanShips = (arr) => {
  arr.forEach((item, index) => {
    if (item.shipName) {
      const targetCell = document.getElementById(`human-cell-${index}`);
      targetCell.classList.add("placed-ship");
    }
  });
};

const renderFirst = () => {
  removeChildren(firstBoard);
  renderBoard(firstBoard, "human");
};

const alertCompCellClick = (e) => {
  const targetCell = e.target.closest("div");
  const targetCellIndex = targetCell.id.split("-")[2];
  if (
    targetCell.classList.contains("ship-hit") ||
    targetCell.classList.contains("ship-miss")
  ) {
    return;
  }
  pubsub.publish("COMPUTER BOARD CELL CLICKED", targetCellIndex);
};

const renderSecond = () => {
  removeChildren(secondBoard);
  renderBoard(secondBoard, "comp");
  secondBoard.addEventListener("click", alertCompCellClick);
};

const showCompBrdShipHit = (obj) => {
  const position = obj.location;
  const targetCell = document.getElementById(`comp-cell-${position}`);
  targetCell.className = "board-cell ship-hit";
  const cross = document.createElement("div");
  cross.classList.add("cross");
  targetCell.appendChild(cross);
};

const showHumanBrdShipHit = (obj) => {
  const position = obj.location;
  const targetCell = document.getElementById(`human-cell-${position}`);
  targetCell.className = "board-cell ship-hit";
  const cross = document.createElement("div");
  cross.classList.add("cross");
  targetCell.appendChild(cross);
};

const showCompBrdShipMiss = (position) => {
  const targetCell = document.getElementById(`comp-cell-${position}`);
  targetCell.className = "board-cell ship-miss";
};

const showHumanBrdShipMiss = (position) => {
  const targetCell = document.getElementById(`human-cell-${position}`);
  targetCell.className = "board-cell ship-miss";
};

const gameOverDiv = document.querySelector(".gameOver");
const announceWinnerDiv = document.getElementById("announceWinner");

const reportGameOver = (string) => {
  window.scrollTo({ top: 0, left: 0 });
  document.body.setAttribute("style", "overflow-y: hidden;");
  gameOverDiv.setAttribute("style", "transition: transform 0.4s ease-in-out;");
  gameOverDiv.classList.add("active");
  if (string === "COMPUTER") {
    announceWinnerDiv.textContent =
      "Rejoice! You have destroyed all your enemy's ships!";
    announceWinnerDiv.setAttribute("style", "color: var(--cell-ship);");
  } else {
    announceWinnerDiv.textContent = "Bend the knee! You have been crushed!";
    announceWinnerDiv.setAttribute("style", "color: var(--cell-ship-comp);");
  }
};

const restartGame = () => {
  gameOverDiv.classList.remove("active");
  pubsub.publish("GAME RESTART");
};

const restartGameBtn = document.getElementById("restartGame");
restartGameBtn.addEventListener("click", restartGame);

pubsub.subscribe("HUMAN SHIPS PLACED", renderHumanShips);
pubsub.subscribe("COMPUTER BOARD SHIP HIT", showCompBrdShipHit);
pubsub.subscribe("HUMAN BOARD SHIP HIT", showHumanBrdShipHit);
pubsub.subscribe("COMPUTER BOARD SHIP MISS", showCompBrdShipMiss);
pubsub.subscribe("HUMAN BOARD SHIP MISS", showHumanBrdShipMiss);
pubsub.subscribe("HUMAN PLAYER'S SHIPS HAVE ALL BEEN SUNK", reportGameOver);
pubsub.subscribe("COMPUTER PLAYER'S SHIPS HAVE ALL BEEN SUNK", reportGameOver);

export { renderFirst, renderSecond };
