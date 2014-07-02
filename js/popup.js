document.addEventListener("DOMContentLoaded", function(){
	var btnGo = document.getElementById("go");
	btnGo.addEventListener("click", function(){
		/*AutomationTest.loginAll([
			"vail"//, 
			//"keystone", 
			//"breckenridge",
			//"beavercreek",
			//"heavenly",
			//"snow",
			//"northstar",
			//"kirkwood",
			//"canyons"
		]);*/
		AutomationTest.login("vail");
	});
});