return Actions.navigate(null, "https://local.vail.com/sf/log?ModalSource={1B7049B5-AB49-44E2-942F-EBA8B1AEFEF0}&IsContinueWithoutLogin=False&TargetURL={1B7049B5-AB49-44E2-942F-EBA8B1AEFEF0}")
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