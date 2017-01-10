window.onload = function(){

	function startScreen() {
		document.getElementById("pic").setAttribute("src", "img/hello.jpg");
		document.getElementById("ua_var").innerHTML = "Бажаєш отримати знижку за ерудицію?";
		document.getElementById("ua_var").setAttribute("class","pulse");
		document.getElementById("en_var").setAttribute("class","pulse");
		document.getElementById("en_var").innerHTML = "Wanna get a discount for your knowledge?";
		document.getElementById("vars").innerHTML = "";
		document.getElementById("vars").addEventListener("click", pullBase, false);
		document.getElementById("vars").innerHTML = "<h2>О, так, чорт забирай.</h2><h2>Oh, yeah, baby!</h2>";
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
		var baseLenght = 15;
		var randQ = Math.floor(Math.random() * (baseLenght - 1)) + 1;
		document.getElementById("pic").setAttribute("src", "img/" + questions["question" + randQ].pic + ".jpg");
		document.getElementById("var" + questions["question" + randQ].answer).setAttribute("alt", "correct");
		document.getElementById("ua_var").removeAttribute("class");
		document.getElementById("en_var").removeAttribute("class");
		document.getElementById("ua_var").innerHTML = questions["question" + randQ].questUA;
		document.getElementById("en_var").innerHTML = questions["question" + randQ].questEN;
		document.getElementById("var1").innerHTML = questions["question" + randQ].var1;
		document.getElementById("var2").innerHTML = questions["question" + randQ].var2;
		document.getElementById("var3").innerHTML = questions["question" + randQ].var3;
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
				document.getElementById("ua_var").innerHTML = "Чудово, розумнику, отримай знижку!";
				document.getElementById("en_var").innerHTML = "Great, baby, you're smart enough to get a discount!";
			} else {
				document.getElementById("ua_var").innerHTML = "Прикро, але сьогодні не твій день...";
				document.getElementById("en_var").innerHTML = "Sorry, but it's not your day...";
			};
			seeYou();

	}

	function seeYou() {
		document.getElementById("vars").innerHTML = "";
		document.getElementById("vars").innerHTML = "<h2>До зустрічі, найцінніший госте!</h2><h2>See you soon, the most precious guest!</h2>";
		setTimeout(startScreen, 5000);
	}

	startScreen();

}
