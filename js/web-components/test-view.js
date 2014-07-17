var testViewProto = Object.create(HTMLElement.prototype);

Object.defineProperty(testViewProto, "test", {
  writable : true
});

testViewProto.createdCallback = function(){
  TestView.create(this);
}
document.registerElement("test-view", {
  prototype : testViewProto
});

var TestView = (function(){
  function create(element){
    element.dom = {};
    bind(element);
    element.renderShadow();
    element.gatherSelectors();
    element.attachEvents();
    element.attachObservers();
  }
  function bind(element){
    element.renderShadow = renderShadow.bind(element);
    element.gatherSelectors = gatherSelectors.bind(element);
    element.attachEvents = attachEvents.bind(element);
    element.attachObservers = attachObservers.bind(element);
    element.onClick = onClick.bind(element);
    element.onSuccess = onSuccess.bind(element);
    element.onFailure = onFailure.bind(element);
    element.updateTitle = updateTitle.bind(element);
  }
  function renderShadow(){
    var template = document.getElementById("test-tmpl");
    var clone = document.importNode(template.content, true);
    this.dom.shadowRoot = this.createShadowRoot();
    this.dom.shadowRoot.appendChild(clone);
  }
  function gatherSelectors(){
    this.dom.title = this.dom.shadowRoot.querySelector(".title");
  }
  function attachEvents(){
    this.addEventListener("click", this.onClick);
  }
  function attachObservers(){
    Object.observe(this.test, this.updateTitle);
  }
  function onSuccess(){
    this.classList.remove("running");
    this.classList.add("success");
  }
  function onFailure(error){
    this.classList.remove("running");
    this.classList.add("failure");
    this.dom.errorMessage = document.createElement("p");
    var message = "";
    if(typeof(error) == "string"){
      message = error;
    }else{
      message = error.stack || error.message;
    }
    this.dom.errorMessage.innerText = message;
    this.dom.shadowRoot.appendChild(this.dom.errorMessage);
  }
  function onClick(e){
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove("success");
    this.classList.remove("failure");
    this.classList.add("running");
    if(this.dom.errorMessage){
      this.dom.shadowRoot.removeChild(this.dom.errorMessage);
    }
    TestRunner.runTest(this.test)
      .then(this.onSuccess)
      .catch(this.onFailure);
  }
  function updateTitle(value){
    this.dom.title.innerText = value;
  }
  return {
    create : create
  };
})();