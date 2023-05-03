// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect, beforeEach } from "vitest";
import Ship from "../modules/ship";

describe("Ship factory objects", () => {
  let testShip;
  const testCoordinates = [0, 1, 2, 3, 4, 5];

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
  test("receives coordinates", () => {
    testCoordinates.forEach((position) => testShip.coordinates.push(position));
    expect(testShip.coordinates).toStrictEqual(testCoordinates);
  });
});
