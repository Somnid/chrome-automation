var Util = (function(){
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

  function getParentDirectory(path){
	  return path.substring(0, path.lastIndexOf("/"));
	}

	function isAbsolutePath(path){
	  return path.indexOf(":") != -1;
	}
	
	function isWhitespace(char){
    var whitespace = [
      String.fromCharCode(13), //carriage return
      String.fromCharCode(10), //new line
      String.fromCharCode(32), //space
      String.fromCharCode(9)   //tab
    ];
    return whitespace.indexOf(char) != -1;
  }
	
	function splitWhitespace(text){
	  var split = [];
	  var buffer = "";
	  var quoted = false;
	  var readWhitespace = false;
	  for(var i = 0; i < text.length; i++){
	    if(isWhitespace(text[i]) && !quoted && !readWhitespace){
	      split.push(buffer);
	      buffer = "";
	      readWhitespace = true;
	    }else if(isWhitespace(text[i]) && !quoted && readWhitespace){
	      continue;
	    }else if(text[i] == "\"" && !quoted){
	      quoted = true;
	      readWhitespace = false;
	    }else if(text[i] == "\"" && quoted){
	      quoted = false;
	      readWhitespace = false;
	    }else{
	      buffer += text[i];
	      readWhitespace = false;
	    }
	  }
	  if(buffer){
	    split.push(buffer);
	  }
	  
	  return split;
	}
	
	function transformToken(text, regex, replaceFunc){
		var matches = text.match(regex);
		if(!matches){
		  return text;
		}
		for(var i = 0; i < matches.length; i++){
			text = text.replace(matches[i], replaceFunc(matches[i]));
		}
		return text;
	}

  return {
    stringToDataUri : stringToDataUri,
    appendScript : appendScript,
    getParentDirectory : getParentDirectory,
    isAbsolutePath : isAbsolutePath,
    isWhitespace : isWhitespace,
    splitWhitespace : splitWhitespace,
    transformToken : transformToken
  };
})();