class Game {
	constructor() {
		var name;
		var src;
	}
}

function resizeGame() {
	document.getElementById("game").style.height = 9 * document.getElementById("game").scrollWidth / 20 + "px";
	console.log(document.getElementById("game"));
}

window.onload = function () {
	resizeGame();
}

window.onresize = function () {
	resizeGame();
}