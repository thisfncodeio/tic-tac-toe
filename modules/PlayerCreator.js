//This CreatePlayer Module's sole job is to create players
const PlayerCreator = function () {
  let numPlayers = 1;
  function Player() {
    this.name = "";
    this.marker = "";
    this.isTurn = false;
    this.winner = false;
    this.lastMove = null;
    this.DOMelement = document.querySelector(`#player${numPlayers}`);
  }

  Player.prototype.setName = function (name) {
    this.name = name;
  }

  Player.prototype.getTurn = function () {
    return this.isTurn;
  }

  Player.prototype.setTurn = function (turn) {
    this.isTurn = turn;
  }

  Player.prototype.getMarker = function () {
    return this.marker
  }

  Player.prototype.setMarker = function (newMarker) {
    this.marker = newMarker;
  }

  Player.prototype.getLastMove = function () {
    return this.lastMove;
  }

  Player.prototype.addMove = function (move) {
    this.lastMove = move;
  }
  
  Player.prototype.setWinner = function () {
    this.winner = true;
  }

  Player.prototype.resetWinner = function () {
    this.winner = false;
  }

  Player.prototype.isWinner = function () {
    return this.winner;
  }

  return {
    create: function () {
      const newPlayer = new Player();
      numPlayers++;
      return newPlayer;
    }
  }
}();

export { PlayerCreator };