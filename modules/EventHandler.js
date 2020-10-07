import { GameData } from "./GameData.js";
import { PageUpdater } from "./PageUpdater.js";
import { CheckWin } from "./CheckWin.js";
import { GameController } from "./GameController.js";

const EventHandler = function () {
  function activateMarkers() {
    GameData.DOM.gameboard.addEventListener("click", addMarker);
  }

  function deactivateMarkers() {
    GameData.DOM.gameboard.removeEventListener("click", addMarker);
  }

  function addMarker(e) {
    if (e.target.textContent === "") {
      let activePlayer;

      if (GameData.players.playerOne.getTurn()) {
        GameData.DOM.playerOne.classList.toggle("selected");
        GameData.DOM.playerTwo.classList.toggle("selected");
        GameData.players.playerOne.setTurn(false);
        GameData.players.playerTwo.setTurn(true);
        activePlayer = GameData.players.playerOne;
      } else {
        GameData.DOM.playerOne.classList.toggle("selected");
        GameData.DOM.playerTwo.classList.toggle("selected");
        GameData.players.playerOne.setTurn(true);
        GameData.players.playerTwo.setTurn(false);
        activePlayer = GameData.players.playerTwo;
      }

      //Get the cell position
      const position = parseInt(e.target.dataset.position);
      //Store the position
      activePlayer.addMove(position);
      //Update board.data at the position the marker was placed
      GameData.getBoardData()[position] = activePlayer.getMarker();
      //Re-Render the data
      PageUpdater.render();
      activateMarkers();
      CheckWin.init(activePlayer);
    }
  }

  function activateStartButton(e) {
    if (e.target.innerText === "Start Game") {
      e.target.innerText = "Restart Game";
      GameController.startGame();
      GameController.createPlayers();
    } else {
      GameController.restartGame();
    }
    GameController.selectPlayer();
  }

  return {
    activateMarkers,
    deactivateMarkers,
    activateStartButton
  }
}();

export { EventHandler };