var TestRunner = (function(){
  function runTests(arrayOfTests){
    arrayOfTests.forEach(function(test){
      var filePath = chrome.extension.getURL(test.file);
      var script = document.createElement("script");
      script.src = filePath;
      document.body.appendChild(script);
    });
  }
  return {
    runTests : runTests
  }
})();