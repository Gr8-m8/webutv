var games = [];

class Game {
	constructor(setname = "test", setsrc = "", settags = "fetured") {
		var name = setname;
		var src = setsrc;
		var tags = [];
		tags.push(settags);
	}

	displayGame() {
		return "test";
	}
}

function initGames() {
	games.push(
		new Game("RickGame", "https://17mali.ssis.nu/RickGame/index.html", "fetured")
	);

	console.log(games[0].name);

	displayGames();
}

function displayGames() {
	for (var i = 0; i < games.length; i++) {
		for (var t = 0; t < games[i].tags.length; t++) {
			if (document.getElementById(games[i].tags[t]) != undefined || document.getElementById(games[i].tags[t]) != null) {
				document.getElementById(games[i].tags[t]).innerHTML = games[i].displayGame();
				console.log("SUCCSESS: " + games[i]);
			} else {
				console.log("ERROR: " + games[i]);
			}
		}
	}
}

function resizeGame() {
	if (document.getElementById("game") != null) {
		document.getElementById("game").style.height = 9 * document.getElementById("game").scrollWidth / 20 + "px";
		console.log(document.getElementById("game"));
	}
}

window.onload = function () {
	resizeGame();
	initGames();
}

window.onresize = function () {
	resizeGame();
}