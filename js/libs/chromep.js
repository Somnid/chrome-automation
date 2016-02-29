var chromep = {};

chromep.app = (function(){

  var window = (function(){
    function create(url, options){
      return new Promise(function(resolve, reject){
        chrome.app.window.create(url, options, function(createdWindow){
          resolve(createdWindow);
        });
      });
    }
    return {
      create : create
    };
  })();

  return {
    window : window
  };

})();

chromep.runtime = (function(){

  function sendMessage(extensionId, message, options){
    return new Promise(function(resolve, reject){
      chrome.runtime.sendMessage(extensionId, message, options, function(response){
        resolve(response);
      });
    });
  }

  return {
    sendMessage : sendMessage
  };

})();

chromep.tabs = (function(){

  function executeScript(tabId, injectDetails){
    return new Promise(function(resolve, reject){
      if(tabId instanceof Object){
        injectDetails = tabId;
        chrome.tabs.executeScript(injectDetails, function(result){
          resolve(result);
        });
      }else{
        chrome.tabs.executeScript(tabId, injectDetails, function(result){
          resolve(result);
        });
      }
    });
  }

  function get(tabId){
    return new Promise(function(resolve, reject){
      chrome.tabs.get(tabId, function(tab){
        resolve(tab);
      });
    });
  }

  function getCurrent(){
    return new Promise(function(resolve, reject){
      chrome.tabs.getCurrent(function(tab){
        resolve(tab);
      });
    });
  }

  function captureVisibleTab(windowId, options){
    return new Promise(function(resolve, reject){
      if(windowId instanceof Object){
        options = windowId;
        chrome.tabs.captureVisibleTab(options, function(dataUrl){
          resolve(dataUrl);
        });
      }else{
        chrome.tabs.captureVisibleTab(windowId, options, function(dataUrl){
          resolve(dataUrl);
        });
      }
    });
  }

  return {
    get : get,
    getCurrent : getCurrent,
    executeScript : executeScript,
    captureVisibleTab : captureVisibleTab
  };
})();

chromep.storage = (function(){

  var sync = (function(){

  })();

  var local = (function(){
    function get(keys){
      return new Promise(function(resolve, reject){
        chrome.storage.local.get(keys, function(items){
          resolve(items);
        });
      });
    }
    function set(keys){
      return new Promise(function(resolve, reject){
        chrome.storage.local.set(items, function(){
          resolve();
        });
      });
    }
    return {
      set : set,
      get : get
    };
  })();

  var managed = (function(){

  })();

  return {
    sync : sync,
    local : local,
    managed : managed
  };

})();

chromep.notifications = (function(){

  function create(notificationId, options){
    return new Promise(function(resolve, reject){
      chrome.notifications.create(notificationId, options, function(id){
        resolve(id);
      });
    });
  }

  return {
    create : create
  };

})();