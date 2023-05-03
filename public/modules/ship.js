/* eslint-disable no-nested-ternary */
const Ship = (name) => ({
  name,
  length:
    name === "Carrier"
      ? 5
      : name === "Battleship"
      ? 4
      : name === "Cruiser"
      ? 3
      : name === "Submarine"
      ? 3
      : name === "Destroyer"
      ? 2
      : null,
  hits: 0,
  sunk: false,
  hit() {
    this.hits += 1;
  },
  isSunk() {
    if (this.length === this.hits) this.sunk = true;
    else this.sunk = false;
  },
});

export default Ship;
