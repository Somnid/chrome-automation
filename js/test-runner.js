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
    return Ajax.promiseRequest({ url : filePath })
      .then(readFile)
      .catch(error);
  }
  
  function readFile(fileContents){
    var actionParserService = ActionParserService.create({
      actions : Actions
    });
    var actions = actionParserService.parse(fileContents);
    return Actions.getCurrentContextTab()
      .then(function(tab){
          return chainSteps(actions, tab);
      });
  }
  
  function error(exception){
    console.error(exception);
    throw(exception);
  }
  
  function chainSteps(steps, tab){
		var promise = Promise.resolve({ tab : tab });
		for(var i = 0; i < steps.length; i++){
			promise = promise.then(function(result){
			  return steps[this].action.apply(result.tab, steps[this].args);
			}.bind(i));
		}
		return promise;
	}
  return {
    runTests : runTests,
    runTest : runTest
  };
})();