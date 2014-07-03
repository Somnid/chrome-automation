var util = (function(){
  function stringToDataUri(newString, options){
        options = options || {};
        var mimeType = options.mimeType || "text/plain"; 
        var base64 = options.base64 || false; 
        var charEncoding = options.charEncoding || "utf8";
        if(base64){
          charEncoding = "base64";
        }
        var uri = "data:" + mimeType + ";" + charEncoding + ","; 
        if(base64){ 
            newString = btoa(newString); 
        } 
  
        return uri + newString;
  }
  
  function appendScript(scriptText){
    var script = document.createElement("script");
    script.src = stringToDataUri(scriptText, { base64 : true });
    document.body.appendChild(script);
  }
    
  return {
    stringToDataUri : stringToDataUri,
    appendScript : appendScript
  }
})();