var ActionHelper = (function(){
  document.addEventListener("DOMContentLoaded", function(){
    chrome.runtime.sendMessage({
      event : "pageLoad"
    });
  });
})();