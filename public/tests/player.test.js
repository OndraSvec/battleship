// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from "vitest";
import Ship from "../modules/ship";
import Gameboard from "../modules/gameboard";
import Player from "../modules/player";

describe("Player factory objects", () => {
  const opponentBoard = Gameboard();
  const playerOne = Player(opponentBoard);
  const shipPlacement = [0, 1, 2, 3, 4, 5];
  const testShip = Ship("Carrier");

  test("are capable of hitting the opponent's ship", () => {
    opponentBoard.placeShip(testShip, shipPlacement);
    playerOne.attack(shipPlacement[2]);
    expect(opponentBoard.getBoard()[shipPlacement[2]].shipHit).toBe(true);
  });
});
