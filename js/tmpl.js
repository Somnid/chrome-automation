var Tmpl = (function(){
 
    function tmpl(templateElement, bindings, data){
        var docfrag = document.importNode(templateElement.content, true);
        Object.observe(data, dataChanged.bind({
            el : docfrag,
            bindings : bindings
        }));
        for(var key in bindings){
            docfrag.querySelector(key).innerText = traverseObjectProps(data, bindings[key]);
        }
        return docfrag;
    }
     
    function dataChanged(changes){
        changes.forEach(propChanged.bind(this));
    }
    //docfrags lose all their node when they append...
    function propChanged(change){
        var newValue = change.object[change.name];
        for(var key in this.bindings){
            if(this.bindings[key] == change.name){
                this.el.querySelector(key).innerText = newValue;
            }
        }
    }
    
    function traverseObjectProps(obj, accessor){
      var keys = accessor.split(".");
      var prop = obj;
      for(var i = 0; i < keys.length; i++){
        if(keys[i]){
          prop = obj[keys[i]];
        }
      }
      return prop;
    }
 
    return {
        tmpl : tmpl
    };
 
})();