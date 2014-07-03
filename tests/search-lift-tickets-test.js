Actions.navigate(null, "http://local.vail.com/sf/slt")
.then(function(results){
  return Actions.updateValue(results.tab, "[id$='txtArrivalDate']", "12/1/2014");
})
.then(function(results){
  return Actions.updateValue(results.tab, "[id$='txtDepartureDate']", "12/15/2014");
})
.then(function(results){
  return Actions.updateValue(results.tab, "[id$='ddlAdultVisitors']", "5");
})
.then(function(results){
  return Actions.clickElement(results.tab, "[id$='btnFindTickets']");
})
.then(function(results){
  return Actions.waitUntilUrl(results.tab, ".*/sf/lsr");
})
.then(function(results){
  return Actions.printToPageConsole("Success!")
})
.catch(function(error){
  return console.log(error);
});