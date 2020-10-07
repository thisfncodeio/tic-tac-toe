//This GameData Module's sole job is to house the game data
const GameData = function () {
  let boardData = ["", "", "", "", "", "", "", "", ""];
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  const players = {};
  const DOM = {
    gameboard: document.querySelector("#root"),
    startGameButton: document.querySelector("#startGameButton")
  };

  return {
    getBoardData: function () {
      return boardData;
    },
    setBoardData: function (newBoardData) {
      boardData = newBoardData;
    },
    getWinningCombos: function () {
      return winningCombos;
    },
    addPlayer: function (player) {
      players.push(player);
    },
    getPlayer: function (n) {
      return players[n-1];
    },
    resetPlayersArray: function () {
      players = [];
    },
    getPlayers: function () {
      return players;
    },
    DOM,
    players
  }
}();

export { GameData };