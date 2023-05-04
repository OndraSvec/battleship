// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from "vitest";
import Gameboard from "../modules/gameboard";
import ComputerPlayer from "../modules/computerPlayer";

describe("ComputerPlayer factory objects", () => {
  const opponentBoard = Gameboard();
  const AIPlayer = ComputerPlayer(opponentBoard);

  test("are capable of attacking a random position", () => {
    const attackPosition = AIPlayer.findCarrier();
    AIPlayer.attack(attackPosition);
    expect(
      opponentBoard.getBoard()[attackPosition].shipHit ||
        opponentBoard.getBoard()[attackPosition].shipMiss
    ).toBe(true);
  });
});
