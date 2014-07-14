return Actions.navigate(null, "http://local.keystone.com/")
.then(function(result){
	return Actions.waitUntilElement(result.tab, ".global-nav-input.username", 1000);
})
.then(function(result){
	return Actions.updateValue(result.tab, ".global-nav-input.username", "vailtest@vailresorts.com");
})
.then(function(result){
	return Actions.updateValue(result.tab, ".global-nav-input.password", "testing");
})
.then(function(result){
	return Actions.focusElement(result.tab, ".global-nav-input.password");
})
.then(function(result){
	return Actions.appendScript(result.tab, 
	"GlobalHeader.isLoginFocused = function(){ return true; };GlobalHeader.login = function(){ return true; };document.querySelector('.btn-sign-in').click()");
})
.then(function(result){
	return Actions.waitUntilUrl(result.tab, ".*", 10000);
})
.then(function(result){
	return Actions.hasText(result.tab, ".global-nav-head.drop.lock", ".*Hi Test*");
})
.then(function(result){
  Actions.navigate(result.tab, "http://local.keystone.com/ltr")
})