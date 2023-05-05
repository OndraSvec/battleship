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
      console.log(item.shipName, index);
      const targetCell = document.getElementById(`human-cell-${index}`);
      targetCell.classList.add("placed-ship");
    }
  });
};

const renderFirst = () => {
  renderBoard(firstBoard, "human");
};

const renderSecond = () => {
  renderBoard(secondBoard, "comp");
};

pubsub.subscribe("SHIPS PLACED", renderHumanShips);

export { renderFirst, renderSecond };
