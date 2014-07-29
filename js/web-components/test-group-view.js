var testGroupViewProto = Object.create(HTMLElement.prototype);

testGroupViewProto.createdCallback = function(){
  TestGroupView.create(this);
}
document.registerElement("test-group-view", {
  prototype : testGroupViewProto
});

var TestGroupView = (function(){
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
    element.renderTests = renderTests.bind(element);
    element.onClick = onClick.bind(element);
    element.onRunClick = onRunClick.bind(element);
    element.onFailure = onFailure.bind(element);
    element.onSuccess = onSuccess.bind(element);
  }
  function renderShadow(){
    var template = document.getElementById("test-group-view-tmpl");
    var tmpl = Tmpl.tmpl(template, { ".title" : "groupName" }, this);
    this.dom.shadowRoot = this.createShadowRoot();
    this.dom.shadowRoot.appendChild(tmpl);
  }
  function gatherSelectors(){
    this.dom.runButton = this.shadowRoot.querySelector(".run");
  }
  function attachEvents(){
    this.dom.runButton.addEventListener("click", this.onRunClick);
    this.addEventListener("click", this.onClick);
  }
  function attachObservers(){
    Obsv.observe(this, "tests", this.renderTests);
  }
  function renderTests(tests){
    for(var i = 0; i < tests.length; i++){
      var testView = document.createElement("test-view");
      testView.test = this.tests[i];
      this.appendChild(testView);
    }
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
  function onRunClick(e){
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove("success");
    this.classList.remove("failure");
    this.classList.add("running");
    if(this.dom.errorMessage){
      this.dom.shadowRoot.removeChild(this.dom.errorMessage);
    }
    TestRunner.runTests(this.tests)
      .then(this.onSuccess)
      .catch(this.onError);
  }
  function onClick(){
    this.classList.toggle("open");
  }
  return {
    create : create
  };
})();