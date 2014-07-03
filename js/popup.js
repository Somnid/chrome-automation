document.addEventListener("DOMContentLoaded", function(){
	var btnGo = document.getElementById("go");
	btnGo.addEventListener("click", function(){
		TestRunner.runTests([
		  { 
		    file : "tests/search-lift-tickets-test.js"
		  }
		]);
	});
});