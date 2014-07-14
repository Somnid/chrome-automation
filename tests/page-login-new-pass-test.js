return Actions.navigate(null, "https://local.vail.com/sf/log")
.then(function(result){
  return Actions.updateValue(result.tab, "[id$=txtPassHolderLastName]", "Yu");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$=txtPassHolderPassNumber]", "18718617863");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$=txtPassHolderZip]", "54016");
})
.then(function(result){
  return Actions.clickElement(result.tab, "[id$=btnPassHolderSubmit]");
})
.then(function(result){
  return Actions.waitUntilUrl(result.tab, ".*/my-account/online-account-registration.aspx");
});