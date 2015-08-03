var TestRunner = (function(){
  function runTests(arrayOfTests, currentTestChangedCallback){
    currentTestChangedCallback(arrayOfTests[0]);
    var promise = runTest(arrayOfTests[0]);
    for(var i = 1; i < arrayOfTest.length; i++){
      promise.then(function(){
        currentTestChangedCallback(arrayOfTest[i]);
        return runTest(arrayOfTest[i]);
      });
    }
    return promise;
  }
  function runTest(test){
    var filePath = test.file;
    return Ajax.promiseRequest({ url : filePath }).then(function(fileContents){
      var func = new Function("params", "Actions", fileContents);
      return func({}, Actions);
    }).catch(function(error){
      console.log(error);
      throw(error);
    });
  }
  return {
    runTests : runTests,
    runTest : runTest
  };
})();