import "../styles/style.css";
import pubsub from "./pubsub";

const firstBoard = document.querySelector(".Humanboard");
const secondBoard = document.querySelector(".Computerboard");

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
const renderCompShips = (arr) => {
  arr.forEach((item, index) => {
    if (item.shipName) {
      const targetCell = document.getElementById(`comp-cell-${index}`);
      targetCell.classList.add("placed-ship");
    }
  });
};

const renderFirst = () => {
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

pubsub.subscribe("HUMAN SHIPS PLACED", renderHumanShips);
pubsub.subscribe("COMPUTER SHIPS PLACED", renderCompShips);
pubsub.subscribe("COMPUTER BOARD SHIP HIT", showCompBrdShipHit);
pubsub.subscribe("HUMAN BOARD SHIP HIT", showHumanBrdShipHit);
pubsub.subscribe("COMPUTER BOARD SHIP MISS", showCompBrdShipMiss);
pubsub.subscribe("HUMAN BOARD SHIP MISS", showHumanBrdShipMiss);

export { renderFirst, renderSecond };
