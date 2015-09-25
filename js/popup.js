document.addEventListener("DOMContentLoaded", function(){
	var btnCurrent = document.getElementById("current");

	chrome.storage.local.get("config-location", function(values){
      var configPath = values["config-location"] || chrome.extension.getURL("/config/test-config.json");
      Ajax.promiseRequest({ url : configPath })
        .then(function(content){
          var testConfig = JSON.parse(content);
          TestUiView.create({
            model : testConfig,
            basePath : Util.getParentDirectory(configPath)
          });
        },
        function(error){
          var errorElement = document.getElementById("error");
          errorElement.innerText = "Error getting config from location: " + configPath;
          errorElement.classList.add("show");
        });
	});
});