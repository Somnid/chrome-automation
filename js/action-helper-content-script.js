var ActionHelper = (function(){
  chrome.runtime.sendMessage({
    event : "pageLoad"
  });
})();