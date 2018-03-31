//CLASS FÖR HANTERANDE
class MainEditor {
	constructor() {
		this.games = [];
		this.gameSRC = "";
	}

	//SÄTTER SPEL I LISTA
	InitGames(inits = []) {
		for (var i = 0; i < inits.length; i++) {
			this.games.push(
				inits[i]
			);
		}

		this.DisplayGames();
	}

	//SÄTTER SPELEN PÅ HEMSIDAN
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

	//LÄGGER TILL EN SECTION FÖR SPEL
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

	//LÄGGER TILL EN NAVBAR LINK TILL SECTION
	AddSectionLink(tag) {
		document.getElementById("navbar-list").innerHTML +=
			"<li class='nav-item col-sm-5'>" + "<a class='nav-link' href='#t" + tag + "' onclick='WaitFor(ScrollSection, 5)'>" + tag + "</a>" + "</li>";

	}

	//SÄTTER LÄNKEN I IFRAME
	SetGameSRC(setsrc) {
		if (document.getElementById("game") != null) {
			document.getElementById("game").src = setsrc;
		}
	}
}

//EN ISNSTANS AV MainEditor
me = new MainEditor();

//SPEL
class GameThumb {
	constructor(setname = "RickGame", setsrc = "", settags = ["fetured"], setImg = "images/Square44x44Logo.targetsize-24_altform-unplated.png") {
		this.name = setname;
		this.src = setsrc;
		this.img = setImg;
		this.tags = [];

		this.initNum;

		this.InitTags(settags);
	}

	//HTML SPEL ELEMENT
	DisplayGame() {
		return "<button id='gameImg' class='main-color-info spel-thumb col-md-2 col-sm-3 col-12' onclick='LoadGame(me.games[" + this.initNum + "].src)'>" +
			"<img class='spel-thumb-img img-fluid' src='" + this.img + "' alt='MISSING IMG' />" +
			"<p>" + this.name + "</p>" +
			"</button>";
	}

	//SPELLÄNK
	SetGameSRC() {
		return this.src;
	}

	//SÄTTER TAGGAR PÅ SPELET
	InitTags(inits = []) {
		for (var i = 0; i < inits.length; i++) {
			this.tags.push(inits[i]);
		}
	}
}

//VIDAREBEFODRAR LÄNK FRÅN INDEX.HTML TILL PLAYGAME.HTML URL
function LoadGame(src = "") {
	console.log("lg: " + src);
	window.location.href = "playgame.html?&" + src;
	me.SetGameSRC = src;
}

//SKALAR IFRAME 16/9
function resizeGame() {
	if (document.getElementById("game") != null) {
		document.getElementById("game").style.height = 9 * document.getElementById("game").scrollWidth / 16 + "px";
	}
}

//START AV SCRIPT
window.onload = function () {
	resizeGame();

	//KOLLAR OM IFRAMEN FÖR SPEL FINNS, OCH I SÅDANA FALL SÄTTER IN LÄNKEN I IFRAMEN FRÅN URL
	if (document.getElementById("game") != null) {
		var startSlicePos = window.location.href.split("?");
		startSlicePos = startSlicePos[1].split("&");
		document.getElementById("game").src = startSlicePos[1];
	}

	//KOLLAR OM DETTA ÄR HUVUDSIDAN, OCH I SÅDANA FALL SKAPAR SPELEN
	if (document.getElementById("main") != null || document.getElementById("main") != undefined) {
		me.InitGames(
			[
				new GameThumb("RickGame", "https://17mali.ssis.nu/RickGame/index.html", ["Featured", "Arcade"], "images/RickGame.png"),
				new GameThumb("Slither.IO", "http://slither.io/", ["Arcade"], "images/slitherio.jpg"),
				new GameThumb("Agar.IO", "http://agar.io/", ["Arcade"], "images/agario.jpg"),
				new GameThumb("Super Mario 63", "https://www.newgrounds.com/portal/view/498969", ["Platformer"], "images/supermario63.png")
			]
		);
	}
}

window.onresize = function () {
	resizeGame();
}

//JUSTERAR SÅ ATT NAVBAREN INTE ÖVERLAPPAR SPELSECTIONEN, EFTER ATT HA TRYCKT PÅ SPELSECTION LÄNK
function ScrollSection() {
	if (window.scrollY <= document.body.scrollHeight - 457 - 100) {
		window.scrollBy(0, -100);
	}
}

//ANVÄNDS IS Scroll() FÖR ATT SCROLLA NEDÅT
function ScrollToBottom() {
	window.scrollTo(0, document.body.scrollHeight);
}

//SCROLLAR TILL BOTTEN AV SIDAN I 1 SEKUND
function Scroll(from = ScrollToBottom, lenght = 1000) {
	for (var i = 0; i < lenght; i++) {
		setTimeout(ScrollToBottom, i);
	}
}