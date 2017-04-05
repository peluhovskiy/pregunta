window.onload = function(){

	function startScreen() {
	  document.getElementById("quest_area").innerHTML = "<h1 class='welcome'>Бажаєш отримати знижку за знання?</h1>";
		document.getElementById("vars").innerHTML = "";
		document.getElementById("vars").addEventListener("click", pullBase, false);
		document.getElementById("vars").innerHTML = "<h2>О, так, чорт забирай.</h2>";
	}

	function pullBase(){
		document.getElementById("vars").removeEventListener("click", pullBase, false);
		var req = new XMLHttpRequest();
		req.open("GET", "js/base.json", true);
		req.onreadystatechange = function(){
   		if (req.readyState == 4){
				var base = req.responseText;
				ask(base);
			}
		};
		req.send(null);
	}

	function ask(base){
		document.getElementById("vars").innerHTML = "<div id='var1' class='var_look'></div><div id='var2' class='var_look'></div><div id='var3' class='var_look'></div>";
		var questions = JSON.parse(base);
		var baseLenght = 20;
		var randQ = Math.floor(Math.random() * (baseLenght - 1)) + 1;
		document.getElementById("quest_area").removeAttribute("class");
		document.getElementById("quest_area").innerHTML = "<h1>" + questions["question" + randQ].quest + "</h1>";
		document.getElementById("var1").innerHTML = questions["question" + randQ].var1;
		document.getElementById("var2").innerHTML = questions["question" + randQ].var2;
		document.getElementById("var3").innerHTML = questions["question" + randQ].var3;
		document.getElementById("var" + questions["question" + randQ].answer).setAttribute("alt", "correct");
		addEvListeners();
	}

	function addEvListeners(){
		for (i = 1; i <= 3; i ++){
			var button = document.getElementById("var" + i);
			button.addEventListener("click", trueOrFalse, false);
		};
	}

	function trueOrFalse(event){
			if (event.target.getAttribute("alt")){
				document.getElementById("quest_area").innerHTML = "<h1 class='welcome'>Чудово, розумнику, отримай знижку!</h1>";
			} else {
				document.getElementById("quest_area").innerHTML = "<h1 class='welcome'>Прикро, але сьогодні не твій день...</h1>";
			};
			seeYou();

	}

	function seeYou() {
		document.getElementById("vars").innerHTML = "";
		document.getElementById("vars").innerHTML = "<h2>До зустрічі, найцінніший госте!</h2>";
		setTimeout(startScreen, 5000);
	}

	startScreen();

}
