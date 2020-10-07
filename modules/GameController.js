import { GameData } from "./GameData.js";
import { EventHandler } from "./EventHandler.js";
import { PageUpdater } from "./PageUpdater.js";
import { PlayerCreator } from "./PlayerCreator.js"

const GameController = function () {
  function createPlayers() {
    const OBJ_playerOne = PlayerCreator.create();
    const OBJ_playerTwo = PlayerCreator.create();
    GameData.players.playerOne = OBJ_playerOne;
    GameData.players.playerTwo = OBJ_playerTwo;

    const DOM_playerOne = OBJ_playerOne.DOMelement;
    const DOM_playerTwo = OBJ_playerTwo.DOMelement;
    GameData.DOM.playerOne = DOM_playerOne;
    GameData.DOM.playerTwo = DOM_playerTwo;
  }

  function selectPlayer() {
    if (Math.random() < .5) {
      GameData.DOM.playerOne.classList.add("selected");
      GameData.players.playerOne.setTurn(true);
      GameData.players.playerOne.setMarker("X");
      GameData.players.playerTwo.setMarker("O");
      GameData.DOM.playerOne.lastElementChild.textContent = "X";
      GameData.DOM.playerTwo.lastElementChild.textContent = "O";
    } else {
      GameData.DOM.playerTwo.classList.add("selected");
      GameData.players.playerTwo.setTurn(true);
      GameData.players.playerOne.setMarker("O");
      GameData.players.playerTwo.setMarker("X");
      GameData.DOM.playerOne.lastElementChild.textContent = "O";
      GameData.DOM.playerTwo.lastElementChild.textContent = "X";
    }
  }

  function resetPlayers() {
    GameData.DOM.playerOne.classList.remove("selected");
    GameData.DOM.playerTwo.classList.remove("selected");
    GameData.DOM.playerOne.lastElementChild.textContent = "";
    GameData.DOM.playerTwo.lastElementChild.textContent = "";
    GameData.players.playerOne.setTurn(false);
    GameData.players.playerTwo.setTurn(false);
    GameData.players.playerOne.setMarker("");
    GameData.players.playerTwo.setMarker("");
    GameData.players.playerOne.resetWinner();
    GameData.players.playerTwo.resetWinner();
  }

  function highlightWinningPlayer() {
    for (let player in GameData.players) {
      if (GameData.players[player].winner) {
        GameData.players[player].DOMelement.classList.add("selected");
      } else {
        GameData.players[player].DOMelement.classList.remove("selected");
      }
    }
  }

  function removeHighlightFromPlayers() {
    for (let player in GameData.players) {
      GameData.players[player].DOMelement.classList.remove("selected");
    }
  }

  function resetGameBoard() {
    GameData.setBoardData(["", "", "", "", "", "", "", "", ""]);
  }

  function restartGame() {
    resetGameBoard();
    resetPlayers();
    init();
    startGame();
  }

  function startGame() {
    EventHandler.activateMarkers();
  }

  function init() {
    PageUpdater.render();
    GameData.DOM.startGameButton.addEventListener("click", EventHandler.activateStartButton);
  }

  return {
    init,
    startGame,
    restartGame,
    createPlayers,
    selectPlayer,
    highlightWinningPlayer,
    removeHighlightFromPlayers
  }
}();

export { GameController };