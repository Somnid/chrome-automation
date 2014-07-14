return Actions.navigate(null, "http://local.vail.com/my-account/customer-registration.aspx")
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtFirstName']", "Test");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtLastName']", "Vail");
})
.then(function(result){
  return Actions.toggleElement(result.tab, "[id$='rdoListGender_0']", true);
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='drdMonth']", "11");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='drdDates']", "11");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='drdYear']", "1986");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtEmailAddress']", "vailtest@vailresorts.com");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtConfirmEmail']", "vailtest@vailresorts.com");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtPassword']", "testing");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtConfirmPassword']", "testing");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtLine1']", "2939 Marine St Apt 105");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtCity']", "Boulder");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='drdStateProvince']", "CO");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtUSCanZipCode']", "80303");
})
.then(function(result){
  return Actions.updateValue(result.tab, "[id$='txtPhoneNumber']", "720-555-6501");
});
//my-account/customer-registration-confirmation.aspx?FirstName=Test&IsPassUser=false
