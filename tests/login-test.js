Actions.navigate(null, "http://local.vail.com/home1")
			.then(function(tab){
				return Actions.waitUntilElement(tab, ".global-nav-input.username", 1000);
			})
			.then(function(result){
				return Actions.updateValue(result.tab, ".global-nav-input.username", "dkumagai1@vailresorts.com");
			})
			.then(function(result){
				return Actions.updateValue(result.tab, ".global-nav-input.password", "VAILtest3r");
			})
			.then(function(result){
				return Actions.focusElement(result.tab, ".global-nav-input.password");
			})
			.then(function(result){
				return Actions.appendScript(result.tab, 
				"GlobalHeader.isLoginFocused = function(){ return true; };GlobalHeader.login = function(){ return true; };document.querySelector('.btn-sign-in').click()");
			})
			.then(function(result){
				return Actions.waitUntilUrl(result.tab, ".*/home1", 10000);
			})
			.then(function(result){
				return Actions.captureTab(result.tab);
			})
			/*.then(function(result){
				return Actions.downloadInTab(result.tab, result.dataUrl, resort + "-cap.png");
			})*/
			.then(function(tab){
				Actions.printToPageConsole("success!");
			})
			.catch(function(error){
				console.log(error);
			});