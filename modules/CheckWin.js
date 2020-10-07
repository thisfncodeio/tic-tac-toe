import { GameData } from "./GameData.js";
import { EventHandler } from "./EventHandler.js";
import { PageUpdater } from "./PageUpdater.js";
import { GameController } from "./GameController.js";

//This CheckWin Module's sole job is to check for a game win
const CheckWin = function () {
  function check(activePlayer) {
    //Run logic against all winning combos that contain the players last selected position in them
    const lastPlayerMove = activePlayer.getLastMove();
    const gameboardCells = document.querySelectorAll(".gameboard-cell");
    GameData.getWinningCombos().forEach((combo) => {
      if (combo.includes(lastPlayerMove)) {
        if ((gameboardCells[combo[0]].textContent === gameboardCells[combo[1]].textContent) &&
          (gameboardCells[combo[1]].textContent === gameboardCells[combo[2]].textContent)) {
          PageUpdater.result("Winner!", activePlayer.name);
          activePlayer.setWinner();
          GameController.highlightWinningPlayer();
          EventHandler.deactivateMarkers();
          //Highlight the winning combo
          for (let i = 0; i < combo.length; i++) {
            gameboardCells[combo[i]].style.backgroundColor = "yellow";
          }
        }
      }
    });

    //If the board is full and there is no winner, it's a tie.
    if (GameData.getBoardData().every(cell => cell) && !activePlayer.isWinner()) {
      PageUpdater.result("Tie!");
      GameController.removeHighlightFromPlayers();
    }
  }

  return {
    init: check
  }
}();

export { CheckWin };