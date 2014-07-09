var testViewProto = Object.create(HTMLElement.prototype);
Object.defineProperty(testViewProto, "test", {
  writable : true
});
testViewProto.createdCallback = function(){
  var template = document.getElementById("test-tmpl");
  var clone = document.importNode(template.content, true);
  var shadowRoot = this.createShadowRoot();
  shadowRoot.appendChild(clone);
  
  this.addEventListener("click", function(){
    TestRunner.runTest(this.test);
  }.bind(this));
};

document.registerElement("test-view", {
  prototype : testViewProto
});