import { renderFirst, renderSecond } from "./UI";
import GameController from "./gameController";
import pubsub from "./pubsub";

renderFirst();
renderSecond();
GameController.startGame();

const startNewGame = () => {
  setTimeout(() => {
    window.location.reload();
  }, 400);
};

pubsub.subscribe("GAME RESTART", startNewGame);
