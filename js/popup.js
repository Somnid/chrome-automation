document.addEventListener("DOMContentLoaded", function(){
	var btnCurrent = document.getElementById("current");
	  
	var configPath = chrome.extension.getURL("/config/test-config.json");
	Ajax.promiseRequest({ url : configPath }).then(function(content){
    var testConfig = JSON.parse(content);
    TestUiView.create({ model : testConfig });
	});
});