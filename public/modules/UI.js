import "../styles/style.css";

const firstBoard = document.querySelector(".Humanboard");
const secondBoard = document.querySelector(".Computerboard");

const renderBoard = (parent) => {
  for (let i = 0; i < 100; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("board-cell");
    cell.setAttribute("id", `cell-${i}`);
    parent.appendChild(cell);
  }
};

const renderFirst = () => {
  renderBoard(firstBoard);
};

const renderSecond = () => {
  renderBoard(secondBoard);
};

export { renderFirst, renderSecond };
