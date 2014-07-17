var Tmpl = (function(){
 
    function tmpl(el, bindings, data){
        var docfrag = document.importNode(el.content, true);
        Object.observe(data, dataChanged.bind({
            el : docfrag,
            bindings : bindings
        }));
        for(var key in bindings){
            docfrag.querySelector(key).innerText = data[bindings[key]];
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
 
    return {
        tmpl : tmpl
    };
 
})();