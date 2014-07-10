var TestView = (function(){
  function create(element){
    bind(element);
    element.gatherSelectors();
  }
  function bind(element){
    element.renderShadow = renderShadow.bind(element);
    element.gatherSelectors = gatherSelectors.bind(element);
  }
  function gatherSelectors(){
    
  }
  return {
    create : create
  };
})();

var testViewProto = Object.create(HTMLElement.prototype);
Object.defineProperty(testViewProto, "test", {
  writable : true
});
testViewProto.createdCallback = function(){
  var self = this;
  var template = document.getElementById("test-tmpl");
  var clone = document.importNode(template.content, true);
  var shadowRoot = this.createShadowRoot();
  shadowRoot.appendChild(clone);
  
  this.addEventListener("click", function(){
    this.classList.remove("success");
    this.classList.remove("failure");
    TestRunner.runTest(this.test).then(function(){
      this.classList.add("success");
    }.bind(this)).catch(function(){
      this.classList.add("failure");
    }.bind(this));
  }.bind(this));
};

document.registerElement("test-view", {
  prototype : testViewProto
});