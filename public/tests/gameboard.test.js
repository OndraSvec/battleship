// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect, beforeEach } from "vitest";
import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

describe("Gameboard factory", () => {
  let testBoard;
  let testShip;
  const testArr = [11, 12, 13, 14, 15];

  beforeEach(() => {
    testBoard = Gameboard();
    testShip = Ship("Carrier");
  });

  test("accepts ship placement", () => {
    testBoard.placeShip(testShip, testArr);
    testArr.forEach((coordinate) =>
      expect(testBoard.getBoard()[coordinate]).toEqual({
        shipLength: 5,
        isHit: false,
      })
    );
  });
});
