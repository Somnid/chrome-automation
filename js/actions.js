var Actions = (function(){

  var gtab;

	function createTab(url){
		return new Promise(function(resolve, reject){
			chrome.tabs.create({ url : url }, function(tab){
				resolve(tab);
			});
		});
	}

	function getCurrentContextTab(){
		return new Promise(function(resolve, reject){
			chrome.tabs.query({ currentWindow : true, active : true }, function(tab){
				resolve(tab[0]);
			});
		});
	}
	
	  //updated
	function updateValue(elementQuery, value){
		return new Promise((resolve, reject) => {
		  var code = "";
		  if(Array.isArray(value)){ //assume multiselect
		    code = "Array.prototype.forEach.call(document.querySelector(\"" + elementQuery + "\").options, function(opt){ if(" + JSON.stringify(value) +  ".indexOf(opt.value) != -1) { opt.selected = true; } else { opt.selected = false } });";
		  }
		  if(typeof value == "boolean"){
		    code = "document.querySelector(\"" + elementQuery + "\").checked = " + (value ? "true" : "false");
		  }else{
			  code = `document.querySelector('${elementQuery}').value = '${value}';`;
		  }
	    code += `document.querySelector('${elementQuery}');`;
	    console.log(code);
			chrome.tabs.executeScript(this.id, { code : code, runAt : "document_end" }, result => {
			  if(result[0] === null){
			    reject(`Did not find element to update: ${elementQuery}`);
			  }
				resolve({ tab : this, result : result});
			});
		});
	}
	
	  //updated
	function clickElement(elementQuery){
		return new Promise((resolve, reject) => {
		  var code  = "";
			code +="document.querySelector(\"" + elementQuery + "\").click();";
			code += "document.querySelector(\"" + elementQuery + "\");";
			chrome.tabs.executeScript(this.id, { code : code }, result => {
			  console.log("clicking:",result);
			  if(result[0] === null){
			    reject("Did not find element to click: " + elementQuery);
			  }
				resolve({ tab : this, result : result});
			});
		});
	}
	
	//updated
	function navigateAndWaitUntilUrlChange(url, timeout){
	  return new Promise((resolve, reject) => {
		  if(this){
			  chrome.tabs.update(this.id, { url : url }, function(tab){
				  return waitUntilUrlChange(tab, null, timeout).then(resolve);
		  	});
		  }else{
			  chrome.tabs.update({ url : url }, function(tab){
				  return waitUntilUrlChange(tab, null, timeout).then(resolve);
			  });
		  }
	  });
	}
	
	function waitUntilUrlChange(tab, url, timeout){
	  console.log("waiting for url change" + (url ? " to " + url : ""));
		return new Promise((resolve, reject) => {
			var startTime = new Date().getTime();
			var urlRegex = url ? new RegExp(url) : new RegExp();
			function pageLoaded(pageData, messageSender){
			  console.log(`tab changed successfully to ${tab.url}`);
			  gtab = tab;
			  chrome.runtime.onMessage.removeListener(pageLoaded);
			  if(tab.id == messageSender.tab.id && pageData.event == "pageLoad"){
			    if(url && urlRegex.test(tab.url)){
			      resolve({ tab : tab, result : tab.url });
			    }else if(!url){
			      resolve({ tab : tab, result : tab.url });
			    }
			  }
			}
			chrome.runtime.onMessage.addListener(pageLoaded);
			if(timeout){
  			setTimeout(function(){
  			  var message = "Tab failed to navigate";
  			  if(url){
  			    message += " to url: " + url;
  			  }
  			  message += " in " + timeout + " miliseconds";
  			  reject(message);
  			}, timeout);
			}
		});
	}

	function executeScript(tab, scriptText){
		return new Promise(function(resolve, reject){
		  console.log("script run: ", scriptText);
			chrome.tabs.executeScript(tab.id, { code : scriptText }, function(result){
			  console.log("script result", result);
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
			var code = "var injected_script = document.createElement('script');";
			code += "injected_script.innerText = \"" + scriptText + "\";";
			code += "document.body.appendChild(injected_script);";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
				resolve({ tab : tab, result : result});
			});
		});
	}

	function triggerElement(tab, elementQuery, eventType){
		return new Promise(function(resolve, reject){
		  var code = "var evt = document.createEvent(\"HTMLEvents\");";
		  code += "evt.initEvent(\"" + eventType + "\");";
			code += "document.querySelector(\"" + elementQuery + "\").dispatchEvent(evt);";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
				resolve({ tab : tab, result : result});
			});
		});
	}

	function fillOutForm(tab, elementValueMap){
    return new Promise(function(resolve, reject){
      for(var key in elementValueMap){
        var code = "document.querySelector(\"" + elementQuery + "\").value = \"" + value + "\"";
        chrome.tabs.executeScript(tab.id, { code : code }, function(result){
          resolve({ tab : tab, result : result});
        });
      }
    });
	}

	function hasValue(tab, elementQuery, value){
		return new Promise(function(resolve, reject){
			var code = "document.querySelector(\"" + elementQuery + "\").value == \"" + value + "\"";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
			  if(result && result[0] === true){
				  resolve({ tab : tab, result : result});
			  }else{
			    reject("Element " + elementQuery + " did not contain value: " + value);
			  }
			});
		});
	}

	function hasText(tab, elementQuery, value){
		return new Promise(function(resolve, reject){
			var code = "document.querySelector(\"" + elementQuery + "\").innerText";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
			  if(result && new RegExp(value).test(result[0])){
				  resolve({ tab : tab, result : result});
			  }else{
			    reject("Element " + elementQuery + " did not contain value: " + value);
			  }
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

	function navigate(tab, url){
		return new Promise(function(resolve, reject){
			if(tab){
				chrome.tabs.update(tab.id, { url : url }, function(tab){
					resolve({tab : tab});
				});
			}else{
				chrome.tabs.update({ url : url }, function(tab){
					resolve({tab : tab});
				});
			}
		});
	}

	function waitUntilElement(tab, elementSelector, timeout){
	  console.log("waiting for element to appear: " + elementSelector);
		timeout = timeout || 5000;
		return new Promise(function(resolve, reject){
			var startTime = new Date().getTime();
			function testElement(){
				chrome.tabs.get(tab.id, function(tab){
					var elapsedTime = new Date().getTime() - startTime;
					var script = "document.querySelectorAll(\"" + elementSelector + "\").length";
					executeScript(tab, script)
					.then(function(result){
						if(result.result && result.result.length > 0 && result.result[0] > 0){
							resolve({ tab : tab, result : result });
						}else if(elapsedTime > timeout){
							reject("Element " + elementSelector + " did not appear within " + timeout + "miliseconds");
						}else{
							setTimeout(testElement, 500);
						}
					});
				});
			}
			testElement();
		});
	}
	
	//updated
	function waitUntilVisible(elementSelector, timeout){
	  console.log(`waiting for element to appear: ${elementSelector}`);
	  var script = `getComputedStyle(document.querySelector('${elementSelector}')).display != "none";`;
		timeout = timeout || 5000;
	  return waitUntilCondition(this, script, `Element ${elementSelector} did not appear`);
	}
	
	//updated
	function waitUntilNotVisible(elementSelector, timeout){
	  console.log(`waiting for element to appear: ${elementSelector}`);
	  var script = `getComputedStyle(document.querySelector('${elementSelector}')).display == "none";`;
		timeout = timeout || 5000;
	  return waitUntilCondition(this, script, `Element ${elementSelector} did not disappear`);
	}
	
	
	//updated
	function waitUntilCondition(tab, script, error, timeout){
		return new Promise((resolve, reject) => {
			var startTime = new Date().getTime();
			function testCondition(){
				chrome.tabs.get(tab.id, function(tab){
					var elapsedTime = new Date().getTime() - startTime;
					executeScript(tab, script)
					  .then(function(result){
  						if(result.result && result.result.length > 0 && result.result[0] > 0){
  							resolve({ tab : tab, result : result });
  						}else if(elapsedTime > timeout){
  							reject(error + ` (${timeout}ms)`);
  						}else{
  							setTimeout(testCondition, 500);
  						}
					});
				});
			}
			testCondition();
		});
	}
	
	//updated
  function wait(duration){
    var tab = this;
    return new Promise(function(resolve, reject){
      setTimeout(() => {
        resolve({ tab : tab });
      }, duration);
    });
  }

	function waitUntilNoElement(tab, elementSelector, timeout){
	  console.log("waiting for element to disappear: " + elementSelector);
		timeout = timeout || 5000;
		return new Promise(function(resolve, reject){
			var startTime = new Date().getTime();
			function testElement(){
				chrome.tabs.get(tab.id, function(tab){
					var elapsedTime = new Date().getTime() - startTime;
					var script = "document.querySelectorAll(\"" + elementSelector + "\").length";
					executeScript(tab, script)
					.then(function(result){
						if(!result.result || result.result.length <= 0 || result.result[0] < 1){
							resolve({ tab : tab, result : result });
						}else if(elapsedTime > timeout){
							reject("Element " + elementSelector + " persisted timeout of " + timeout);
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
			code += "link.click();";
			chrome.tabs.executeScript(tab.id, { code : code }, function(result){
				resolve({ tab : tab, result : result });
			});
		});
  }

  function fillForm(tab, fieldMap){
    var promise = new Promise(function(resolve, reject){
      resolve();
    });
    for(var key in fieldMap){
      promise = promise.then(function(){
        return updateValue(tab, this, fieldMap[this]);
      }.bind(key));
    }
    return promise;
  }

  var actionMap = {
    update : updateValue,
    click : clickElement,
    navigate : navigateAndWaitUntilUrlChange,
    waitUntilVisible : waitUntilVisible,
    waitUntilNotVisible : waitUntilNotVisible,
    wait : wait
  };

	return {
		getCurrentContextTab : getCurrentContextTab,
		createTab : createTab,
		navigate : navigate,
		executeScript : executeScript,
		appendScript : appendScript,
		clickElement : clickElement,
		focusElement : focusElement,
		triggerElement : triggerElement,
		printToPageConsole : printToPageConsole,
		updateValue : updateValue,
		hasValue : hasValue,
		hasText : hasText,
		waitUntilUrlChange : waitUntilUrlChange,
		navigateAndWaitUntilUrlChange : navigateAndWaitUntilUrlChange,
		waitUntilElement : waitUntilElement,
		waitUntilNoElement : waitUntilNoElement,
		captureTab : captureTab,
		downloadInTab : downloadInTab,
		wait : wait,
		fillForm : fillForm,
		actionMap : actionMap
	};
})();