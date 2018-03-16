﻿class MainEditor {
	constructor() {
		this.games = [];
		this.gameSRC = "";
	}

	InitGames(inits = []) {
		for (var i = 0; i < inits.length; i++) {
			this.games.push(
				inits[i]
			);
		}

		this.DisplayGames();
	}

	DisplayGames() {
		for (var i = 0; i < this.games.length; i++) {
			for (var t = 0; t < this.games[i].tags.length; t++) {
				if (document.getElementById(this.games[i].tags[t]) != undefined || document.getElementById(this.games[i].tags[t]) != null) {
					document.getElementById(this.games[i].tags[t]).lastElementChild.innerHTML += this.games[i].DisplayGame(); //children.getElementById("displayGames").innerHTML += this.games[i].DisplayGame();
				} else {
					//console.log("ERROR: " + this.games[i].name);
					document.getElementById("main").innerHTML += this.AddSection(this.games[i].tags[t]);
					document.getElementById(this.games[i].tags[t]).lastElementChild.innerHTML += this.games[i].DisplayGame(); //children.getElementById("displayGames").innerHTML += this.games[i].DisplayGame();
				}
			}
		}
	}

	AddSection(tag) {
		return "<section id= '" + tag + "'> " +
		"<h2>" + tag + "</h2>" +
		"<div id='displayGames' class='row'>" +
		"<!--<img src='images/Square150x150Logo.scale-200.png' />-->" +
		"</div>" +
		"</section>" +
		"<hr />";
	}

	SetGameSRC(setsrc) {
		if (document.getElementById("game") != null) {
			document.getElementById("game").src = setsrc;
			
		}
	}
}

me = new MainEditor();

class GameThumb {
	constructor(setname = "RickGame", setsrc = "", settags = ["fetured"], setImg = "images/Square44x44Logo.targetsize-24_altform-unplated.png") {
		this.name = setname;
		this.src = setsrc;
		this.img = setImg;
		this.tags = [];

		this.InitTags(settags);
	}

	DisplayGame() {
		return "<div class='col-md-2 col-sm-3'>" +
			"<div class='card game-thumb'>" +
			"<div class='work-img'>" +
			"<a href='playgame.html'>" +
			"<img class='card-img-top img-fluid' src='" + this.img + "' alt='Cardimage cap' />" +
			"</a>" +
			"<div class='img-overlay'></div>" +
			"</div>" +
			"<div class='card-body'>" +
			"<p class='card-text'>" +
			this.name +
			"</p>" +
			"</div>" +
			"</div>" +
			"</div>";
	}

	SetGameSRC() {
		return this.src;
	}

	InitTags(inits = []) {
		for (var i = 0; i < inits.length; i++) {
			this.tags.push(inits[i]);
		}
	}
}

function resizeGame() {
	if (document.getElementById("game") != null) {
		document.getElementById("game").style.height = 9 * document.getElementById("game").scrollWidth / 20 + "px";
		//console.log(document.getElementById("game"));
	}
}

window.onload = function () {
	resizeGame();

	if (document.getElementById("game") != null) {
		document.getElementById("game").src = me.gameSRC;
	}

	me.InitGames(
		[
			new GameThumb("Rick Game", "https://17mali.ssis.nu/RickGame/index.html", ["Featured", "Arcade"]),
			new GameThumb("Slither.IO", "http://slither.io/", ["Arcade"]),
            new GameThumb("Agar.IO", "http://agar.io/", ["Arcade"])
		]
	);
}

window.onresize = function () {
	resizeGame();
}