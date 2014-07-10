return Actions.navigate(null, "http://local.vail.com/sf/slt")
.then(function(results){
  return Actions.updateValue(results.tab, "[id$='txtArrivalDate']", "12/1/2014");
})
.then(function(results){
  return Actions.updateValue(results.tab, "[id$='txtDepartureDate']", "4/20/2015");
})
.then(function(results){
  return Actions.updateValue(results.tab, "[id$='ddlAdultVisitors']", "5");
})
.then(function(results){
  return Actions.clickElement(results.tab, "[id$='btnFindTickets']");
})
.then(function(results){
  return Actions.waitUntilElement(results.tab, "[id$='divErrors'");
})
.then(function(results){
  return Actions.hasText(results.tab, "[id$='divErrors'", "We close for the season on 04/19/2015. See you next year!");
})
.then(function(results){
  return document.body.style.background = "green";
})
.catch(function(error){
  return document.body.style.background = "red";
});