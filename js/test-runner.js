var TestRunner = (function(){
  function runTests(arrayOfTests){
    arrayOfTests.forEach(runTest);
  }
  function runTest(test){
    var filePath = chrome.extension.getURL(test.file);
    var script = document.createElement("script");
    script.src = filePath;
    document.body.appendChild(script);
  }
  return {
    runTests : runTests,
    runTest : runTest
  };
})();