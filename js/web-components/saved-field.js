//TODO Attributes changes should rebind fieldName
var SavedField = (function(){
  function create(element){
    bind(element);
    element.attachEvents();
    element.fieldName = element.attributes.fieldName.value;
  }
  function bind(element){
    element.attachEvents = attachEvents.bind(element);
    element.onInput = onInput.bind(element);
    element.onStorageChanged = onStorageChanged.bind(element);
    element.getStoredValue = getStoredValue.bind(element);
  }
  function attachEvents(){
    this.addEventListener("input", this.onInput);
    chrome.storage.onChanged.addListener(this.onStorageChanged);
  }
  function onInput(){
    if(!this.fieldName){
      return;
    }
    var keyval = {};
    keyval[this.fieldName] = this.value;
    chrome.storage.local.set(keyval);
  }
  function onStorageChanged(changed, areaName){
    if(areaName == "local" && this.field){
      if(changed[this.fieldName]){
        this.value = changed[this.fieldName];
      }
    }
  }
  function getStoredValue(){
    chrome.storage.local.get(this.fieldName, function(values){
      this.value = values[this.fieldName];
    }.bind(this));
  }
  return {
    create : create
  };
})();

savedFieldProto = Object.create(HTMLInputElement.prototype);

Object.defineProperty(savedFieldProto, "fieldName", {
  get : function(){
    return this._fieldName;
  },
  set : function(value){
    this._fieldName = value;
    this.getStoredValue();
  }
});

savedFieldProto.createdCallback = function(){
  SavedField.create(this);
}

document.registerElement("saved-field", {
  prototype: savedFieldProto,
  extends: "input" 
});