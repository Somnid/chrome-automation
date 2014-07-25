var ActionHelper = (function(){
  chrome.tabs.getCurrent(function(){
    chrome.runtime.sendMessage({
      event : "pageLoad",
      data : window.location.href
    });
  })
})();