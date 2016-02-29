document.addEventListener("DOMContentLoaded", function(){
	var btnCurrent = document.getElementById("current");

	chromep.storage.local.get("tests")
	  .then((values) => {
      var tests = values["tests"] || [];
      TestUiView.create({
        model : tests
      });
    });
});