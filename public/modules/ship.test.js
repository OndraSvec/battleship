import { describe, test, expect, beforeEach } from "vitest";
import Ship from "./ship";

describe("Ship factory objects", () => {
  let testShip;

  beforeEach(() => {
    testShip = Ship(5);
  });
  test("accept hits", () => {
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });
  test("can be sunk", () => {
    for (let i = 0; i < 5; i++) testShip.hit();
    testShip.isSunk();
    expect(testShip.sunk).toBe(true);
  });
});
