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
    this.classList.remove("success");
    this.classList.remove("failure");
    TestRunner.runTest(this.test).then(function(){
      this.classList.add("success");
    }).catch(function(){
      this.classList.add("failure");
    });
  }.bind(this));
};

document.registerElement("test-view", {
  prototype : testViewProto
});