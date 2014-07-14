return Actions.navigate(null, "https://local.vail.com/sf/log")
.then(function(result){
  return Actions.updateValue(result.tab, "[id$=txtExistingUsername]", "vailtest@vailresorts.com");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$=txtExistingPassword]", "testing");
})
.then(function(result){
  return Actions.clickElement(result.tab, "[id$=btnExistingSubmit]");
})
.then(function(result){
  return Actions.waitUntilUrl(result.tab, ".*/sf/vmp.aspx");
});