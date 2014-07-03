var TestRunner = (function(){
  function runTests(arrayOfTests){
    arrayOfTests.forEach(function(test){
      var filePath = chrome.extension.getURL(test.file);
      Ajax.promiseRequest({ url : filePath }).then(function(contents){
        var func = new Function("params", contents);
        func(test.params);
      })
    });
  }
  return {
    runTests : runTests
  }
})();