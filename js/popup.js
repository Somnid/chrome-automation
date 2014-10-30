document.addEventListener("DOMContentLoaded", function(){
	var btnCurrent = document.getElementById("current");

	chrome.storage.local.get("config-location", function(values){
      var configPath = values["config-location"] || chrome.extension.getURL("/config/test-config.json");
      Ajax.promiseRequest({ url : configPath }).then(function(content){
        var testConfig = JSON.parse(content);
        TestUiView.create({
          model : testConfig,
          basePath : util.getParentDirectory(configPath)
        });
      });
	});
});