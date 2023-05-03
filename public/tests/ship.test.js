// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect, beforeEach } from "vitest";
import Ship from "../modules/ship";

describe("Ship factory objects", () => {
  let testShip;

  beforeEach(() => {
    testShip = Ship("Carrier");
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
});
