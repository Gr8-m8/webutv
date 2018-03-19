class MainEditor {
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
			this.games[i].initNum = i;
			for (var t = 0; t < this.games[i].tags.length; t++) {
				if (document.getElementById("t" + this.games[i].tags[t]) != undefined || document.getElementById(this.games[i].tags[t]) != null) {
					document.getElementById("t" + this.games[i].tags[t]).lastElementChild.innerHTML += this.games[i].DisplayGame();
				} else {
					document.getElementById("main").innerHTML += this.AddSection(this.games[i].tags[t]);
					document.getElementById("t" + this.games[i].tags[t]).lastElementChild.innerHTML += this.games[i].DisplayGame();
				}
			}
		}
	}

	AddSection(tag) {

		this.AddSectionLink(tag);

		return "<section id= 't" + tag + "'> " +
					"<div class='container-fluid'>" +
						"<h2>" + tag + "</h2>" +
						"<div id='displayGames' class='row'>" +

						"</div>" +
					"</div>" +
				"</section>" +
				"<hr />";
	}

	AddSectionLink(tag) {
		document.getElementById("navbar-list").innerHTML +=
			"<li class='nav-item col-sm-3'>" + "<a class='nav-link' href='#t" + tag + "'>" + tag + "</a>" + "</li>";

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

		this.initNum;

		this.InitTags(settags);
	}

	DisplayGame() {
		return "<button id='gameImg' class='main-color-info col-md-2 col-sm-3' style='border-radius:12px;' onclick='LoadGame(me.games[" + this.initNum + "].src)'>" +
			"<img class='card-img-top img-fluid' src='" + this.img + "' alt='MISSING IMG' />" +
			"<p>" + this.name + "</p>" +
			"</button>";
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

function LoadGame(src = "") {
	console.log("lg: " + src);
	window.location.href = "playgame.html?" + src;
	me.SetGameSRC = src;
}

function resizeGame() {
	if (document.getElementById("game") != null) {
		document.getElementById("game").style.height = 9 * document.getElementById("game").scrollWidth / 20 + "px";
	}
}

window.onload = function () {
	resizeGame();

	if (document.getElementById("game") != null) {
		var startSlicePos = window.location.href.split("?");
		document.getElementById("game").src = startSlicePos[1];
	}

	if (document.getElementById("main") != null || document.getElementById("main") != undefined) {
		me.InitGames(
			[
				new GameThumb("RickGame", "https://17mali.ssis.nu/RickGame/index.html", ["Featured", "Arcade"]),
				new GameThumb("Slither.IO", "http://slither.io/", ["Arcade"]),
				new GameThumb("Agar.IO", "http://agar.io/", ["Arcade"])
			]
		);
	}
}

window.onresize = function () {
	resizeGame();
}