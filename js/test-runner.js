var TestRunner = (function(){
  function runTests(arrayOfTests){
    arrayOfTests.forEach(runTest);
  }
  function runTest(test){
    var filePath = test.file 
    if(test.isLocal){ //hack for now
      filePath = chrome.extension.getURL(test.file);
    }
    return Ajax.promiseRequest({ url : filePath }).then(function(fileContents){
      var func = new Function("params", "Actions", fileContents);
      return func({}, Actions);
    });
  }
  return {
    runTests : runTests,
    runTest : runTest
  };
})();