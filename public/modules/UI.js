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
  pubsub.publish("COMPUTER BOARD CELL CLICKED", targetCellIndex);
};

const renderSecond = () => {
  renderBoard(secondBoard, "comp");
  secondBoard.addEventListener("click", alertCompCellClick);
};

pubsub.subscribe("HUMAN SHIPS PLACED", renderHumanShips);
pubsub.subscribe("COMPUTER SHIPS PLACED", renderCompShips);

export { renderFirst, renderSecond };
