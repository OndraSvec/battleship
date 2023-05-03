// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect, beforeEach } from "vitest";
import Ship from "../modules/ship";
import Gameboard from "../modules/gameboard";

describe("Ship factory objects", () => {
  let testShip;
  let testBoard;
  const testCoordinates = [0, 1, 2, 3, 4, 5];

  beforeEach(() => {
    testShip = Ship("Carrier");
    testBoard = Gameboard();
  });
  test("accept hits", () => {
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });
  test("can be sunk", () => {
    for (let i = 0; i < 5; i += 1) testShip.hit();
    testShip.isSunk();
    expect(testShip.sunk).toBe(true);
  });
  test("receives coordinates", () => {
    testBoard.placeShip(testShip, testCoordinates);
    expect(testShip.coordinates).toStrictEqual(testCoordinates);
  });
});
