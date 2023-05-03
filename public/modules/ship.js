const Ship = (length) => ({
  length,
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
