return Actions.navigate(null, "http://www.google.com/")
.then(function(results){
  return Actions.waitUntilElement(results.tab, "#gbqfq");
})
.then(function(results){
  return Actions.updateValue(results.tab, "#gbqfq", "google");
})
.then(function(results){
  return Actions.clickElement(results.tab, "#gbqfba");
})
.then(function(results){
	return Actions.waitUntilUrl(results.tab, ".*google*", 10000);
})