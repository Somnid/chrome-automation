var Actions = (function(){

	function createTab(url){
		return new Promise(function(resolve, reject){
			chrome.tabs.create({ url : url }, function(tab){
				resolve(tab);
			});
		});
	}
	
	function getCurrentContextTab(){
		return new Promise(function(resolve, reject){
			chrome.tabs.getCurrent(function(tab){
				resolve(tab);
			});
		});
	}

	function navigate(tab, url){
		return new Promise(function(resolve, reject){
			if(tab){
				chrome.tabs.update(tab.id, { url : url }, function(tab){
					resolve(tab);
				});
			}else{
				chrome.tabs.update({ url : url }, function(tab){
					resolve(tab);
				});
			}
		});
	}
	 
	function executeScript(tab, scriptText){
		return new Promise(function(resolve, reject){
			chrome.tabs.executeScript(tab.id, { code : scriptText }, function(result){
				resolve({ tab : tab, result : result});
			});
		});
	}
	
	function clickElement(tab, elementQuery){
		return new Promise(function(resolve, reject){
			var code = "document.querySelector('" + elementQuery + "').click()";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
				resolve({ tab : tab, result : result});
			});
		});
	}
	
	function focusElement(tab, elementQuery){
		return new Promise(function(resolve, reject){
			var code = "document.querySelector('" + elementQuery + "').focus()";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
				resolve({ tab : tab, result : result});
			});
		});
	}
	
	function appendScript(tab, scriptText){
		return new Promise(function(resolve, reject){
			var code = "var injected_script = document.createElement('script');"
			code += "injected_script.innerText = \"" + scriptText + "\";";
			code += "document.body.appendChild(injected_script);";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
				resolve({ tab : tab, result : result});
			});
		});
	}
	
	function updateValue(tab, elementQuery, value){
		return new Promise(function(resolve, reject){
			var code = "document.querySelector('" + elementQuery + "').value = '" + value + "'";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
				resolve({ tab : tab, result : result});
			});
		});
	}
	
	function printToPageConsole(tab, value){
		return new Promise(function(resolve, reject){
			var code = "console.log('" + value + "');";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
				resolve({ tab : tab, result : result});
			});
		});
	}
	
	function waitUntilUrl(tab, url, timeout){
		timeout = timeout || 5000;
		return new Promise(function(resolve, reject){
			var startTime = new Date().getTime();
			var urlRegex = new RegExp(url);
			function testUrl(){
				chrome.tabs.get(tab.id, function(tab){
					var elapsedTime = new Date().getTime() - startTime;
					if(urlRegex.test(tab.url)){
						resolve({ tab : tab, result : null });
					}else if(elapsedTime > timeout){
						reject("Exceeded timeout of " + timeout + " for url navigation: " + url);
					}else{
						setTimeout(testUrl, 500);
					}
				});
			}
			testUrl();
		});
	}
	
	function waitUntilElement(tab, elementSelector, timeout){
		timeout = timeout || 5000;
		return new Promise(function(resolve, reject){
			var startTime = new Date().getTime();
			function testElement(){
				chrome.tabs.get(tab.id, function(tab){
					var elapsedTime = new Date().getTime() - startTime;
					executeScript(tab, "document.querySelectorAll('" + elementSelector + "')")
					.then(function(result){
						if(result.result && result.result.length > 0){
							resolve({ tab : tab, result : result });
						}else if(elapsedTime > timeout){
							reject("Element " + elementSelector + " exceeded timeout of " + timeout);
						}else{
							setTimeout(testElement, 500);
						}
					});
				});
			}
			testElement();
		});
	}
	
	function captureTab(tab){
		return new Promise(function(resolve, reject){
			chrome.tabs.update(tab.id, { active : true }, function(tab){
				chrome.tabs.captureVisibleTab({ format : "png" }, function(dataUrl){
					resolve({ tab : tab, dataUrl : dataUrl });
				});
			});
		});
	}
	
	function downloadInTab(tab, dataUrl, fileName){
		return new Promise(function(resolve, reject){
			var code = "var link = document.createElement('a');";
			code += "link.href = '" + dataUrl + "';"; 
			code += "link.download = '" + fileName + "';"; 
			code += "link.click();"
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
				resolve({ tab : tab, result : result });
			});
		});
    } 
	
	return {
		getCurrentContextTab : getCurrentContextTab,
		createTab : createTab,
		navigate : navigate,
		executeScript : executeScript,
		appendScript : appendScript,
		clickElement : clickElement,
		focusElement : focusElement,
		printToPageConsole : printToPageConsole,
		updateValue : updateValue,
		waitUntilUrl : waitUntilUrl,
		waitUntilElement : waitUntilElement,
		captureTab : captureTab,
		downloadInTab : downloadInTab
	};
})();