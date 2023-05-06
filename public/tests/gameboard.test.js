// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect, beforeEach } from "vitest";
import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

describe("Gameboard factory", () => {
  let testBoard;
  let testShip;
  const testArr = [11, 12, 13, 14, 15];
  const attackPositionHit = 13;
  const attackPositionMiss = 45;

  beforeEach(() => {
    testBoard = Gameboard();
    testShip = Ship("Carrier");
  });

  test("accepts ship placement", () => {
    testBoard.placeShip(testShip, testArr);
    testArr.forEach((coordinate) =>
      expect(testBoard.getBoard()[coordinate]).toEqual({
        shipName: "Carrier",
        shipMiss: null,
      })
    );
  });
  test("accepts a ship hit", () => {
    testBoard.placeShip(testShip, testArr);
    testBoard.receiveAttack(attackPositionHit);
    expect(testBoard.getBoard()[attackPositionHit].shipMiss).toBe(false);
  });
  test("accepts a ship miss", () => {
    testBoard.placeShip(testShip, testArr);
    testBoard.receiveAttack(attackPositionMiss);
    expect(testBoard.getBoard()[attackPositionMiss].shipMiss).toBe(true);
  });
});
