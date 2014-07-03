document.addEventListener("DOMContentLoaded", function(){
	var btnGo = document.getElementById("go");
	btnGo.addEventListener("click", function(){
		TestRunner.runTests([
		  { 
		    file : "tests/login-test.js", 
		    params : { 
		      resort : "vail" 
		    }
		  }
		]);
	});
});