//We need to have only one method that renders the UI
//This method will render the individual squares based on an array of objects

const players = (function () {
	function Player() {
		let marker = "";
		let isTurn = false;
		let moves = [];

		function getTurn() {
			return isTurn;
		}

		function setTurn(turn) {
			isTurn = turn;
		}

		function getMarker() {
			return marker
		}

		function setMarker(symbol) {
			marker = symbol;
		}

		function addMove(move) {
			moves.push(move);
		}

		function getMoves() {
			return moves;
		}

		return {
			setMarker,
			getMarker,
			setTurn,
			getTurn,
			addMove,
			getMoves
		}
	}

	const player1 = Player();
	const player2 = Player();

	function getPlayer(n) {
		return n === 1 ? player1 : player2;
	}

	return {
		getPlayer
	}
})();

const game = {
	data: ["", "", "", "", "", "", "", "", ""],
	winningCombos: [
		[0, 1, 2], [3, 4, 5], [6, 7, 8],
		[0, 3, 6], [1, 4, 7], [2, 5, 8],
		[0, 4, 8], [2, 4, 6]
	],
	checkWin: function (activePlayer) {
		if (this.data.every(cell => cell)) {
			console.log('Tie!');
		} else {
			console.log(this.data);
			//Run logic against all winning combos that contain the players last selected position in them
			const lastPlayerMove = activePlayer.getMoves()[activePlayer.getMoves().length - 1];
			const gameboardCell = document.querySelectorAll(".gameboard-cell");
			this.winningCombos.forEach((combo) => {
				if (combo.includes(lastPlayerMove)) {
					if ((gameboardCell[combo[0]].textContent === gameboardCell[combo[1]].textContent) &&
						(gameboardCell[combo[1]].textContent === gameboardCell[combo[2]].textContent)) {
						console.log("winner!");
						const gameboard = document.querySelector("div#gameboard");
						gameboard.removeEventListener("click", eventHandlers.addMarker);
						for (let i = 0; i < combo.length; i++) {
							gameboardCell[combo[i]].style.backgroundColor = "yellow";
						}
					}
				}
			});
		}

	},
	activateMarkers: function () {
		const gameboard = document.querySelector("div#gameboard");
		gameboard.addEventListener("click", eventHandlers.addMarker);
	}
};

const eventHandlers = {
	addMarker: function (e) {
		if (e.target.textContent === "") {
			let activePlayer;
			const DOMplayer1 = document.querySelector("#player1");
			const DOMplayer2 = document.querySelector("#player2");
			const player1 = players.getPlayer(1);
			const player2 = players.getPlayer(2);

			if (player1.getTurn()) {
				DOMplayer1.style.fontWeight = "";
				DOMplayer2.style.fontWeight = "bold";
				player1.setTurn(false);
				player2.setTurn(true);
				activePlayer = player1;
			} else {
				DOMplayer1.style.fontWeight = "bold";
				DOMplayer2.style.fontWeight = "";
				player1.setTurn(true);
				player2.setTurn(false);
				activePlayer = player2;
			}

			//Get the cell position
			const position = parseInt(e.target.dataset.position);
			//Store the position
			activePlayer.addMove(position);
			//Update board.data at the position the marker was placed
			game.data[position] = activePlayer.getMarker();
			//Re-Render the data
			view.render();
			game.activateMarkers();
			game.checkWin(activePlayer);
		}
	},
	selectPlayer: function () {
		const DOMplayer1 = document.querySelector("#player1");
		const DOMplayer2 = document.querySelector("#player2");
		const player1 = players.getPlayer(1);
		const player2 = players.getPlayer(2);
		// console.dir(DOMplayer1);

		if (Math.random() < .6) {
			player1.setTurn(true);
			player1.setMarker("X");
			player2.setMarker("O");
			DOMplayer1.style.fontWeight = "bold";
			DOMplayer1.nextElementSibling.textContent = "X"
			DOMplayer2.nextElementSibling.textContent = "O"
		} else {
			player2.setTurn(true);
			player1.setMarker("O");
			player2.setMarker("X");
			DOMplayer2.style.fontWeight = "bold";
			DOMplayer1.nextElementSibling.textContent = "O"
			DOMplayer2.nextElementSibling.textContent = "X"
		}

		game.activateMarkers();
	},
	restartGame: function () {
		game.data = ["", "", "", "", "", "", "", "", ""];
		view.render();
		const DOMplayer1 = document.querySelector("#player1");
		const DOMplayer2 = document.querySelector("#player2");
		DOMplayer1.style.fontWeight = "";
		DOMplayer2.style.fontWeight = "";
		const selectPlayerButton = document.getElementById("selectPlayer");
		selectPlayerButton.onclick = function () {
			eventHandlers.selectPlayer();
			this.onclick = null;
		};
	}
};

const view = {
	render: function () {
		const root = document.getElementById("root");
		root.innerHTML = "";
		const gameboard = document.createElement("DIV");
		gameboard.id = "gameboard";
		for (let i = 0; i < game.data.length; i++) {
			const gameboardCell = document.createElement("DIV");
			gameboardCell.classList.add("gameboard-cell");
			gameboardCell.dataset.position = i;
			gameboardCell.textContent = game.data[i];
			gameboard.appendChild(gameboardCell);
		}
		root.appendChild(gameboard);
	}
};

view.render();
