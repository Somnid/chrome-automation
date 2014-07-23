var JsMetadata = (function(){
  function getMetadataFromString(js){
    var matches = /\/\/\/*.?$/.match(js);
    var metadata = {};
    for(var i = 0; i < matches.length; i++){
      appendMeta(metadata, matches[i]);
    }
    return metadata;
  }
  function appendMeta(obj, metaString){
    var parts = metaString.split(":");
    obj[parts[0].trim()] = parts[1].trim();
  }
  return {
    getMetadataFromString : getMetadataFromString
  };
})();