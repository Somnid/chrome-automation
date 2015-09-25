var Obsv = (function(){
  function observe(obj, prop, callback){
    Object.observe(obj, function(changes){
      changes.forEach(function(change){
        if(change.name == prop){
          callback(change.object[change.name]); 
        }
      });
    });
  }
  return {
    observe : observe
  };
})();