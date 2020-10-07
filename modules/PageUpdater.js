import { GameData } from "./GameData.js";

//This PageUpdater Module's sole job is to render the board onto the page
const PageUpdater = function () {
  function render() {
    const root = document.getElementById("root");
    root.innerHTML = "";

    const gameboard = document.createElement("DIV");
    gameboard.id = "gameboard";

    const boardData = GameData.getBoardData();

    for (let i = 0; i < boardData.length; i++) {
      const gameboardCell = document.createElement("DIV");
      gameboardCell.classList.add("gameboard-cell");
      gameboardCell.dataset.position = i;
      gameboardCell.textContent = boardData[i];
      gameboard.appendChild(gameboardCell);
    }
    
    root.appendChild(gameboard);
  }

  function result(result, activePlayer = "") {
    console.log(result, activePlayer);
  }

  return {
    render,
    result
  }
}();

export { PageUpdater };